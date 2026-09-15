# Consultant pitch agent

This Eve demo agent explores fictional sales opportunities, compares consultants, and writes evidence-based pitches in English. It uses tools, load-on-demand skills, human approval, evals, and Vercel Agent Runs.

All people, customers, projects, and results are synthetic.

**Live deployment:** [consultant-pitch-agent.vercel.app](https://consultant-pitch-agent.vercel.app)

## Run locally

Install the dependencies and add `AI_GATEWAY_API_KEY` to `.env.local`:

```bash
npm install
npm run dev
```

The `submit_pitch` tool always requires an authenticated Slack user. You can inspect and approve its proposed call in `eve dev`, but execution then fails at the authorization check because the local terminal is not Slack. This keeps local development from simulating a production identity.

## What the agent can do

- List and summarize the available sales opportunities.
- Recommend one consultant or compare a shortlist against an opportunity.
- Draft standard, executive, or email pitches from retrieved evidence.
- Revise a pitch while preserving the exact final text for approval.
- Submit an approved pitch to Slack with an authenticated-user check.

Ask what is available:

```text
Which sales opportunities are available?
```

Compare candidates:

```text
Compare Amelia Brooks and Ethan Reed for Northstar Energy. Show the trade-offs but do not write a pitch.
```

## Try different opportunities

Each synthetic opportunity emphasizes a different kind of consulting work and should surface a different profile.

**Portal migration and Next.js (Amelia Brooks)**

```text
We are responding to the Northstar Energy opportunity. Find the best consultant and write a short pitch focused on React, Next.js, and migration.
```

**APIs and a logistics data platform (Ethan Reed)**

```text
Write an email pitch for Harborline Logistics. We need a consultant who can consolidate operational data, build integrations, and create a React dashboard.
```

**Accessibility and healthcare forms (Sophie Carter)**

```text
Find the best consultant for Greenfield Health and write an executive pitch focused on accessibility, user research, and a design system that several teams can use.
```

**Cloud modernization and technical leadership (James Morgan)**

```text
Write a pitch for ConnectOne Telecom. They need engineering leadership, a target architecture, and a staged cloud-migration plan across eight teams.
```

## Verify the agent

```bash
npm run typecheck
npm run eval
npm run build
```

The evals verify English output, catalog discovery, comparisons, the evidence chain, the approval gate, and behavior for unsupported consultants.

## Deploy to Slack

Follow the [Slack setup guide](docs/slack-setup.md) to deploy the agent, configure the Slack app, and test the approval flow.

## Project structure

- `agent/instructions.md` defines the agent's role and submission behavior.
- `agent/tools/` contains catalog, data access, and protected submission tools.
- `agent/skills/` defines the pitch-writing and consultant-comparison workflows.
- `agent/channels/slack.ts` renders the approval flow in Slack.
- `evals/` tests recommendation quality and submission safety.
