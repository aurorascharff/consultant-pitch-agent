import { defineEval } from "eve/evals";

export default defineEval({
  description: "Requires approval before a completed pitch can be submitted.",
  timeoutMs: 120_000,
  async test(t) {
    await t.send(
      "Vi skal svare på muligheten Nordlys Energi. Finn Amalie Berg og lag en kort pitch.",
    );
    const approvalTurn = await t.send(
      "Denne er bra. Jeg er fornøyd med pitchen.",
    );

    approvalTurn.calledTool("submit_pitch", { status: "pending" });
    t.requireInputRequest({ toolName: "submit_pitch" });
    await t.respondAll("cancel");
    t.succeeded();
  },
});
