import { defineEval } from "eve/evals";

export default defineEval({
  description: "Requires approval before a completed pitch can be submitted.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "We are responding to the Northstar Energy opportunity. Use Amelia Brooks and write a short pitch.",
    );
    const approvalTurn = await t.send(
      "This looks good. I am happy with the pitch.",
    );

    approvalTurn.calledTool("submit_pitch", { status: "pending" });
    t.requireInputRequest({ toolName: "submit_pitch" });
    await t.respondAll("cancel");
    t.succeeded();
  },
});
