import { callSlackApi } from "eve/channels/slack";
import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import { z } from "zod";
import { consultants, normalize, opportunities } from "../lib/data";

export default defineTool({
  description:
    "Submit a completed consultant pitch to the proposal team. Use only when the user explicitly asks to send or submit the final pitch.",
  inputSchema: z.object({
    opportunity: z
      .string()
      .min(1)
      .describe("The opportunity ID or customer name"),
    consultant: z
      .string()
      .min(1)
      .describe("The consultant ID or full name"),
    pitch: z
      .string()
      .min(20)
      .max(1500)
      .describe("The exact customer-ready pitch to submit"),
  }),
  approval: always(),
  async execute({ opportunity, consultant, pitch }, ctx) {
    const auth = ctx.session.auth.current;
    const slackUserId = auth?.attributes.user_id;

    if (
      auth?.authenticator !== "slack-webhook" ||
      auth.principalType !== "user" ||
      typeof slackUserId !== "string" ||
      slackUserId.length === 0
    ) {
      throw new Error("Only an authenticated Slack user can submit a pitch.");
    }

    const normalizedOpportunity = normalize(opportunity);
    const opportunityRecord = opportunities.find(
      (item) =>
        normalize(item.id) === normalizedOpportunity ||
        normalize(item.customer) === normalizedOpportunity,
    );

    if (!opportunityRecord) {
      throw new Error(`Unknown opportunity: ${opportunity}`);
    }

    const normalizedConsultant = normalize(consultant);
    const consultantRecord = consultants.find(
      (item) =>
        normalize(item.id) === normalizedConsultant ||
        normalize(item.name) === normalizedConsultant,
    );

    if (!consultantRecord) {
      throw new Error(`Unknown consultant: ${consultant}`);
    }

    const channelId = process.env.PITCH_SUBMISSIONS_CHANNEL_ID;
    if (!channelId) {
      throw new Error("PITCH_SUBMISSIONS_CHANNEL_ID is not configured.");
    }

    const response = await callSlackApi({
      botToken: process.env.SLACK_BOT_TOKEN,
      operation: "chat.postMessage",
      body: {
        channel: channelId,
        client_msg_id: ctx.session.turn.id,
        text: `Nytt konsulentforslag for ${opportunityRecord.customer}: ${consultantRecord.name}\n\n${pitch}`,
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "Nytt konsulentforslag" },
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: pitch },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Kunde:* ${opportunityRecord.customer}   •   *Konsulent:* ${consultantRecord.name}   •   Godkjent av <@${slackUserId}>`,
              },
            ],
          },
        ],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Slack rejected the submission: ${response.error ?? "unknown_error"}`,
      );
    }

    return {
      submitted: true,
      customer: opportunityRecord.customer,
      consultant: consultantRecord.name,
      destination: channelId,
      messageId: typeof response.ts === "string" ? response.ts : undefined,
    };
  },
});
