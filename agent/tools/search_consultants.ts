import { defineTool } from "eve/tools";
import { z } from "zod";
import { consultants, includesTerm } from "../lib/data";

export default defineTool({
  description:
    "Search fictional consultant profiles by required skills and optional industry experience.",
  inputSchema: z.object({
    skills: z
      .array(z.string().min(1))
      .min(1)
      .describe("The capabilities required for the opportunity"),
    industry: z
      .string()
      .min(1)
      .optional()
      .describe("Optional customer industry"),
    limit: z.number().int().min(1).max(4).default(3),
  }),
  async execute({ skills, industry, limit }) {
    const matches = consultants
      .map((consultant) => {
        const matchedSkills = skills.filter((requiredSkill) =>
          consultant.skills.some((skill) => includesTerm(skill, requiredSkill)),
        );
        const industryMatch = industry
          ? consultant.industries.some((value) => includesTerm(value, industry))
          : false;

        return {
          consultantId: consultant.id,
          name: consultant.name,
          role: consultant.role,
          availability: consultant.availability,
          matchedSkills,
          industryMatch,
          score: matchedSkills.length * 2 + (industryMatch ? 1 : 0),
        };
      })
      .filter((result) => result.matchedSkills.length > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, limit);

    return {
      query: { skills, industry: industry ?? null },
      matches,
      note: "Scores rank exact matches in the fictional profile data. Inspect a full profile before making a recommendation.",
    };
  },
});
