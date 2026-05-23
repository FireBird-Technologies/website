---
title: "Building AI SaaS for 3 Years: What Worked, What Didn't"
excerpt: "Hard-earned insights from 3 years of building, launching, and scaling AI SaaS"
date: 2026-03-15T22:12:44+05:00
updated: 2026-03-15T22:12:44+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!Dd7j!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe42ddd4b-b831-4157-85c3-6f1064f94de2_1200x675.png"
tags:
  - AI
  - SaaS
  - Founder
  - Business
published: true
original_url: "https://firebirdtech.substack.com/p/building-ai-saas-for-3-years-what"
---

Before we begin, here’s a bit of context. I started FireBird Technologies in November 2023 with the goal of building the leading AI SaaS product and services company. Before that, I worked as an independent tech consultant for [Vanna.ai](https://vanna.ai/), one of the most powerful data agent frameworks.

Over the past three years, my team and I have worked on more than 20 AI SaaS products. Some were our own products and others were built as the technology partner for SaaS companies. Here are some of the projects we’ve worked on.

![](https://substack-post-media.s3.amazonaws.com/public/images/221f4724-6d78-4960-9422-bb111d286aac_1200x477.png)

Watch the video version of this post:

<div class="video-embed">
<iframe src="https://www.youtube-nocookie.com/embed/emmLH7ChxA0" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>
</div>

**Internal Projects**

1. [AutoAnalyst.ai](https://autoanalyst.ai/) — An AI data scientist platform. The hosted version has served over 1.8K users and 5K requests analysis performed. It has also been deployed inside other companies’ infrastructure, bringing in hundreds of thousands in service revenue. [The project is open source under the MIT license with around 670 stars](https://github.com/FireBird-Technologies/Auto-Analyst).
2. [Blog2Video](https://blog2video.app/)— A text-to-video content automation SaaS. Launched in February 2026 and already at about $1.3K in revenue with fast growth. .
3. [AutoDash](https://autodash.art/)— A simplified AI visualization tool. Focused more on designing visualizations than autoanalyst.
4. [AutoForm](https://autoform.ink/) — An AI MicroSaaS form builder we use internally to capture leads.
5. SQLTrainerAI — An AI simulator designed to help people learn SQL.

**Client Projects**:

Most client identifiers have been removed due to NDAs and but I do have consent to talk about the projects without referring to them. Below are just examples of the work we have done for $Bn companies, VC-funded startups and academics.

1. KPAI — [A research project for Michael Schrage on how different AI agents can become KPI indicators and specialists.](https://medium.com/firebird-technologies/kpai-a-new-way-to-look-at-business-metrics-75eaf0da8dbd)
2. CyberSecurity & Threat Analyst — An AI RAG system which detects malicious content on the dark web.
3. AI Digital Marketing Analyst — A variant of the [autoanalyst](https://autoanalyst.ai/) that was purposefully engineered for a digital marketing company. Giving them insights into campaign performance, ROI and marketing spend.
4. AI Property Management — A property management system that looked into Co2 emissions, property layouts and development contracts to provide insights to property developers.
5. AI Knowledge Base for a Consulting Firm — A knowledge graph–based AI agent that connects multiple knowledge centers to provide unified insights for a management consulting firm.

It’s safe to assume my experience speaks for itself. In the next section, I’ll share the mistakes I made, what I saw clients do wrong, and the approaches that actually worked.

> Hire me & my team for your next project. We have built over 20+ app, many in production for startups, $Bn companies & academics.
>
> Reach out here: <https://tally.so/r/3x9bgo>

### What did not work

Starting off with things that did not work. Many of these things looked good on paper but did not materialize any meaningful impact on the product’s revenue or improve user experience.

#### Trying to optimize what AI framework to use

![](https://substack-post-media.s3.amazonaws.com/public/images/f5dad0a3-5450-45d9-848d-5acc44770fe2_1080x782.jpeg)

*Just use the API directly*

Between 2023 and 2025, AI Twitter was full of debates over which AI framework to use. From experience, I can say that calling the API directly or building your own orchestration layer usually works better than relying on a framework. Some frameworks, like DSPy, can be useful for evaluation, but beyond that, it doesn’t make a real difference.

A lot of time and energy was wasted learning these abstractions, but it doesn’t improve the product — **the user doesn’t care!**.

#### Making your app LLM agnostic

![](https://substack-post-media.s3.amazonaws.com/public/images/9203b0a6-0db4-4a6e-aa51-2ef29ba64fab_1200x490.png)

*Simple is better, adding more apis just adds complexity*

This is one that I personally fell for. On the surface it isn’t a bad idea, you give the user more options on which provider they can choose. In theory that should help you, but most users don’t care that much. A subset of users which are tech savvy, privacy focused & politically active might care but for most users it isn’t a big concern.

It only makes your app harder to maintain and also it makes the user experience unpredictable. One user might be going through their favorite provider, only for the API to be down. Every time the model API upgrades you need to change your system, more APIs integrated more upgrades.

It creates more problems than it solves, unless it is the core proposition of your product. Keep only two (one core model the other backup/support cheap model) models. **Makes for smoother development and less headache.**

#### Focusing on technology hype

The tech sector has had this problem for a long time. A new hyped-up technology enters the scene and everyone on LinkedIn/X starts promoting it like it’s the next big thing. In the AI era, these include Graph-RAG, MCP, Agentic Memory, Open Claw, and similar tools. These technologies have use cases, but for the most part, they are overhyped. You should focus on them only if they help solve your core problem: getting more paid users.

The MCP vs CLI debate is ongoing, with people divided into both camps. I think it’s mostly a distraction. MCP is useful if your product is for technical users or those who will use it exclusively on model provider platforms, but setup is often complicated. Many users don’t bother, which is probably why model providers now offer marketplaces directly on their platforms. I haven’t set up a single MCP unless a client specifically asked me to; I simply use the API directly.

Don’t fall for the hype. Even using an older stack with previous-generation models and skipping the most advanced techniques, you can still make $Mn in revenue. **Focus on the core problem your product solves, try to get users to pay for it, ignore the hype.**

### Things that did work

Here are the things that actually worked in this space.

#### Combining AI with a real-world use case!

![](https://substack-post-media.s3.amazonaws.com/public/images/5acf86b6-287d-4474-b94b-5c8ba0f4e51f_1120x928.png)

*Image by Gemini*

Probably the single most important thing you can do is find a real-world business or problem and automate it with AI. As a technology partner, I had a front-row seat to the use cases that were actually profitable. Most major wins have been in boring, physically demanding businesses enhanced with AI.

Adding an AI layer to a truck repair service is more likely to succeed than developing a new AI memory system. AI has made tasks in the digital world easier, but the physical world remains challenging. Building AI tools for note-taking or spreadsheet replacements puts you in direct competition with companies like Anthropic or OpenAI. You can succeed, but the probability is lower, and model providers may use your telemetry data against you. Even major successes like Cursor face this problem — purely digital AI orchestration offers little moat.

#### Solve your problem first, then build a product!

So far, my company has launched five projects, but only two have generated meaningful revenue or attracted clients for productized services. Both of these started as personal automations that became products.

For [AutoAnalyst](https://autoanalyst.ai/), I initially built an AI data science coding and problem-solving agent to help me service clients faster, then later expanded it into a full platform. [Blog2Video](https://blog2video.app/) was an automation I built to create videos from my blogs and reach a wider audience. Both generate revenue passively and also bring in client inquiries for custom development.

If you’re a developer like me, I recommend automating as much of your work as possible with AI, then launching an MVP to see if people will pay. If you have a genuine solution to a real problem, people will pay — **even if it’s half-baked, vibe coded, and looks AI-generated.**

> We’re different from our competitors because we have real, paying products that we build, manage, and market ourselves. If you’re looking for product-focused AI development, you won’t find a better fit.
>
> Reach out here: <https://tally.so/r/3x9bgo>

### Only listening to paid users

Seems obvious yet it isn’t taken seriously enough. Only listen to the people who are paying you for your product. Don’t listen to free users or product gurus. Just focus on paid users and their needs.

Everyone I know who is building products has made this mistake, they took every comment they got from a user/friend/peer and tried to “fix” it. Don’t!

In most cases even after fixing it, they will likely not convert. Your core ICP will pay for an unpolished solution, but non-core users will never pay.

Focus on paid users or people who have shown real intent to buy (like are paying for your competitors).

### Conclusion

Here are the core lessons I learned from these past few years, hope to continue learning and grow. Please do subscribe, follow and share!


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/building-ai-saas-for-3-years-what)._

