# DEMO STEPS

## Opening

- (Exit slides. First screen is already up: terminal on one side, VS Code on the other, Fagfestivalen folder open.) We have seen the infrastructure an agent needs. Now I want to show what eve gives us when we start a new project.
- I am going to create a small agent first. Once it is running I will turn it into a simple consultant assistant by changing its instructions. Then we look at the completed application. Customers here are synthetic.
- The folder is already open in VS Code, so when the project appears we do not have to open anything. Init has already run. We are sitting on the first confirm after the CLI. There is no install step in this demo.

## Confirm and add a connection

- Confirm the first CLI step. Watch the folder appear in VS Code on the other side of the screen.
- Continue on the CLI. Add a connection. Add Teams. See it appear.
- This is the point: we can add any connection here. Slack, Teams, whatever the job needs. The agent is a source repo. A connection is a file, not a dashboard setting we cannot see.
- I am going to use Slack on the completed agent later because it is easier to set up than Teams. Same idea.

## Start eve dev

- Start eve dev.
- Use the AI Gateway built-in connection so we do not have to paste a key on stage. This comes before the first chat.
- The terminal UI is ready. We have a model. We have not given it a job yet.

## First chat, generic

- Send hey. It already runs. The answer is generic because this agent has no job yet. That is the point: the runtime is there, the work is not.
- I can change that without rewriting the runtime. The job lives in instructions.md.

## Change instructions.md

- Open instructions.md in the VS Code side. Paste this over the generated file. It is a paste, not a live rewrite.

  Role: You help consulting teams prepare evidence-based pitches for sales opportunities.

  Behavior:
  - Reply in Norwegian Bokmaal. Keep the whole answer in Norwegian.
  - Only claim what the user has told you. Never invent consultants, projects, customers, availability, or results.
  - Do not block on clarifying questions. Write the recommendation from what you have.
  - Use this structure every time:
    **Anbefalt konsulent:** name and role
    **Kundens behov:** what the customer needs
    **Endelig pitch:** a short pitch to the customer as a Markdown quote
    **Mangler:** everything you could not support
  - Close by asking whether the pitch is good as it is or the user wants to adjust something.

- Save. Expect a hot reload. The next session uses the new instructions. We did not restart the runtime.
- Pause on the rules: Norwegian, no invented people, no blocking questions, and the same headings the finished agent uses.

## Havspor, still just a model

- Send this:

Lag en pitch for Havspor Logistikk. Vi trenger en konsulent som kan samle operasjonelle data, bygge integrasjoner og lage et React-dashboard.

- Watch the answer. Right shape, right language: Anbefalt konsulent, Kundens behov, Endelig pitch. But there is no name under Anbefalt konsulent, and Mangler is where the whole answer really lives.
- No tool calls. We changed one Markdown file and the next session used it. It still cannot look Havspor up, cannot search consultants, cannot submit a pitch.
- A useful consultant agent needs bounded access to opportunities, profiles, and a review step before it sends anything. I have that version ready.

## Completed agent: instructions first

- (Switch to the second screen: VS Code on the finished app, consultant-pitch-agent, folders open.) Same filesystem. Same Havspor prompt. Now it can retrieve, search, and submit.
- Imagine a consulting company with an incoming opportunity. The information is spread across CRM, profiles, resource planning, case studies. The agent should gather that, recommend someone, draft a pitch. It must not invent experience or send without a person reviewing.
- Open instructions.md first. This is where the job is. This is also where we detail the tools we added.
- Walk the standing rules while you are in the file: get_opportunity before drafting. Search consultants. Load the pitch skill. Only claim what the tools returned. Norwegian. Draft first, label it Endelig pitch. When they say it looks good, call submit_pitch. Never say it was submitted unless the tool returns submitted true. If the caller is local, say that submission needs an authenticated Slack user.
- Close instructions.md.

## Then the tools

- Now the tools. Open tools/. These are the calls the instructions just named.
- get_opportunity: fetch the customer before writing.
- search_consultants, get_consultant_profile, search_case_studies: search, then the person, then one company case. Not training data.
- submit_pitch: the write. approval always. A write never goes through until someone says yes. That is the control, not a prompt.
- Slack is the connection on this agent. I chose Slack because it is easier to set up than Teams. Same channel idea we saw when we added Teams on the scaffold.

## Run it

- The completed agent is already running. Same Havspor prompt.
- Watch the tool calls. First get_opportunity. Fetching the customer before it writes.
- Then search_consultants. Not picking a name from training data.
- Then the profile, then one company case. Erik Lund is in the pitch because he is in the search result. One logistics case, not a stack of extra names.
- Endelig pitch is the last heading. That is the record, not the model inventing a close.
- Same prompt as the scaffold. The difference is the application around the model, which you can see as tool calls.

## Looks good, local fail

- Do not rewrite it. Send this right away:

Denne ser bra ut.

- Watch the pause. It proposed submit_pitch but has not executed. Approve in the UI.
- It fails because we are not in Slack. Local-dev is not a Slack user. Expected. Say so. The pause is the point. Submission needs an authenticated Slack user.

## Evals

- Open evals. We want this to behave the same way every time. It should always make this kind of pitch: retrieve first, search before naming, one company case, Endelig pitch, pause on submit until approval.
- Run evals. Let it finish. Point at the pass, not at the JSON.
- The demo is one run. The eval is the same run as a test. That is how you keep the agent from drifting after you leave the stage.

## Slack

- (Third screen: deployed app in one tab, Slack in the other.) Same agent, now from Slack.
- Mention KonsuBot in a thread with the same Havspor prompt.
- Same retrieve, same search, same Endelig pitch.
- Denne ser bra ut. Watch for Godkjenn. Click it.
- See it appear in Slack. submitted-pitches has the same text. The run resumed after Godkjenn, it did not post twice.

## Agent Runs

- (Fourth screen: Vercel Agent Runs.) Click the thread we just ran. Do not go hunting for submit_pitch.
- Cost is about fifty cents. That is the point to land: a real run has a real cost.
- Showcase the tool calls and the reasoning of the model. Opportunity, search, profile, case, the pitch, the pause, the continue after Godkjenn.
- We started with a model and one Markdown file. This is the same project, with tools, a Slack channel, a durable approval, evals. Prompting a model versus an agent as an application.
- (Return to slides.)
