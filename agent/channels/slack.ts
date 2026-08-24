import { slackChannel } from "eve/channels/slack";

function quote(text: string) {
  return text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
}

export default slackChannel({
  async onInputResponse(ctx, submission) {
    const participants = await ctx.thread.listParticipants();
    const initiatingUserId = participants[0];

    if (!initiatingUserId || initiatingUserId !== submission.user.id) {
      return null;
    }

    return { auth: ctx.defaultAuth };
  },
  events: {
    async "input.requested"({ requests }, channel) {
      for (const request of requests) {
        const isPitchApproval =
          request.kind === "tool-approval" &&
          request.action.kind === "tool-call" &&
          request.action.toolName === "submit_pitch";

        if (!isPitchApproval) {
          const options = request.options ?? [];
          const actionPrefix =
            request.kind === "tool-approval"
              ? `eve_input:tool-approval:${request.requestId}`
              : `eve_input:${request.requestId}`;
          const blocks: unknown[] = [
            {
              type: "card",
              body: { type: "mrkdwn", text: request.prompt },
              actions: options.map((option, index) => ({
                type: "button",
                action_id: `${actionPrefix}:button:${index}`,
                text: { type: "plain_text", text: option.label },
                value: option.id,
                ...(option.style ? { style: option.style } : {}),
              })),
            },
          ];
          const posted = await channel.thread.post({
            blocks,
            text: request.prompt,
          });

          if (posted.id && request.kind === "tool-approval") {
            channel.state.pendingApprovalCards = {
              ...channel.state.pendingApprovalCards,
              [request.requestId]: {
                messageBlocks: blocks,
                messageTs: posted.id,
              },
            };
          }
          continue;
        }

        const input = request.action.input as {
          consultant?: unknown;
          opportunity?: unknown;
          pitch?: unknown;
        };
        const pitch = typeof input.pitch === "string" ? input.pitch : "";
        const opportunity =
          typeof input.opportunity === "string" ? input.opportunity : "";
        const consultant =
          typeof input.consultant === "string" ? input.consultant : "";
        const actionPrefix = `eve_input:tool-approval:${request.requestId}`;
        const blocks = [
          {
            type: "card",
            body: {
              type: "mrkdwn",
              text: [
                "*Godkjenn konsulentforslaget*",
                `*Kunde:* ${opportunity}`,
                `*Konsulent:* ${consultant}`,
                "",
                quote(pitch),
              ].join("\n"),
            },
            actions: [
              {
                type: "button",
                action_id: `${actionPrefix}:button:0`,
                text: { type: "plain_text", text: "Avbryt" },
                value: "cancel",
              },
              {
                type: "button",
                action_id: `${actionPrefix}:button:1`,
                text: { type: "plain_text", text: "Godkjenn" },
                style: "primary",
                value: "approve",
              },
            ],
          },
        ];
        const posted = await channel.thread.post({
          blocks,
          text: `Godkjenn konsulentforslaget:\n\n${pitch}`,
        });

        if (posted.id) {
          channel.state.pendingApprovalCards = {
            ...channel.state.pendingApprovalCards,
            [request.requestId]: {
              messageBlocks: blocks,
              messageTs: posted.id,
            },
          };
        }
      }
    },
  },
});
