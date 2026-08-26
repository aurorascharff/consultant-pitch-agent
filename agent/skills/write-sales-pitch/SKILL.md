---
name: write-sales-pitch
description: Recommend a consultant and write a short, evidence-based pitch for a customer opportunity.
---

# Write a consultant pitch

## Process

1. Read the retrieved opportunity for the customer's needs, constraints, and desired outcome.
2. Turn it into a short list of required capabilities. Call `search_consultants` with those capabilities and the customer's industry.
3. Pick the strongest match on the returned evidence, not seniority. Call `get_consultant_profile` before recommending anyone.
4. Call `search_case_studies` for one relevant company example, preferring overlap in technology, delivery approach, or outcome.
5. Complete this process in the first response. Do not pause for clarifying questions when the named opportunity exists; record missing implementation details as gaps without blocking the recommendation.

## Attribution

- Personal project experience: only what appears in the selected consultant's profile.
- A case study belongs to the company, not to the consultant, unless that profile connects them to it.
- Metrics only when a tool returned them. Name an unsupported requirement as a gap instead of filling it.

## Response format

**Anbefalt konsulent:** Name, role

One sentence on why this person is the strongest match.

**Endelig pitch**

A customer-ready pitch as a Markdown blockquote, max 120 words. Lead with the customer's goal, connect the consultant's experience to it, use at most one company case study as support.

**Grunnlag:** the opportunity, profile, and case study used. No internal ranking scores.
