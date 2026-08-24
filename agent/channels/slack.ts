import { slackChannel } from "eve/channels/slack";

export default slackChannel({
  async onInputResponse(ctx, submission) {
    const participants = await ctx.thread.listParticipants();
    const initiatingUserId = participants[0];

    if (!initiatingUserId || initiatingUserId !== submission.user.id) {
      return null;
    }

    return { auth: ctx.defaultAuth };
  },
});
