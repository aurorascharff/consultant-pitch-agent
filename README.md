# Consultant pitch agent

This Eve agent recommends a fictional consultant for a sales opportunity and writes an evidence-based pitch. It demonstrates tools, a load-on-demand skill, evals, Microsoft Teams, Vercel deployment, and Agent Runs.

All people, customers, projects, and results are synthetic.

## Run locally

Install dependencies and add an AI Gateway key to `.env.local`:

```bash
npm install
```

```bash
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

Start the agent:

```bash
npm run dev
```

Try this request:

```text
Vi skal svare på muligheten Nordlys Energi. Finn en konsulent som passer, og lag en kort pitch. Vektlegg React, Next.js og migrering.
```

The agent retrieves the opportunity, searches the consultant profiles and case studies, and writes a pitch supported by the synthetic records.

## Run the evals

Run the complete suite:

```bash
npm run eval
```

Run only the main demo case:

```bash
npm run eval -- nordlys-pitch
```

The suite verifies the tool calls, recommendation, supporting evidence, and behavior when a requested consultant does not exist.

## Deploy and inspect runs

Link the project and deploy it to Vercel:

```bash
npx eve link
npm run deploy
```

Open **Observability** > **Agent Runs** in the Vercel project to inspect conversations, model calls, tool activity, duration, and token usage.

Connect the terminal interface to the deployment:

```bash
npx eve dev https://your_project.vercel.app
```

## Connect Microsoft Teams

The Teams channel receives Bot Framework activities at:

```text
POST https://your_project.vercel.app/eve/v1/teams
```

Create a Microsoft Entra application and Azure Bot, enable its Teams channel, and set the endpoint above as the bot's messaging endpoint. Add these variables to the Vercel project, then redeploy:

```bash
TEAMS_APP_ID=your_microsoft_application_id_here
TEAMS_APP_PASSWORD=your_microsoft_client_secret_here
TEAMS_TENANT_ID=your_microsoft_tenant_id_here
```

Install a Teams app manifest that references the bot. The agent responds directly in personal chats and when mentioned in channels or group chats.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local agent. |
| `npm run eval` | Run the eval suite. |
| `npm run typecheck` | Check the authored TypeScript. |
| `npm run build` | Create the production build. |
| `npm run deploy` | Deploy to Vercel. |
| `npx eve info` | Show discovered tools, skills, and channels. |
| `npx eve traces` | Inspect the latest local agent trace. |
