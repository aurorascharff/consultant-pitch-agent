import { defineTool } from "eve/tools";
import { z } from "zod";
import { consultants, normalize } from "../lib/data";

export default defineTool({
  description:
    "Get the complete fictional profile and project history for one consultant.",
  inputSchema: z.object({
    consultant: z
      .string()
      .min(1)
      .describe("The consultant ID or full name returned by search_consultants"),
  }),
  async execute({ consultant }) {
    const normalizedConsultant = normalize(consultant);
    const profile = consultants.find(
      (item) =>
        normalize(item.id) === normalizedConsultant ||
        normalize(item.name) === normalizedConsultant,
    );

    if (!profile) {
      return {
        found: false,
        consultant,
        availableConsultants: consultants.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      };
    }

    return { found: true, profile };
  },
});
