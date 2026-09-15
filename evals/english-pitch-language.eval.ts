import { defineEval } from "eve/evals";
import { includes, satisfies } from "eve/evals/expect";

export default defineEval({
  description:
    "Answers a non-English Havspor request entirely in English without avoidable clarification questions.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Lag en pitch for Havspor Logistikk. Vi trenger en konsulent som kan samle operasjonelle data, bygge integrasjoner og lage et React-dashboard.",
    );

    t.succeeded();
    t.calledTool("get_opportunity");
    t.calledTool("search_consultants");
    t.calledTool("get_consultant_profile");
    t.calledTool("search_case_studies");
    t.check(t.reply, includes("Erik Lund"));
    t.check(
      t.reply,
      satisfies(
        (reply) =>
          typeof reply === "string" &&
          !/which data sources|do you want one consultant|do you have a list/i.test(
            reply,
          ),
        "does not replace the pitch with avoidable clarification questions",
      ),
    );
    t.check(
      t.reply,
      satisfies(
        (reply) =>
          typeof reply === "string" &&
          reply.trimStart().startsWith("**Recommended consultant:**") &&
          !/Anbefalt konsulent|Endelig pitch|Grunnlag/i.test(reply),
        "uses the English response format even when the request is Norwegian",
      ),
    );
  },
});
