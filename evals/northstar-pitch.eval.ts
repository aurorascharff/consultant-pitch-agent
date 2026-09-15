import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description:
    "Recommends a supported consultant for Northstar Energy and uses every evidence source.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "We are responding to the Northstar Energy opportunity. Find the best consultant and write a short pitch focused on React, Next.js, and migration.",
    );

    t.succeeded();
    t.calledTool("get_opportunity");
    t.calledTool("search_consultants");
    t.calledTool("get_consultant_profile");
    t.calledTool("search_case_studies");
    t.check(t.reply, includes("Amelia Brooks"));
    t.check(t.reply, includes("Northstar Energy"));
    t.check(t.reply, includes("Final pitch"));
  },
});
