# Configure the consultant pitch agent in Slack

Deploy the agent to Vercel, connect a Slack app, and send approved pitches to a dedicated channel.

## Deploy the agent

Import the GitHub repository into Vercel and keep the detected **eve** preset. Add `AI_GATEWAY_API_KEY` to the Production environment, then deploy.

The deployment serves the agent at:

```text
https://consultant-pitch-agent.vercel.app
```

## Create the Slack app

Create a Slack app in a test workspace with these bot scopes:

```text
app_mentions:read
channels:history
chat:write
```

Install the app, then add its credentials to the Vercel Production environment:

```bash
SLACK_BOT_TOKEN=xoxb-your_token_here
SLACK_SIGNING_SECRET=your_signing_secret_here
PITCH_SUBMISSIONS_CHANNEL_ID=your_destination_channel_id
```

Create a public `#submitted-pitches` channel, invite the bot, and use its channel ID for `PITCH_SUBMISSIONS_CHANNEL_ID`. Redeploy after adding the environment variables.

## Configure Slack events and interactions

Set the **Event Subscriptions** request URL to:

```text
https://consultant-pitch-agent.vercel.app/eve/v1/slack
```

Subscribe to the `app_mention` bot event. Use the same URL under **Interactivity & Shortcuts** so Slack can deliver approval responses.

Invite the bot to the channel where you want to start requests.

## Test the approval flow

Mention the bot:

```text
@KonsuBot Vi skal svare på muligheten Nordlys Energi. Finn en konsulent som passer, og lag en kort pitch. Vektlegg React, Next.js og migrering.
```

After the agent drafts the final pitch, reply in the same thread:

```text
Denne ser bra ut.
```

The approval card shows the complete pitch with **Godkjenn** and **Avbryt** buttons. Only the person who started the thread can approve it. After approval, `submit_pitch` posts the same pitch to `#submitted-pitches`.

Open **Observability** > **Agent Runs** in the Vercel project to inspect the model calls, tool activity, approval pause, duration, cost, and token usage.

You can also connect Eve's terminal interface to the production agent:

```bash
npx eve dev https://consultant-pitch-agent.vercel.app
```
