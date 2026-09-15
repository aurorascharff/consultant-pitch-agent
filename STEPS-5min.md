# FIVE-MINUTE DEMO STEPS

## Eve and the setup

- Open [eve.dev](https://eve.dev). I am building this with Eve, Vercel's open-source agent framework. We use it internally for agents that manage work. I also used it to build an automated DX tester that attempts a set of Next.js tasks and reports what was difficult. Eve combines the AI SDK, AI Gateway, and Vercel Workflow; the agent itself is a directory of instructions, tools, and skills.
- I used to be a consultant, and I built this example for a demo at my old company. Writing a good pitch means combining customer context, consultant profiles, and past work.
- Switch to VS Code. I started with Eve, added Slack and synthetic data, and stopped there. `eve dev` is on the left and FX is on the right.
- The loop is: change it, run it, inspect it, judge it.

## Start with a generic bot

- In `eve dev`, start a fresh conversation and send:

Hello.

- The runtime works, but the bot has no job yet.

## Give it a job with FX

- Start FX. It is Vercel's open-source coding agent, and I am voice-prompting it with Wispr Flow.
- FX uses AI Gateway: model access across providers, like OpenRouter, but integrated with Vercel billing and observability. Open `/models`, search `qwen`, switch to Claude Opus, toggle `/fast`, and confirm with `/status`.
- Say:

Make this an English consultant-pitching assistant. When someone says hello, briefly explain what it can do and ask which customer or opportunity they want help with. Keep the instructions short and clear.

- Open `agent/instructions.md`. Send `Hello.` again. It knows its job, but it cannot access the data.

## Add the tools

- In the same FX conversation, say:

Give this agent a tool that looks up a sales opportunity by customer name or ID. Use the existing synthetic data and keep it simple.

- Open the tool. Eve hot-reloads it. Send:

Write a short pitch for Harborline Logistics and recommend the best consultant for its data platform, integrations, and React dashboard.

- `getOpportunity` runs, but the bot still cannot find a consultant.
- Return to FX and say:

Now add consultant matching. I need one tool that searches consultants by skills and industry, and another that retrieves the selected consultant's full profile.

- Run Harborline again. Now it retrieves the opportunity, searches, and inspects the selected profile.

## Add the skill

- In FX, say:

Now make the pitch evidence-based. Add a tool that searches the company case studies, then add a pitch-writing skill that uses the opportunity, consultant search, full profile, and one relevant case study. Keep the main instructions short, keep everything in English, and never invent claims or metrics.

- Open the skill. Tools provide data; the skill defines the workflow.
- Run Harborline again. Watch the four calls, then read the pitch. Tool calls can pass while the result is still weak.

## Add the eval

- In FX, say:

Now create one eval for the Northstar Energy pitch. Verify that the run succeeds, calls all four tools, recommends Amelia Brooks, mentions Northstar Energy, and produces a final pitch. Keep the checks deterministic and use the standard Eve eval setup.

- Open the eval, then run:

pnpm eval

- The eval protects the workflow and facts. The people I am building for still judge pitch quality.

## Show the deployed Slack version

- I cannot deploy live, so I prepared the same agent in Slack. Vercel hosts it; AI Gateway routes the model; Workflow keeps it durable during approval.
- Mention PitchBot with the Harborline request. Then reply:

This looks good.

- The agent shows the pitch in an approval card. Click **Approve** and show it appear in `submitted-pitches`.
- Same agent, now where the team works.

## Close

- Build, run, inspect, evaluate, improve. Evals keep behavior stable; human review keeps the result good.
