# FIVE-MINUTE DEMO STEPS

## Set up the split view

- (The project is already open in VS Code.) Keep the editor visible and split the integrated terminal into two panes.
- Run eve dev in the left terminal. Keep the right terminal ready for FX.
- The audience should be able to see the agent running, the coding agent working, and the files changing without switching windows.
- What I want to show is not only the finished agent. I want to show how I actually build one.
- This application uses eve, Vercel's open-source agent framework. Eve is the harness around the model. It gives me the filesystem structure, durable sessions, tools, skills, channels, approvals, and evals that turn a model into an application.
- An eve agent is just a directory. The instructions and workflows are Markdown. The tools are TypeScript. I can see the complete application in the editor and change it as code.
- Open agent/agent.ts. The provider and model are one string. This agent makes that model call through Vercel AI Gateway.
- AI Gateway gives me one API for more than 200 models from different providers, with shared billing and observability. I can change that string without rewriting the agent or managing a separate integration for every provider.
- That separation matters. Eve controls how the agent behaves. AI Gateway lets me choose which model powers it.
- Open agent/instructions.md. This is the job we have given it.
- Open agent/lib/data.ts briefly. The customer opportunities, consultant profiles, and case studies exist in the application.
- The important part is that the model cannot use that data yet. There are no tools and no skills.
- Keep the deployed Slack version open and ready for the final part of the demo.

## Run it without tools

- In the left terminal, open a fresh eve conversation.
- Send this:

Write a short pitch for Harborline Logistics and recommend the best consultant for its data platform, integrations, and React dashboard.

- Watch the answer. It can produce the shape of a consultant brief, but it cannot look up Harborline, name the right consultant, or support the pitch with evidence.
- Point at the run. There are no tool calls.
- The data is in the application. We need to give the agent controlled access to it.

## Add the opportunity tool

- Move to the right terminal and start FX. Leave eve dev running beside it.
- I sometimes use Codex for this kind of work too. For this demo I want the entire coding flow to stay visible inside the repository and its VS Code terminal, so I am using FX.
- FX is the coding agent I am going to use to change this application. We just launched it from Vercel Labs. It is open source, model-agnostic, and designed to feel more like a small Unix tool than a heavy terminal interface.
- FX is also using Vercel AI Gateway. That gives me the same catalog of models here in the coding agent, and I can switch models without changing the workflow or moving to another tool.
- Open the model picker briefly. This is the practical benefit of the Gateway: I can choose the model that fits the task from inside FX and keep working in the same interface.
- I normally use Wispr Flow for this. It lets me dictate anywhere I can type, so the same voice-prompting workflow works whether I am using Codex, FX, or another coding interface.
- Today I am using Wispr Flow to voice-prompt FX. I am going to add one capability at a time and inspect the code it writes.
- Say this:

Give this agent a tool that looks up a sales opportunity by customer name or ID. Use the existing synthetic data and keep it simple.

- Watch agent/tools appear. Open get_opportunity.
- This is a typed function over application data. The model can now retrieve a customer instead of guessing what the customer needs.

## Add consultant matching

- Stay in the same fx conversation. Say this:

Now add consultant matching. I need one tool that searches consultants by skills and industry, and another that retrieves the selected consultant's full profile.

- Watch the two tools appear.
- Search gives the model a shortlist. The profile gives it the evidence it needs before naming someone.
- We are building this up capability by capability. Nothing here depends on the model having seen our business data during training.

## Add the pitch workflow

- Say this:

Now make the pitch evidence-based. Add a tool that searches the company case studies, then add a pitch-writing skill that uses the opportunity, consultant search, full profile, and one relevant case study. Keep the main instructions short, keep everything in English, and never invent claims or metrics.

- Open the skill when it appears.
- The tools provide access to data. The skill tells the agent how to combine those tools for this particular job.
- The workflow should retrieve the customer, find candidates, inspect the selected consultant, find one relevant company example, and then write the pitch.

## Run the same request again

- Move back to the left terminal. Eve has hot-reloaded the files FX created. Start a fresh conversation so the comparison is clean.
- Send the exact same request:

Write a short pitch for Harborline Logistics and recommend the best consultant for its data platform, integrations, and React dashboard.

- Watch the tool calls. First the opportunity. Then consultant search. Then the full profile. Then one company case study.
- Ethan Reed is now in the pitch because he is in the application data, not because the model invented a plausible person.
- Open one generated tool and the skill in VS Code. The audience can see that the behavior is source code.
- Same model. Same user request. The difference is the application around it.

## Add the eval

- One good run is not enough. I want to know that this keeps behaving the way we expect.
- Return to fx and say this:

Now create one eval for the Northstar Energy pitch. Verify that the run succeeds, calls all four tools, recommends Amelia Brooks, mentions Northstar Energy, and produces a final pitch. Keep the checks deterministic and use the standard Eve eval setup.

- Open the generated eval.
- Point out that it checks the tool chain and the important facts. It does not compare the full wording of a model response.
- Run:

npm run eval -- northstar-pitch

- Let it finish. Point at the pass, not at the raw event output.
- The first conversation showed that the agent can do the job. The eval makes that behavior repeatable and testable.

## Show it in Slack

- Switch to the deployed agent in Slack. Do not deploy during the demo; this version is already open and ready.
- Mention PitchBot in a thread with the same request:

Write a short pitch for Harborline Logistics and recommend the best consultant for its data platform, integrations, and React dashboard.

- The same agent retrieves the opportunity, searches consultants, inspects Ethan Reed's profile, and finds the supporting case study.
- Reply in the same thread:

This looks good.

- The agent does not send immediately. It shows the complete pitch in an approval card.
- Click Approve. Show the same pitch appear in submitted-pitches.
- The workflow moved from the terminal to Slack, but the tools, evidence, and approval boundary stayed the same.

## Close

- We started with instructions and data, but no way for the model to use the data.
- We added one bounded capability at a time, composed those capabilities into a workflow, watched the tool calls, turned the expected behavior into an executable test, and then ran the same agent through Slack with human approval.
