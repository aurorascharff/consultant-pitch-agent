import { defineTool } from "eve/tools";
import { z } from "zod";
import { caseStudies, includesTerm } from "../lib/data";

export default defineTool({
  description:
    "Search fictional company case studies for evidence relevant to a consulting opportunity.",
  inputSchema: z.object({
    topics: z
      .array(z.string().min(1))
      .min(1)
      .describe("Technologies, methods, or outcomes to find evidence for"),
    industry: z.string().min(1).optional().describe("Optional customer industry"),
    limit: z.number().int().min(1).max(3).default(2),
  }),
  async execute({ topics, industry, limit }) {
    const matches = caseStudies
      .map((caseStudy) => {
        const matchedTopics = topics.filter((query) =>
          caseStudy.topics.some((topic) => includesTerm(topic, query)),
        );
        const industryMatch = industry
          ? includesTerm(caseStudy.industry, industry)
          : false;

        return {
          ...caseStudy,
          matchedTopics,
          industryMatch,
          score: matchedTopics.length * 2 + (industryMatch ? 1 : 0),
        };
      })
      .filter((result) => result.matchedTopics.length > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, limit);

    return {
      query: { topics, industry: industry ?? null },
      matches,
      note: "Case studies describe company delivery history. Do not attribute them to a consultant unless the consultant profile names the same project.",
    };
  },
});
