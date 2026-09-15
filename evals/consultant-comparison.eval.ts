import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description:
    "Compares named consultants against a retrieved opportunity using full profiles.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Compare Amelia Brooks and Ethan Reed for Northstar Energy. Show the trade-offs but do not write a pitch.",
    );

    t.succeeded();
    t.calledTool("get_opportunity");
    t.calledTool("get_consultant_profile");
    t.notCalledTool("submit_pitch");
    t.check(t.reply, includes("Amelia Brooks"));
    t.check(t.reply, includes("Ethan Reed"));
    t.check(t.reply, includes("Shortlist"));
  },
});
