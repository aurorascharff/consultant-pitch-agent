import { defineEval } from "eve/evals";

export default defineEval({
  description:
    "Asks for direction instead of inventing a profile for an unknown consultant.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Lag en pitch for Nordlys Energi med konsulenten Ingrid Solheim.",
    );

    t.calledTool("get_opportunity");
    t.calledTool("get_consultant_profile");
    t.requireInputRequest();
  },
});
