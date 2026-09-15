---
name: write-sales-pitch
description: Recommend a consultant and write or revise a concise, evidence-based pitch for a customer opportunity.
---

# Write a consultant pitch

## Process

1. Read the retrieved opportunity and identify the customer's goal, required capabilities, constraints, and desired outcome.
2. If the user named a consultant, call `get_consultant_profile` and use that person when found. Do not search for a substitute unless the user asks. Otherwise, call `search_consultants` with the required capabilities and industry.
3. Select the strongest match based on returned evidence, not title or seniority. Always inspect the selected person's full profile before recommending them.
4. Call `search_case_studies` for one relevant company example, preferring overlap in technology, delivery approach, or outcome.
5. Complete the process in the first response. Record missing implementation details as gaps instead of blocking on avoidable questions.

## Attribution

- Personal project experience: only what appears in the selected consultant's profile.
- Company delivery experience: only what appears in a case study.
- Never imply that a consultant delivered a company case study unless their profile explicitly names that project.
- Use metrics only when a tool returned them.
- Name an unsupported requirement as a gap instead of filling it.

## Formats

- **Standard** (default): one customer-ready paragraph, no more than 120 words.
- **Executive**: one compact paragraph, no more than 60 words.
- **Email**: a specific subject line and a customer-ready body, no more than 150 words total.

Every format should lead with the customer's goal, connect the consultant's relevant experience to it, and use at most one company case study as supporting evidence.

## Response format

The response must begin with the recommendation heading below. Do not add any introductory sentence before it.

**Recommended consultant:** Name, role

One sentence explaining why this person is the strongest match.

**Final pitch**

> The complete customer-ready pitch in the requested format.

**Evidence:** Name the opportunity record, consultant profile, and case study used.

**Gaps:** Include only when a relevant requirement is not supported by the available records.

Does this look good, or would you like any changes?
