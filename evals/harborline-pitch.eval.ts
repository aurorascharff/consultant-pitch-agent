import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description:
    "Recommends a supported consultant for Harborline Logistics and writes an English pitch.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Write a pitch for Harborline Logistics. We need a consultant who can consolidate operational data, build integrations, and create a React dashboard.",
    );

    t.succeeded();
    t.calledTool("get_opportunity");
    t.calledTool("search_consultants");
    t.calledTool("get_consultant_profile");
    t.calledTool("search_case_studies");
    t.check(t.reply, includes("Ethan Reed"));
    t.check(t.reply, includes("Recommended consultant"));
    t.check(t.reply, includes("Final pitch"));
  },
});
