import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Lists the available opportunity catalog without staffing it.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send("Which sales opportunities are available?");

    t.succeeded();
    t.calledTool("list_opportunities");
    t.notCalledTool("search_consultants");
    t.check(t.reply, includes("Nordlys Energi"));
    t.check(t.reply, includes("Havspor Logistikk"));
  },
});
