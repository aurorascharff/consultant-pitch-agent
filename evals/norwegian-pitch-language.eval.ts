import { defineEval } from "eve/evals";
import { includes, satisfies } from "eve/evals/expect";

export default defineEval({
  description:
    "Answers a Norwegian Havspor request entirely in Norwegian without an English preamble.",
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
          !/hvilke datakilder|skal én konsulent|har dere en liste/i.test(reply),
        "does not replace the pitch with avoidable clarification questions",
      ),
    );
    t.check(
      t.reply,
      satisfies(
        (reply) =>
          typeof reply === "string" &&
          reply.trimStart().startsWith("**Anbefalt konsulent:**"),
        "starts directly with the Norwegian recommendation heading",
      ),
    );
  },
});
