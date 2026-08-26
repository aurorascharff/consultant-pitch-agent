---
name: write-sales-pitch
description: Recommend a consultant and write a short, evidence-based pitch for a customer opportunity.
---

# Write a consultant pitch

Use the fictional opportunity, consultant, and case-study records as the only source of factual claims.

## Process

1. Use the opportunity record already retrieved by the agent as the source for the customer's needs, constraints, and desired outcome.
2. Turn the opportunity into a short list of required capabilities. Call `search_consultants` with those capabilities and the customer's industry.
3. Select the strongest match based on the returned evidence, not seniority alone. Call `get_consultant_profile` before recommending that person.
4. Call `search_case_studies` for one relevant company example. Prefer overlap with the customer's required technologies, delivery approach, or outcome.
5. Draft the recommendation and pitch entirely in the user's language. This includes every heading, transition, and follow-up sentence. If the user writes in Norwegian, use Norwegian Bokmål throughout.

## Evidence rules

- Attribute personal project experience only when it appears in the selected consultant's profile.
- Attribute a case study to the consulting company unless the profile explicitly connects the consultant to that project.
- Use metrics only when a tool returns them.
- If an important requirement is unsupported, name the gap instead of filling it with a plausible claim.

## Response format

Start directly with the recommendation. Do not add an introductory sentence before it.

**Anbefalt konsulent:** Name, role

One sentence explaining why this person is the strongest match.

**Endelig pitch**

A customer-ready pitch of no more than 120 words, formatted as a Markdown blockquote so it is visually distinct from the recommendation and evidence. Lead with the customer's goal, connect the consultant's relevant experience to it, and use at most one company case study as supporting evidence.

**Grunnlag:** Name the opportunity, consultant profile, and case study used. Do not expose internal ranking scores.

Do not add an English preamble or transition to a Norwegian response. In Norwegian, the first non-whitespace text must be `**Anbefalt konsulent:**`.

## Submission

Drafting does not authorize delivery. Call `submit_pitch` when the user clearly indicates that they are happy with the final pitch, including responses such as "den er bra", "ser bra ut", "jeg er fornøyd", or "bruk denne". Do not ask the user to say "send" and do not add another conversational confirmation because the tool renders the complete pitch with native approval buttons before posting. Pass the selected opportunity and consultant with the exact final pitch text, without the Markdown blockquote markers, and only report delivery after the tool succeeds.
