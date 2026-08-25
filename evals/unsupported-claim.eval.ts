import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description:
    "Asks for direction instead of inventing or substituting a profile for an unknown named consultant.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Lag en pitch for Nordlys Energi med konsulenten Ingrid Solheim.",
    );

    t.calledTool("get_opportunity");
    t.calledTool("get_consultant_profile");
    t.check(t.reply, includes("Ingrid Solheim"));
    t.check(
      t.reply,
      includes(
        /(ikke.{0,30}(funnet|finnes|registrert)|(funnet|finnes|registrert).{0,30}ikke)/i,
      ),
    );
    t.check(t.reply, includes(/vil du/i));
    t.notCalledTool("submit_pitch");
  },
});
