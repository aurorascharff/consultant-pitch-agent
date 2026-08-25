# Demo: Build and run an eve agent

**Length:** About 15 minutes  
**Repository:** [aurorascharff/consultant-pitch-agent](https://github.com/aurorascharff/consultant-pitch-agent)

The demo has two parts. Spend about five minutes scaffolding a small eve agent and changing its behavior through `instructions.md`. Use the remaining ten minutes for the completed consultant pitch agent, including tools, skills, Slack, human approval, and Vercel Agent Runs.

All customers, consultants, projects, and results in the consultant demo are synthetic.

## Prepare before the talk

- Confirm that the deployed agent responds in Slack.
- Confirm that approval posts the unchanged pitch to `#submitted-pitches`.
- Confirm that the deployed run appears under **Observability → Agent Runs**.
- Make sure `/Users/aurorascharff/Documents/Fagfestivalen/my-agent` does not already exist.
- Open the completed `consultant-pitch-agent` repository in VS Code.
- Prepare these four screens in order:
  1. Terminal
  2. VS Code, first with the generated project and then with the completed agent
  3. Slack
  4. Vercel Agent Runs

## Part 1: Scaffold and customize an agent (about 5 minutes)

### Create the project

[Show the Terminal window.]

Say:

- We have seen the infrastructure an agent needs. Now I want to show what eve gives us when we start a new project.
- I am going to create a small agent first. Once it is running, I will turn it into a simple consultant assistant by changing its instructions. We will add the complete application later.

Run:

```bash
cd /Users/aurorascharff/Documents/Fagfestivalen
npx eve@latest init my-agent
```

While the initializer runs:

- Point out that this creates a regular code repository rather than configuring an agent in a separate dashboard.
- Choose **Start eve dev** when the initializer offers the next action. The CLI opens `eve dev --input /model` so the model can be configured immediately.
- Select **AI Gateway via Project**. The agent uses the Vercel project linked by the CLI, so no API key needs to be pasted on stage.
- Explain that this is the easiest option for this demo. The initializer can also use AI Gateway through an API key, a ChatGPT subscription through Codex CLI, or a model provider directly.
- Keep the default model unless you want to show the model picker.
- Let the initializer install dependencies and create the project.
- Open `/add` and briefly show the available channels, MCP connections, extensions, and observability integrations. The scaffold can add Microsoft Teams, Slack, or another channel without changing the core agent. Do not configure a real channel on stage.

### Try the default agent

[Stay in the eve terminal interface.]

Send a simple first message:

```text
hey
```

Point out that the generic answer proves the agent is running, but it does not have a useful job yet. Then send:

```text
Vi trenger en konsulent til å modernisere en kundeportal for et energiselskap. React og Next.js er viktig, og migreringen må kunne skje trinnvis.
```

Say:

- The scaffold already runs. We have a model, a durable session, and a local interface.
- The response is still generic because we have not told the agent what role it has or how to structure this task.
- I can change that behavior without rewriting the runtime. The stable role and rules live in `agent/instructions.md`.

Keep the terminal running and open `/Users/aurorascharff/Documents/Fagfestivalen/my-agent` in VS Code beside it.

### Inspect the scaffold

Open the new project and briefly show the generated files:

- `agent/agent.ts` contains the selected model.
- `agent/instructions.md` contains the standing instructions sent with every model call.
- `package.json` contains the commands for development, builds, deployment, and evals.
- The linked Vercel project supplies the AI Gateway access for this demo, so there is no key to reveal.

Say:

- The model configuration and the agent behavior are separate. `agent.ts` chooses how the model runs. `instructions.md` defines the job it should perform.
- Instructions are Markdown, so they can be reviewed and deployed with the rest of the application.
- Tools, skills, channels, connections, and evals appear as files when the application needs them.

### Change the agent's behavior

Open `agent/instructions.md`. Copy the complete block below, replace the generated instructions, and save:

```markdown
# Role

You help consulting teams turn a customer request into a clear consultant brief.

# Behavior

- Reply in Norwegian Bokmål.
- Use only information the user provides. Do not invent consultants, projects, customers, availability, or results.
- Ask one focused follow-up question when essential information is missing.
- Keep the response concise and use this structure:

  **Kundebehov**

  Summarize the outcome the customer needs.

  **Ønsket konsulentprofil**

  Summarize the relevant skills, experience, and delivery constraints.

  **Neste steg**

  State what information or action is needed to find and recommend a consultant.
```

Pause on the file long enough to show the four rules:

- The agent helps turn customer needs into a consultant brief.
- It responds in Norwegian Bokmål.
- It does not invent consultants, projects, or results.
- It returns a consistent customer need, consultant profile, and next step.

Return to the running eve terminal. If it stopped while the file was edited, restart it with:

```bash
cd /Users/aurorascharff/Documents/Fagfestivalen/my-agent
pnpm dev
```

Send the same request again:

```text
Vi trenger en konsulent til å modernisere en kundeportal for et energiselskap. React og Next.js er viktig, og migreringen må kunne skje trinnvis.
```

Show that the response now follows the consultant-specific structure and stays within the information supplied in the prompt.

Say:

- We changed the behavior by changing one Markdown file. eve rebuilt the agent and the next session used the new instructions.
- This is enough for a focused assistant, but it cannot find a real consultant or prove its claims. It has no business data and no actions yet.
- A useful consultant agent needs bounded access to opportunities, profiles, availability, and approved customer evidence. It also needs a review step before it sends anything.
- I have prepared that version so we can look at the application around the model rather than live-code every integration.

[Switch to the completed `consultant-pitch-agent` repository in VS Code.]

## Part 2: Run the completed consultant pitch agent (about 10 minutes)

### Introduce the use case

Say:

- Imagine that a consulting company has an incoming opportunity and needs to find the strongest available person quickly.
- The information is normally spread across a customer relationship management system, consultant profiles, resource planning, and approved case studies.
- The agent should gather that evidence, recommend a consultant, and draft a pitch. It must not invent experience or send the pitch without a person reviewing the final text.
- This repository uses synthetic records, but the boundaries match a real application.

### Walk through the project

[Use the VS Code file tree. Open only the files named below.]

Start with the familiar files:

- `agent/agent.ts` selects the model, like the scaffolded project.
- `agent/instructions.md` now contains the complete standing rules for evidence, language, drafting, and submission.

Then show what the completed application adds:

- `agent/tools/get_opportunity.ts` retrieves the customer's needs and constraints.
- `agent/tools/search_consultants.ts` finds candidates from the requested skills and industry.
- `agent/tools/get_consultant_profile.ts` retrieves the approved facts for one consultant.
- `agent/tools/search_case_studies.ts` finds company evidence that supports the pitch.
- `agent/tools/submit_pitch.ts` is the side-effecting action. It requires approval before the pitch can be delivered.
- `agent/skills/write-sales-pitch/SKILL.md` defines the multi-step procedure for combining those sources without attributing a company case study to an individual consultant.
- `agent/channels/slack.ts` connects the same agent to Slack and renders the approval request in the conversation.
- `evals/` checks recommendation evidence, Norwegian language, unsupported claims, and approval behavior.

Say:

- This is the same filesystem model as the starter. The project becomes more capable by adding explicit application code around it.
- The tools are deliberately narrow. The model can request one opportunity or search a constrained consultant set. It does not receive unrestricted access to an entire system.
- In a production version, these tools could connect to a CRM, a CV system, resource planning, and an approved content library. Each connection would use its own credentials, scopes, and authorization checks.
- The skill carries the procedure. The tools carry the trusted data and actions. The instructions carry the permanent behavior.

### Run the completed agent locally

[Open the integrated terminal in VS Code.]

Run:

```bash
pnpm dev
```

Send:

```text
Vi skal svare på muligheten Nordlys Energi. Finn en konsulent som passer, og lag en kort pitch. Vektlegg React, Next.js og migrering.
```

As the run progresses:

- Point out each tool call in the terminal.
- Show that the agent first retrieves the opportunity before it searches for a consultant.
- Show that it opens the selected profile before making personal claims.
- Show that it retrieves one relevant case study as company evidence.
- Wait for the recommendation and the blockquoted **Endelig pitch**.

Say:

- The model is not answering from training data. It is building the recommendation from records returned by the application.
- The final response names the evidence it used, so the person reviewing it can trace the recommendation.
- The local run proves the application works, but the person doing this job would not normally sit inside the terminal. Our team works in Slack, so that is the production interface I configured.

Stop the local process and switch to Slack.

### Run the deployed agent in Slack

[Open a clean Slack thread with `@KonsuBot`.]

Say:

- Slack is a channel into the same agent. The instructions, tools, and skill do not need to be rewritten for the Slack interface.
- Slack gives the application the conversation thread and the identity of the person making the request. The application must still enforce what that person is allowed to access or submit.

Send:

```text
@KonsuBot Vi skal svare på muligheten Nordlys Energi. Finn en konsulent som passer, og lag en kort pitch. Vektlegg React, Next.js og migrering.
```

While the agent works:

- Explain that the deployed run follows the same source chain as the local run.
- Point out the recommendation, the reason for choosing the consultant, the final pitch, and the evidence records.
- If you want to show conversational state, request one small change in the same thread:

  ```text
  Gjør pitchen litt kortere, men behold resultatene fra migreringen.
  ```

- Show that the agent uses the existing thread context when it revises the draft.

When the final pitch is ready, reply:

```text
Denne ser bra ut.
```

Say:

- That sentence does not submit the pitch by itself. It tells the agent to call the protected `submit_pitch` tool.
- The tool pauses the durable workflow and renders the exact final text in an approval card.
- Authorization and approval solve different problems. Authorization determines whether this person can perform the action. Approval lets the person inspect and confirm this specific pitch.

Review the approval card, then click **Godkjenn**.

- Open `#submitted-pitches`.
- Show that the delivered pitch is the same text that appeared in the approval card.
- Point out that the workflow continued from the paused tool call after the Slack action. The agent did not restart the entire task.

Say:

- A real version could now create a CRM draft, notify an account owner, or start another approved workflow.
- The demo posts to a Slack channel so the side effect is visible and safe.

[Switch to the Vercel dashboard.]

### Inspect the production run

Open the deployed project, then navigate to **Observability → Agent Runs** and select the Slack session you just completed.

Say:

- The Slack message is the interface the employee saw. Agent Runs shows the application work behind that message.

Walk through the run:

- Show the Slack trigger and the conversation turns.
- Show the total duration, model, token usage, cost, and tool count.
- Open the model steps and tool calls to show their inputs and outputs.
- Find the `submit_pitch` call and show where the run paused for approval.
- Show the continuation after **Godkjenn** and the successful tool result.

Say:

- If the recommendation were wrong, I could check whether the opportunity was incomplete, the search returned the wrong consultant, the instructions were unclear, or the model ignored good evidence.
- If the pitch failed to post, I could inspect the protected tool and the Slack delivery instead of guessing from the final message.
- The trace gives us the material for debugging and evaluation. We can turn a failure into an eval and rerun it after a change.

Close the demo:

- We started with a model and one Markdown file.
- The completed agent uses the same project model, expanded with trusted tools, a load-on-demand skill, a Slack channel, a durable approval, evals, and production observability.
- That is the shift from prompting a model to building an agent as an application.

[Return to the slides.]
