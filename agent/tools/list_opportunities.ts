import { defineTool } from "eve/tools";
import { z } from "zod";
import { includesTerm, opportunities } from "../lib/data";

export default defineTool({
  description:
    "List the fictional consulting opportunities available to the agent, optionally filtered by industry.",
  inputSchema: z.object({
    industry: z
      .string()
      .min(1)
      .optional()
      .describe("Optional industry used to filter the opportunity catalog"),
  }),
  async execute({ industry }) {
    const matches = industry
      ? opportunities.filter((opportunity) =>
          includesTerm(opportunity.industry, industry),
        )
      : opportunities;

    return {
      filter: { industry: industry ?? null },
      opportunities: matches.map((opportunity) => ({
        id: opportunity.id,
        customer: opportunity.customer,
        industry: opportunity.industry,
        summary: opportunity.summary,
        desiredOutcome: opportunity.desiredOutcome,
      })),
      total: matches.length,
    };
  },
});
