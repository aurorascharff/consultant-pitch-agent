# FIVE-MINUTE DEMO STEPS

## Eve and the starter

- Open [eve.dev](https://eve.dev). We have this new tool called Eve, and I want to try building something with it. These days, working with agents is as much about being curious, trying tools, and finding a workflow that works for you as it is about writing code.
- Eve is Vercel's open-source framework for durable agents. It is not my specialty—I mainly work with Next.js—but I know the framework and have built a few useful agents with it. We use it internally for agents that manage work, and I used it to build an automated DX tester that attempts Next.js tasks and reports what was difficult.
- I used to be a consultant, and writing pitches meant combining customer context, consultant profiles, and past work. I originally built this example for a demo at my old company.
- Switch to VS Code. This is basically what I got from running the Eve CLI. Apart from synthetic demo data, the only integration I set up is the Slack connector. The agent itself is still plain.

## Start with the plain agent

- In `eve dev`, send:

Hey.

- It works, but it is only a generic assistant. Now I will give it a job.

## Define the job with FX

- Swipe to FX. This is another open-source tool we built: a minimal coding agent designed to be fast and context-efficient. I normally use Codex or Claude, but I want to try this CLI agent inside the repo today and see how it goes. I am voice-prompting it with Wispr Flow.
- That is really the point: try the tools, look at what they actually do, and work out which workflow fits you.
- FX uses AI Gateway. Open `/models` and search `qwen`. Qwen is an open model family I can try alongside Claude or GPT through the same interface, billing, and observability. Switch to Claude Opus, toggle `/fast`, and confirm with `/status`.
- Say:

I want this to be an English sales assistant for a consulting company. It should help me explore opportunities, compare consultants, and write concise, evidence-based pitches. It should never make up experience, availability, outcomes, or metrics.

- Open `agent/instructions.md` as it changes. Eve hot-reloads it.
- In `eve dev`, try the real task:

Write a short pitch for Harborline Logistics and recommend the best consultant for its data platform, integrations, and React dashboard.

- It understands the job, but it cannot access the data. In the agent loop, the model can use its instructions and available tools; right now the tool list is empty.

## Add data access

- Return to FX and say:

This is the right job, but the agent cannot access my data. I need it to look up opportunities, search consultants, inspect their full profiles, and find relevant company case studies using the synthetic data already in this repo. Give it tools for that and a reusable workflow for writing the pitch. Keep it simple.

- Watch the tools and skill appear. Tools provide access to data; the skill is the repeatable pitch workflow.
- Run the same Harborline request again. This time, watch the opportunity, consultant search, profile, and case-study calls.
- Read the result. Did it choose the right consultant, use relevant evidence, and write a useful pitch? Testing and judging the result is more important than simply generating the code.

## Turn the result into an eval

- Getting one good answer is not enough. When I build an agent, I want a repeatable way to check that it continues to produce a good result as I change the instructions, tools, or model.
- Evals are a bit like unit tests for agents. Some checks can be deterministic: did the run succeed, and did it call the tools I expected? For subjective qualities with many valid answers, a separate judge model can read the result and score the things I care about.
- Return to FX and say:

I want confidence that this keeps working when I change it. Add one small Eve eval for the Harborline request. Check in code that the run succeeds and uses the right data tools. Then use a judge to check that the pitch is relevant, evidence-based, and does not invent claims or metrics. Keep the eval and the package script simple.

- Open the eval as it appears. The code assertions check observable behavior; the judge handles the quality check where there is no single correct wording.
- Run:

```bash
pnpm eval
```

- Look at what passed and what did not. The point is to define what success means for this agent, then keep iterating until it reliably meets that bar.

## Add an approval gate

- Return to FX and say:

The pitch is useful now, but I also need a way to submit it. Add a submit action that posts the finished pitch to our configured Slack submissions channel. Always require human approval before it runs. Use Eve's built-in approval flow so Slack renders the approval buttons automatically—do not build custom Slack UI. Only the authenticated Slack user who started the thread should be allowed to approve it.

- Point out the two pieces FX added:
  - `approval: always()` triggers Eve's approval request. Eve parks the run, and Slack automatically turns that request into native buttons.
  - `onInputResponse` authorizes the click. It accepts the authenticated Slack user who started the thread and rejects everyone else, leaving the approval pending.
- In `eve dev`, the same approval request appears in Eve's own UI. The approval behavior belongs to the agent; each channel decides how to render it.

## Show the deployed version

- I built the equivalent complete version on `main` and deployed it to Vercel, so I will show that instead of deploying live.
- It uses the same Vercel stack we have been discussing: AI Gateway for the model, Vercel Workflow for the durable run and approval pause, Vercel Connect for Slack, and Agent Runs for observability.
- In Slack, mention PitchBot with the same Harborline request. Watch the same tools run.
- Reply:

This looks good.

- The run pauses and Slack shows the approval. Click **Approve**, then show the pitch appear in `submitted-pitches`.

## Close

- That is my loop: try a tool, describe what I need, inspect what the agent actually did, and then add an eval so I can keep improving it without losing the behavior I care about.
