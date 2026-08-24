---
description: Recommend a consultant and write a short, evidence-based pitch for a customer opportunity.
---

# Write a consultant pitch

Use the fictional opportunity, consultant, and case-study records as the only source of factual claims.

## Process

1. Call `get_opportunity` to retrieve the customer's needs, constraints, and desired outcome. If the opportunity is missing, stop and ask for a valid customer.
2. Turn the opportunity into a short list of required capabilities. Call `search_consultants` with those capabilities and the customer's industry.
3. Select the strongest match based on the returned evidence, not seniority alone. Call `get_consultant_profile` before recommending that person.
4. Call `search_case_studies` for one relevant company example. Prefer overlap with the customer's required technologies, delivery approach, or outcome.
5. Draft the recommendation and pitch in the user's language.

## Evidence rules

- Attribute personal project experience only when it appears in the selected consultant's profile.
- Attribute a case study to the consulting company unless the profile explicitly connects the consultant to that project.
- Use metrics only when a tool returns them.
- If an important requirement is unsupported, name the gap instead of filling it with a plausible claim.

## Response format

**Anbefalt konsulent:** Name, role

One sentence explaining why this person is the strongest match.

**Kort pitch**

A customer-ready pitch of no more than 120 words. Lead with the customer's goal, connect the consultant's relevant experience to it, and use at most one company case study as supporting evidence.

**Grunnlag:** Name the opportunity, consultant profile, and case study used. Do not expose internal ranking scores.

## Submission

Drafting does not authorize delivery. Call `submit_pitch` only after the user explicitly asks to send or submit the final pitch. Pass the selected opportunity and consultant with the exact final pitch. The tool pauses for approval before posting to the proposal channel.
