---
title: "Honest review of Cursor by a AI Engineer"
excerpt: "Honest Review by an AI Engineer who has built 20+ AI apps"
date: 2026-02-28T12:08:57+05:00
updated: 2026-02-28T12:08:57+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!yFGa!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3878d239-874b-4065-a93b-cc345af842f4_1800x1013.png"
tags:
  - Review
  - AI Coding
  - Cursor
  - Tools
published: true
original_url: "https://firebirdtech.substack.com/p/honest-review-of-cursor-by-a-ai-engineer"
---

I started reviewing [AI tools and writing about them a couple of months ago](https://www.firebird-technologies.com/p/honest-review-of-lovable-from-an). This style of blog has been both successful and fun. Readers have really enjoyed my perspective and found it insightful.

Cursor was one of the first coding agents to gain mainstream popularity after Gavin. Anysphere, the company behind Cursor, is the fastest company to reach both $100 million ARR and $1 billion ARR. Needless to say, the tool is extremely popular and useful.

Coding agents have really heated up in the last couple of months, with Anthropic and OpenAI both launching their own AI coding assistants. That makes this the perfect time to share what I think about them as someone who has been building AI apps for over two years.

Watch the video version of this review:

<div class="video-embed">
<iframe src="https://www.youtube-nocookie.com/embed/JfRRhi8Mr2I" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>
</div>

Video made using:

<div class="cta-inline">
<a class="cta-button cta-primary" href="https://blog2video.app/" target="_blank" rel="noopener noreferrer">Blog2Video →</a>
</div>

### Overview

Lets start with a general and quick overview of what capabalities cursor really has. It is a customized version of the OSS IDE VSCode, popular among developers.

#### Tab

![](https://substack-post-media.s3.amazonaws.com/public/images/f57128b0-cc86-49cd-afa6-e1f2a2653f5b_1063x676.png)

*Image of Tab suggestion*

**Tab** is a Cursor model built for smart autocompletion. It learns from your choices — accept with **Tab**, reject with **Esc** — so suggestions get better over time. With Tab, you can:

- Edit multiple lines at once
- Auto-add missing imports
- Move across files for coordinated changes
- Get context-aware suggestions based on recent edits and linter feedback

Tab is one of the early features that helped Cursor gain traction but overtime newer features like Chat mode and Cmd+K got more usage.

#### Cmd + K

![](https://substack-post-media.s3.amazonaws.com/public/images/ae2662a7-291e-4086-a672-9c6435f17403_811x253.png)

*Image of Cmd+K menu*

Cmd + K allows you to select a piece of code or a file and request cursor to make quick changes.

#### Chat

![](https://substack-post-media.s3.amazonaws.com/public/images/4ebf45c1-1fab-439f-b0bc-8513b95999e5_1191x417.png)

*Taken from Cursor docs*

![](https://substack-post-media.s3.amazonaws.com/public/images/c0b475ea-6958-4d63-9eb2-3beb65ee79d0_1200x1129.png)

*An example of the Agent/Chat window*

In the chat module, you’ve got 4 ways to interact:

- **Ask** — Get answers or explanations without changing your files.
- **Plan** — Maps out a full plan of changes, including a `.md` file and next steps.
- **Agent** — Acts directly on your request.
- **Debug** — Dives into errors using logs like a debug pro.

Now that we know what Cursor can do, let’s jump into the review challenge.

### Review Challenge

In all my coding platform reviews, I have the system replicate one of my projects. For this challenge, I’ll prompt Cursor in an empty folder to replicate **[autoanalyst.ai](https://autoanalyst.ai/)**.

We’ll use **Composer 1.5** here — a unique model/agent exclusive to Cursor. If I went with **Opus 4.6**, people will argue that the heavy lifting is by Anthropic engineers not Cursor engineers/makers itself.

![](https://substack-post-media.s3.amazonaws.com/public/images/8c81757c-02e1-43a1-8487-e32324fb46fd_1200x182.png)

*This is the exact prompt I used in mylovable review*

![](https://substack-post-media.s3.amazonaws.com/public/images/844df50c-15d5-4d32-a2e9-e6f79d9324ed_800x606.gif)

*Options Cursor asked in the prompt*

![](https://substack-post-media.s3.amazonaws.com/public/images/f3f0725c-35ba-4ce4-b847-ca695ea91675_800x620.gif)

*The walkthrough of the plan it built*

![](https://substack-post-media.s3.amazonaws.com/public/images/e964cd62-5e1d-4279-be56-9bc7935a1385_800x672.gif)

*Cursor agent creating the system*

The implementation summary, after zero interventions

![](https://substack-post-media.s3.amazonaws.com/public/images/e2fe220f-95b7-481d-8791-86d0435fef20_1200x826.png)

*Cursor explaining what it built*

Now lets try out what it

![](https://substack-post-media.s3.amazonaws.com/public/images/f63fca54-133a-4283-b85f-aa927d130049_1200x336.png)

*This is the UI which obviously isn’t bery good.*

> Want both the speed of vibe-coding & the trust/reliability of actual software engineer? Hire me & my team for your next project. We have built over 20+ app, many in production for startups, $Bn companies & academics.
>
> *Reach out here: <https://tally.so/r/3x9bgo>*

I asked it to visualize the data and tell me which houses (sample data is of housing) are important.

![](https://substack-post-media.s3.amazonaws.com/public/images/27577d63-727e-4a6f-be26-efd624dc79f7_800x448.gif)

*This is what it built in one shot*

Initial Thoughts

- **UI Experience:** The user interface was not very well-designed or aesthetically pleasing.
- **Functionality & Cost:** Despite the UI issues, the system functions reliably. Compared to other platforms for “vibe coding,” it is relatively affordable — unless you go beyond the Pro plan limits.
- **One-Shot Use:** For single, focused tasks using their Composer model (which offers higher usage limits than Opus/Codex), it serves as a solid starting point.

### Things I like about Cursor:

1. **Model Optionality:** Cursor offers a variety of models, including its own Composer model. This flexibility is a major reason I remain a long-term supporter. By contrast, switching to Claude Code would lock me into only Anthropic’s models.
2. **Good UX**: The Cursor team was among the first to nail a user-friendly experience for coding agents. Features like Tab autocomplete and Cmd+K made the tool feel engineered **by developers for developers**.
3. **Speed & Familiarity:** The system is generally fast and responsive, though performance varies by model. Choosing VSCode as the interface foundation was smart — most software engineers are already familiar with its workflow, reducing friction and improving productivity.

### Thing I don’t like about Cursor:

1. **Aggressive Pricing**: Cursor is affordable only if you remain within the pro-plan limits, afterwards the costs scale quickly. I can understand why since they don’t own the model APIs they have to charge a premium. The number one complaint on r/Cursor is usually about how quickly costs scale after plan limits reached.
2. **Unreliable Context switching**: In my own use I found that the chat module does not switch context reliably enough. If I asked it to move from feature A to feature B it sometimes starts making changes again to feature A.
3. **Auto model selection is useless:** Auto is suppose to give you balanced model to get your tasks done. However, I almost never use it after trying it once or twice. Almost all changes by auto are not very good or balanced.

### Cursor Wishlist:

1. **Top tier Composer Model:** Composer is good when you know what you are doing. However, it can’t compete with latest models made by Anthropic/OpenAI. I really wish they build the top tier competitor to gpt and opus.
2. **Better UI builder:** Depending on when you read this, they might have already fixed this. However, mostly the UI built by cursor is similar, it usually has that ‘made with AI’ feel. If they can ensure that their orchestrator can make a ‘different’ UI than most, it would be awesome.

Overall, cursor is a great tool. One me & my team use every day. I hope you enjoyed this review, please follow & [subscribe](https://firebird-technologies.com/)

> Want both the speed of vibe-coding & the trust/reliability of actual software engineer? Hire me & my team for your next project. We have built over 20+ app, many in production for startups, $Bn companies & academics.
>
> *Reach out here: <https://tally.so/r/3x9bgo>*

**[Honest review of Lovable from an AI engineer](https://www.firebird-technologies.com/p/honest-review-of-lovable-from-an)***[I tried lovable to build projects, and here is an honest review](https://www.firebird-technologies.com/p/honest-review-of-lovable-from-an)*[www.firebird-technologies.com](https://www.firebird-technologies.com/p/honest-review-of-lovable-from-an)


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/honest-review-of-cursor-by-a-ai-engineer)._

