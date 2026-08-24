# Consultant pitch agent

This Eve agent recommends a fictional consultant for a sales opportunity and writes an evidence-based pitch. Slack is its primary interface. The project demonstrates tools, a load-on-demand skill, human approval, evals, Vercel deployment, and Agent Runs.

All people, customers, projects, and results are synthetic.

**Live deployment:** [consultant-pitch-agent.vercel.app](https://consultant-pitch-agent.vercel.app)

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

The suite verifies the tool calls, recommendation, approval gate, supporting evidence, and behavior when a requested consultant does not exist.

## Deploy with Slack

Import the GitHub repository into Vercel and keep the detected **eve** preset. The deployment serves a status page at the project URL.

Create a Slack app in a test workspace with these bot scopes:

```text
app_mentions:read
channels:history
chat:write
```

Install the app, then add its credentials to the Vercel project as Production environment variables:

```bash
SLACK_BOT_TOKEN=xoxb-your_token_here
SLACK_SIGNING_SECRET=your_signing_secret_here
PITCH_SUBMISSIONS_CHANNEL_ID=your_destination_channel_id
```

Create a public `#submitted-pitches` channel, invite `@KonsuBot`, and copy its channel ID into `PITCH_SUBMISSIONS_CHANNEL_ID`. Redeploy the project. In the Slack app's **Event Subscriptions**, use this Request URL and subscribe to the `app_mention` bot event:

```text
https://consultant-pitch-agent.vercel.app/eve/v1/slack
```

Use the same URL under **Interactivity & Shortcuts** so Slack can deliver approval-button responses.

Invite `@KonsuBot` to a channel, then send:

```text
@KonsuBot Vi skal svare på muligheten Nordlys Energi. Finn en konsulent som passer, og lag en kort pitch. Vektlegg React, Next.js og migrering.
```

In the same thread, ask the bot to submit the final draft:

```text
@KonsuBot Send pitchen til tilbudsteamet.
```

Eve parks the run and renders an approval card in Slack. Only the person who started the thread can approve it. After approval, the protected `submit_pitch` tool posts the exact pitch to `#submitted-pitches`.

Open **Observability** > **Agent Runs** in the Vercel project to inspect the conversation, model calls, tool activity, duration, and token usage.

You can also connect Eve's terminal interface to the same production agent:

```bash
npx eve dev https://consultant-pitch-agent.vercel.app
```

## Optional Microsoft Teams channel

The repository keeps a Teams channel at:

```text
POST https://consultant-pitch-agent.vercel.app/eve/v1/teams
```

To activate it, create a Microsoft Entra application and Azure Bot, then add these variables to Vercel:

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
