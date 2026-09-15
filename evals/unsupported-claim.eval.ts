import { defineEval } from "eve/evals";

export default defineEval({
  description:
    "Asks for direction instead of inventing or substituting a profile for an unknown named consultant.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Write a pitch for Nordlys Energi with the consultant Ingrid Solheim.",
    );

    t.calledTool("get_opportunity");
    t.calledTool("get_consultant_profile");
    t.messageIncludes("Ingrid Solheim");
    t.messageIncludes(
      /(no profile|not.{0,30}(found|available|registered)|(found|available|registered).{0,30}not)/i,
    );
    t.notCalledTool("submit_pitch");
  },
});
