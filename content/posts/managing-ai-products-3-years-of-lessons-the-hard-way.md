---
title: "Managing AI Products: 3 Years of Lessons the Hard Way"
excerpt: "The most important insights from my own experience"
date: 2026-07-20T13:17:13+05:00
updated: 2026-07-20T13:17:13+05:00
cover_image: "https://miro.medium.com/v2/resize:fit:1400/1*eJphxFlG9x7spK5DGqC9sA.png"
tags:
  - AI
  - Product
  - SaaS
  - Founder
  - Business
published: true
original_url: "https://medium.com/@arslan.scheema1997/managing-ai-products-3-years-of-lessons-the-hard-way-5d221ae836d2"
---

![](https://miro.medium.com/v2/resize:fit:1400/1*eJphxFlG9x7spK5DGqC9sA.png)

I've been in the AI space since 2023. In that time, I've worked on 14 AI products, 12 as a technology partner and 2 that my firm owns directly.

Along the way, I've had a front row seat to every problem that comes with running an AI SaaS business. The projects I've worked on have had hundreds of thousands of users and generated millions of dollars in revenue. My role has always been a mix of technical and business, not just one or the other.

This post covers everything I wish I'd known before managing my first project: every failure I ran into, and the solutions I wish I'd found sooner. They are listed below in no particular order:

## 1. Don't just pretend to talk to customers, actually talk to them

Everyone tells you to talk to your customers, but very few people actually go above and beyond to do it. Most PMs think this just means reading through support tickets or running a survey every sprint to see what users think.

Actually, talking to customers means sending every single signup a message, with at least 3 follow ups. It means personally going through every support chat to pick up on clues about what problems users are facing. It means watching people use your product, over and over again. It also means automatically sending an apology if anything breaks.

Talking to customers is hard work, because you can't just wait around for a customer to send you a complaint. Very few users feel compelled to do that, most just cancel and never come back. Getting your hands dirty is something most people avoid but that is exactly what you need to do, if you are currently below 2000 signups, you have to do it on a one-by-one basis. Make it easier for users to send feedback.

All of the key product changes that increased revenue or reduced churn happened when I initiated the conversation. It rarely ever happened when the customers complained or sent feedback automatically.

## 2. Money talks

How do you prioritize features? What should you build? Will it actually increase conversions or just waste time? This question comes up over and over in the head of any PM, and one mistake is treating all feedback equally. You shouldn't treat feature requests from free users or your boss the same way you treat requests from a paid user. The paid user comes first, always.

If a feature request requires a major shift in product direction or will eat up most of your dev's time, try to paywall it. If it comes from a potential paid user, ask them to convert first, or charge them a reasonable fee to build it out. Don't take their word for it, only listen once they pay.

The worst product mistakes I made, and saw my clients make, all came from a demanding user who promised to convert once we had X. In every case, after the feature got built, they refused to pay or just ghosted completely. A user who will actually buy for X feature, will be okay to pay a fee beforehand!

## 3. AI can't be trusted so have a backup plan

AI will let you down eventually, no matter how strong the model is. Some user, somewhere, will hit a case where it completely breaks. That's just the nature of probabilistic systems. The gap between internal eval performance and real world user performance is always real, and it never fully closes.

AI providers have been known to quietly degrade model quality over time. A good AI PM doesn't wait to find out if that's true. They plan as if it's guaranteed. That means building redundancy into every AI dependent feature: a fallback LLM, a retry mechanism, or a non-AI fallback path entirely. Ideally, every AI request has at least two backup options ready to kick in if one fails. Pair this with rigorous log monitoring and automated triggers that flag anomalies the moment something goes wrong.

The common mistake is assuming the fix is "switch models" or "improve the prompt." It isn't. Failures and unpredictable behavior are inherent to how these systems work, and they're not going away.

> Looking for someone with years of experience to help you build your AI SaaS? Contact me & my team here: <https://tally.so/r/3x9bgo>

Have a comprehensive alert system in place to diagnose issues quickly there is no perfect solution, but you can mitigate the situation a reasonable amount of time.

## 4. Add marketing enabling features ASAP

Distribution is king. If you don't have a big ad budget, the best path to growth is building a product that markets itself. Start with these fundamentals before anything fancier:

1. Launch an affiliate program. Give your happiest users a reason to refer friends.
2. Build free tools for your ICP. This is a proven SEO hack: think about what your ideal customer needs and give a piece of it away for free.
3. Set up email automation to nurture users with incentives, discounts, and feature updates.
4. Turn your changelog, support tickets, and feedback emails into a steady stream of blog content.
5. Add upsells inside your product, make sure your users are informed of every feature you have.

The goal is paid users, fast, and marketing is how you get there. PMs often get stuck heads down in technical features and skip these simple marketing automations that could be driving growth in the background. This should be a top priority from day one, not an afterthought.

## 5. Remove 1 thing for every 2 you add

Users would rather pay for two things that work perfectly than 2 perfect things and 1 half-baked. It sounds counterintuitive, but it is true. It's fine to ship something half-baked at first, but by the next release you need to either polish it or cut it.

An app's quality is judged by its weakest feature, not its best one. If something can't be improved, it's better to remove it than to leave it in just in case someone might use it someday.

A good rule of thumb, remove one feature for every two you add. It keeps the product simple and keeps the bar high.

## 6. Your UI is likely not as simple as you think

If you use your product every day, you will likely see using the app as simple, intuitive and obvious but trust me it likely is not.

How you perceive the product vs how your users perceive it are two very different things.

This is related to point 1 but add logs/APIs that enable you to see what your users are doing (if you can't be physically present when they use it). Create a complete user journey flow from time to time. It is great to write it down or use flowcharts, follow every button click, you will likely encounter major points of friction where the user is confused or agitated.

Thank you for reading. If you want more from FireBird on building and shipping AI products, see the related posts below.

## Related posts

<div class="post-embed"><a class="post-embed-link" href="/blog/building-ai-saas-for-3-years-what-worked-what-didnt"><div class="post-embed-image"><img alt="Building AI SaaS for 3 Years: What Worked, What Didn't" loading="lazy" src="https://substackcdn.com/image/fetch/$s_!Dd7j!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe42ddd4b-b831-4157-85c3-6f1064f94de2_1200x675.png"/></div><div class="post-embed-body"><p class="post-embed-meta">Arslan Shahid · March 2026</p><h4 class="post-embed-title">Building AI SaaS for 3 Years: What Worked, What Didn't</h4><p class="post-embed-description">Hard-earned insights from 3 years of building, launching, and scaling AI SaaS — the mistakes, what clients got wrong, and the approaches that actually worked.</p></div></a></div>

<div class="post-embed"><a class="post-embed-link" href="/blog/how-to-make-more-reliable-reports-using-ai"><div class="post-embed-image"><img alt="How to make more reliable reports using AI — A Technical Guide" loading="lazy" src="https://substackcdn.com/image/fetch/$s_!AyMm!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F44497415-2bd0-4968-a266-c03f2e2890b5_900x638.jpeg"/></div><div class="post-embed-body"><p class="post-embed-meta">Arslan Shahid · November 2024</p><h4 class="post-embed-title">How to make more reliable reports using AI — A Technical Guide</h4><p class="post-embed-description">Technical guide on making AI-generated reports more reliable and practical for stakeholders — from prompting techniques to evaluation pipelines.</p></div></a></div>

<div class="post-embed"><a class="post-embed-link" href="/blog/building-production-ready-ai-agents-llm-programs-with-dspy"><div class="post-embed-image"><img alt="Building Production-Ready AI Agents &amp; LLM programs with DSPy" loading="lazy" src="https://substackcdn.com/image/fetch/$s_!MKUu!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe73faadd-bb92-48be-a69a-6e4eb899739e_900x464.jpeg"/></div><div class="post-embed-body"><p class="post-embed-meta">Arslan Shahid · December 2024</p><h4 class="post-embed-title">Building Production-Ready AI Agents &amp; LLM programs with DSPy</h4><p class="post-embed-description">A practical guide to using DSPy in production for AI agents and LLM programs — tips, patterns, and code snippets from real projects.</p></div></a></div>

## Turn your posts into video

I built [Blog2Video](https://blog2video.app/) to turn written content like this into shareable video — useful if you're trying to repurpose blog posts for social or YouTube without starting from scratch.

<div class="cta-inline">
<a class="cta-button cta-primary" href="https://blog2video.app/" target="_blank" rel="noopener noreferrer">Try Blog2Video →</a>
</div>


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [Medium](https://medium.com/@arslan.scheema1997/managing-ai-products-3-years-of-lessons-the-hard-way-5d221ae836d2)._
