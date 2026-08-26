# Consultant pitch agent

This Eve demo agent recommends a fictional consultant for a sales opportunity and writes an evidence-based pitch. It uses tools, a load-on-demand skill, human approval, evals, and Vercel Agent Runs.

All people, customers, projects, and results are synthetic.

**Live deployment:** [consultant-pitch-agent.vercel.app](https://consultant-pitch-agent.vercel.app)

## Run locally

Install the dependencies and add `AI_GATEWAY_API_KEY` to `.env.local`:

```bash
npm install
npm run dev
```

The `submit_pitch` tool always requires an authenticated Slack user. You can inspect and approve its proposed call in `eve dev`, but execution then fails at the authorization check because the local terminal is not Slack. This keeps local development from simulating a production identity.

## Try different opportunities

Each synthetic opportunity emphasizes a different kind of consulting work and should surface a different profile.

**Portal migration and Next.js (Amalie Berg)**

```text
Vi skal svare på muligheten Nordlys Energi. Finn en konsulent som passer, og lag en kort pitch. Vektlegg React, Next.js og migrering.
```

**APIs and a logistics data platform (Erik Lund)**

```text
Lag en pitch for Havspor Logistikk. Vi trenger en konsulent som kan samle operasjonelle data, bygge integrasjoner og lage et React-dashboard.
```

**Accessibility and healthcare forms (Sara Nilsen)**

```text
Finn den beste konsulenten for Solsiden Helse og skriv en pitch. Vektlegg universell utforming, brukerinnsikt og et designsystem flere team kan bruke.
```

**Cloud modernization and technical leadership (Jonas Mo)**

```text
Skriv en pitch for Nordnett Telekom. De trenger teknisk ledelse, en målarkitektur og en trinnvis plan for skymigrering på tvers av åtte team.
```

## Verify the agent

```bash
npm run typecheck
npm run eval
npm run build
```

The evals verify the source chain, recommendation, approval gate, and behavior for unsupported consultants.

## Deploy to Slack

Follow the [Slack setup guide](docs/slack-setup.md) to deploy the agent, configure the Slack app, and test the approval flow.

## Project structure

- `agent/instructions.md` defines the agent's role and submission behavior.
- `agent/tools/` contains the data access and protected submission tools.
- `agent/skills/write-sales-pitch/` defines the evidence-based pitch workflow.
- `agent/channels/slack.ts` renders the approval flow in Slack.
- `evals/` tests recommendation quality and submission safety.
