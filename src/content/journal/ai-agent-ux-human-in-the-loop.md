---
title: "AI Agent UX: Designing Human-in-the-Loop Controls"
seoTitle: "Human-in-the-Loop AI Agents: UX for Approvals"
description: "How to design human-in-the-loop approvals for AI agents: preview before, interruptibility during, audit and undo after. A UX framework for trust."
pubDate: 2026-06-29
updatedDate: 2026-07-22
author: "Dani Bottaro"
category: "AI & UX"
heroImage: "../../assets/journal/ai-agent-ux-human-in-the-loop/pexels-photo-32845700.jpeg"
heroAlt: "Engineer monitoring multiple screens in a control room, a metaphor for human-in-the-loop AI agent UX"
legacyPath: "/ai-agent-ux-human-in-the-loop/"
---

A B2B billing tool shipped an AI agent, and one afternoon it refunded 240 customers in about four minutes. It had read a support macro as a command, decided the quickest way to “resolve open tickets” was to refund every one of them, and went ahead. Nobody approved it. Nobody was watching. Finance pieced it together the next morning.

Blaming the model misses the point. The model did what agents do: hand it a goal, it picks its own path. The gap was in the product. It gave an autonomous system the keys to move money and left nowhere for a person to step in between the intent and the damage. Most of the work in **AI agent UX** comes down to putting that person back where they matter, without strangling the speed that made the agent worth building in the first place.

## Why agent UX breaks the rules you already designed around

For two decades, software UX ran on a quiet promise: you click a control, the system does exactly what the label says. Buttons equal actions. The whole point was that nothing surprised you.

Agents tear that up. Now the user asks for an outcome: “clean up these duplicate accounts,” “draft replies to everyone in this folder,” “scale the cluster if traffic spikes,” and the system works out the steps on its own. The screen stops being a fixed menu of actions and becomes a handoff of judgment, which is really the shift underneath [product design for AI tools](/industries/ai/). Once you see it that way, human-in-the-loop design stops being a safety bolt-on and turns into the core of the thing.

Here’s the trap. The two ways to get it wrong pull in opposite directions. Too little oversight, and the agent runs with a bad read, like the refund mess, and torches trust in one move. Too much, and you’ve rebuilt the manual tool with extra confirmation clicks, and the user starts wondering why they’re babysitting the thing that was supposed to save them time. The real job is narrow: spend the user’s attention only where the stakes actually earn it. Google’s [People + AI Guidebook](https://pair.withgoogle.com/chapter/feedback-controls/) calls this balancing control and automation, and in agentic products it’s the tension everything else hangs off.

## The three moments where a human belongs in the loop

Teams tend to picture “human-in-the-loop” as one approval popup. There are really three moments, and they don’t want the same design.

### Before the action: preview and approval

The cheapest intervention is also the most useful: show people what the agent plans to do before it does it. Not a fuzzy “I’ll take care of that,” but the actual move: “I’ll refund these 240 orders, $18,400 total, from this account.” A preview quietly turns an irreversible surprise into a decision someone gets to make. The trick is calibrating what you show. Enough to judge the action, not so much that people skim a wall of text and hit approve on reflex. Lead with the blast radius (how many records, how much money, which systems) and let them open the detail if they want it.

### During the action: interruptibility

Anything long-running needs a stop button you can actually see. If the agent is grinding through 500 items, the user has to be able to kill it at item 12 the moment they notice it’s off, and see plainly what already got done. An agent you can watch but not interrupt isn’t a tool, it’s a runaway process with a progress bar. Make pause and stop first-class controls that stay within reach, and keep the running state honest: done, in flight, still queued.

### After the action: audit and undo

Once the action has already happened, the person’s job shifts to reviewing and cleaning up. Every move the agent makes needs a trail someone can actually read (what it did, when, why, on what input), written for a stressed human scanning fast, not buried in a logs tab nobody opens. If it can be undone, give them a real undo. If it can’t, that’s your tell that it should have asked first.

## A framework: sort actions by reversibility and blast radius

You can’t put a human in front of every step without wrecking the product. So the call you have to make, on purpose, is which actions earn friction and which don’t. Two questions carry most of the weight.

**Reversibility.** Can you cleanly undo it? Editing a draft, sure. Sending the email, deleting a customer record, moving money, no.

**Blast radius.** How many people, records, or dollars does one action touch? Renaming a file is nothing. Re-tagging 10,000 contacts is not.

Plot the agent’s actions against those two and the design mostly writes itself:

-   **Reversible and small** (reorder a list, draft some text): let the agent run. Friction here just annoys.
-   **Reversible but large** (bulk-edit 10,000 records): go ahead, but show a clear summary and a one-click undo.
-   **Irreversible but small** (send one message): a light confirm does the job.
-   **Irreversible and large** (issue 240 refunds, drop a production database): hard stop. Ask for explicit, specific approval with the numbers in front of the user, every single time.

The refund fiasco lived squarely in that last box and got designed like it belonged in the first. That one mismatch is the most common, and the priciest, mistake in agentic products right now.

## Patterns that build trust without slowing the agent down

Friction isn’t your only lever. A few patterns keep people confident while the agent keeps moving.

**Show the reasoning, briefly.** A one-line “why” next to each step, like “flagged as duplicate: email and phone match,” lets people trust the fast stuff and catch the bad stuff early. This is where [explainable AI UX](/explainable-ai-ux/) earns its keep, not as a compliance box but as the thing that lets someone approve in two seconds instead of twenty.

**Scope the grant.** Let people hand over authority in measured amounts. “Refund up to $500 on your own; past that, come ask me.” Permission turns into a dial the user sets, not a single yes-or-no at the front door.

**Default to draft.** When you’re not sure, have the agent stage the result for a human to release instead of pushing it live. A folder of drafted replies you send with one click feels like leverage. Forty already-sent replies feel like a hostage situation.

**Keep the state visible.** People put up with autonomy when they can see what the agent is doing right now. A steady, ambient status beats a quiet system that surfaces once in a while to report something it already finished.

## What to measure

If you ship agent UX, keep an eye on two numbers, and watch them against each other. Intervention rate: how often people stop, edit, or reject what the agent proposed. And completion without rework: how often its output just stands, no cleanup needed. A healthy product pushes rework down while keeping intervention cheap and close at hand. If intervention sits near zero, odds are people are rubber-stamping, and the next refund incident is already in the mail. If rework runs high, the agent is fast at producing things nobody trusts.

The teams who get this right stop treating the human and the agent as separate things. They design them as one system, together, not a model with a confirmation dialog stapled on at the end. Nielsen Norman Group argues the same for keeping [a heavy dose of human judgment](https://www.nngroup.com/articles/ai-ux-getting-started/) in any AI workflow. It’s harder than it sounds, because it forces product decisions about authority, reversibility, and attention before anyone has drawn a single screen.

If you’re building an agentic product and going back and forth on whether to work these patterns out in-house or bring in a partner who has already shipped complex product UX across AI, Cloud, and Fintech, [talk to delbueno™ Studio](/contact/). Better to get the human-in-the-loop layer right now, before the version that moves money ships without it.
