# FIVE-MINUTE DEMO STEPS

## Eve and the setup

- Open [eve.dev](https://eve.dev). I am building this with Eve, Vercel's open-source agent framework. We use it internally for agents that manage work. I also used it to build an automated DX tester that attempts a set of Next.js tasks and reports what was difficult. Eve combines the AI SDK, AI Gateway, and Vercel Workflow; the agent itself is a directory of instructions, tools, and skills.
- I used to be a consultant, and I built this example for a demo at my old company. Writing a good pitch means combining customer context, consultant profiles, and past work.
- Switch to VS Code. I started with Eve, added Slack, synthetic data, and short pitch instructions. There are no tools or skills yet. `eve dev` is on the left and FX is on the right.
- The loop is: change it, run it, inspect it, judge it.

## Run the pitch without tools

- Explain the agent loop: the model reads the conversation, instructions, and available tools; it can call a tool, receive the result, and continue until it has a final answer. Right now the available-tool list is empty.
- In `eve dev`, paste the request we will use throughout the demo:

Write a short pitch for Harborline Logistics and recommend the best consultant for its data platform, integrations, and React dashboard.

- Watch it struggle. It can write plausible text, but it cannot retrieve Harborline, search consultants, or find evidence. It has no tools or pitch-writing skill.

## Open FX

- Swipe to the second terminal tab and show FX. This is another tool we built: an open-source coding agent I can run inside the repo. I am voice-prompting it with Wispr Flow.
- FX uses AI Gateway: model access across providers, like OpenRouter, but integrated with Vercel billing and observability. Open `/models`, search `qwen`, switch to Claude Opus, toggle `/fast`, and confirm with `/status`.
- Now build the complete workflow in one prompt.

## Build the agent

- In FX, say:

I want this agent to write evidence-based customer pitches and recommend the right consultant. It should understand the opportunity, find suitable consultants, inspect the person it recommends, and find one relevant company case study before writing. Use the synthetic data already in the repo. Give it tools to access the data and a skill for the pitch workflow. Keep the main instructions short, keep everything in English, and do not invent details or metrics.

- FX already has the repository's Eve context, so I can describe what I need instead of specifying the framework implementation.
- Watch the tools and skill appear. Open them as FX works: tools provide access to data; the skill defines how the agent combines them for this job.
- Eve hot-reloads the files. Paste the same Harborline request again.
- Watch the calls, then read the pitch. Did it use the right data, choose the right consultant, find a relevant example, and write something useful? If not, iterate. That judgment is the real work.

## Add the eval

- In FX, say:

Now I want to know this keeps working. Create an eval for a Northstar Energy pitch. It should verify that the agent uses all four data tools, recommends Amelia Brooks, mentions the customer, and returns a real pitch. Keep the checks deterministic and use Eve's standard eval setup.

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
