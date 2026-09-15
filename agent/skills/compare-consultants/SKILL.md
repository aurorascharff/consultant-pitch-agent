---
name: compare-consultants
description: Build an evidence-based shortlist or compare two to four consultants for a customer opportunity.
---

# Compare consultants

## Process

1. Retrieve the named opportunity with `get_opportunity`.
2. Turn the opportunity's needs and constraints into concise comparison criteria.
3. If the user named candidates, call `get_consultant_profile` for each one. Otherwise, call `search_consultants` with the opportunity's required capabilities, then inspect the full profile of up to three leading matches.
4. Compare only evidence in the retrieved profiles. Availability is a constraint, not proof of capability.
5. Recommend one person only when the user asks for a recommendation. Otherwise, explain the trade-offs and let the user decide.

## Response format

**Shortlist for:** Customer

Use a compact table with these columns: Consultant, strongest evidence, availability, and gaps or trade-offs.

After the table, add **Best fit** only when a recommendation was requested, followed by one evidence-based sentence.

Do not use internal tool scores, invent numeric ratings, or attribute company case studies to an individual.
