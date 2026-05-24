---
title: "Honest review of Lovable from an AI engineer"
excerpt: "I tried lovable to build projects, and here is an honest review"
date: 2025-08-03T11:06:22+05:00
updated: 2025-08-03T11:06:22+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!bgjP!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F54979600-698a-44d6-afdd-b3fa9f33060e_1350x759.png"
tags:
  - Review
  - AI Coding
  - Lovable
  - Tools
published: true
original_url: "https://firebirdtech.substack.com/p/honest-review-of-lovable-from-an"
---

Lovable is an online AI-based website creator that allows you to build websites from scratch using just prompts and no code. For this review, I will try to recreate my projects using [lovable.dev](https://lovable.dev/?via=arslan) and see how far I can take them without coding myself.

*Here is my affiliate link to sign-up to lovable (it won’t cost you extra, but I would get rewards if you sign-up using this link):*

<div class="cta-inline">
<a class="cta-button cta-primary" href="https://lovable.dev/?via=arslan" target="_blank" rel="noopener noreferrer">Try Lovable →</a>
</div>

The project I would try to replicate here is the [autoanalyst](https://www.firebird-technologies.com/p/auto-analyst-30-ai-data-scientist)!  
  
Watch the video version of this post, made using [https://blog2video.app](https://blog2video.app/)

<div class="video-embed">
<iframe src="https://www.youtube-nocookie.com/embed/64UTm77OZqU" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>
</div>

# Replicating the Auto-analyst

![](https://substack-post-media.s3.amazonaws.com/public/images/a3771f6d-48bc-4760-89f2-232bba33e48a_945x500.png)

*my initial prompt for this*

Here is how lovable began building an autoanalyst clone.

![](https://substack-post-media.s3.amazonaws.com/public/images/0149619a-4786-4479-9f71-27a76ebf502e_901x1306.png)

It began by building the ‘planner’ and then adding other components. Finally, it creates a full one-page app with these features:

![](https://substack-post-media.s3.amazonaws.com/public/images/11749587-a121-4803-9da5-f901eabb8694_871x1030.png)

Now let’s see how it looks like:

![](https://substack-post-media.s3.amazonaws.com/public/images/fd94f353-d8a2-4890-af1f-1f289cd5139c_945x486.png)

I selected one of the sample datasets, and asked it to visualize:

![](https://substack-post-media.s3.amazonaws.com/public/images/dd66e703-8fd0-4f4b-be01-b3e0964a531b_945x472.png)

*Here is the visualization it created*

It looked impressive, wow. But as I play further I realized that it always responds with the same chart! So, it has just saved that graph and launched it.

![](https://substack-post-media.s3.amazonaws.com/public/images/73cfd53a-68e1-4d09-9d34-c806f5fafbdb_945x513.png)

The auto-analyst is a white interface, so I asked it to change it.

I also asked to integrate OpenAI API, and also attach a database using Supabase. After adding in all the details, i.e. making the tables & adding my own OpenAI API key.

![](https://substack-post-media.s3.amazonaws.com/public/images/63daaf94-a174-4a86-8520-d3dc335f016f_945x517.png)

*The final image of the UI*

Instead of fixing the work app to look more like a chat interface, it made it into a blocklike structure with a chat input.

![](https://substack-post-media.s3.amazonaws.com/public/images/19fd2474-af05-48f6-bcc9-c7dbe1f7015d_945x609.png)

*That doesn’t look good*

I tried to ask it to make the agents functional, but it simply was not able to do so, It also moved the chart output space underneath, which I never requested.

It became more and more obvious that my end goal of replicating the AI data scientist is not possible with lovable without me manually intervening to code where it left off.

> *You definitely need an AI engineer/software engineer.*
>
> *Reach out here: <https://tally.so/r/3x9bgo>*

# Review

I was disappointed that just using the chat prompt, it didn’t even come close to solving my problem, which obviously requires an actual engineer like me.

However, all hope is not lost. It can’t replicate full-fledged apps, but it can definitely do somethings (I will be using it for):

1. **Visualization Apps**: As a data science consultant I have used streamlit and other low-code tools to build quick dashboard for my clients to play around with. This is definitely a step ahead of those, as a typescript frontend is more visually appealing.
2. **UI components**: I like the overall aesthetic design of some UI components, lovable can easily give me those to add to my existing projects.
3. **Miscellaneous Tools**: I often need to make small tools to make myself more productive, like a social media poster, contact list etc. It was easy to attach a database using supabase, which is a feature I really like.

## What I want in a tool like lovable

As an AI engineer, I am probably not the target user for Lovable. It is mostly aimed at non-technical people, but I do think it needs a few features that would make it more “lovable”:

1. **UI drag & drop interface:** It placed the output box at the bottom where it shouldn’t be. Asking it to change it via prompt consumes credits. I liked the components, would just want to re-arrange them.
2. **Automatic DB schema:** Instead of manually adding tables into supabase, I would love that it if it could generate a “reasonable” schema for the project. Funnily enough, I made something that does so in our [SQL Trainer backend walkthrough](/blog/building-sql-trainer-ais-backend-full-walkthrough).
3. **Initial Options**: I would love it if they added a few options at the start — whether I want authentication in my app, want a landing page, and so on. I understand predicting what kind of app a user wants to build is impossible, but just a few checklists could help!

Check out my projects:

<div class="post-embed"><a class="post-embed-link" href="/blog/building-sql-trainer-ais-backend-full-walkthrough"><div class="post-embed-image"><img alt="Building SQL trainer AI’s backend — A full walkthrough" loading="lazy" src="https://substack-post-media.s3.amazonaws.com/public/images/ef1458cc-fd72-4f61-8c86-077e78363f03_1350x759.png"/></div><div class="post-embed-body"><p class="post-embed-meta">Arslan Shahid · 27 July 2025</p><h4 class="post-embed-title">Building SQL trainer AI’s backend — A full walkthrough</h4><p class="post-embed-description">At FirebirdTech, We believe in transparency and openness; we love to show how we build our projects. Carrying on with that spirit, we have recently launched the AI SQL Trainer in beta. This blog post shows how the backend of the application works.</p></div></a></div>

## Recommendation

Many people are looking for recommendations on what AI apps they should have. There are many AI assisted app builders, I would 100% recommend you have [lovable](https://lovable.dev/?via=arslan) if:

1. **You are non-technical and don’t need a sophisticated app!**
2. **You are technical and need utility apps or UI components.**

As a non-technical person who needs a sophisticated app (but can’t hire an engineer) you should consider cursor or claude code. Simply, because I feel they are more engineering tools, while lovable is a no-code utility app builder.

Thank you for reading!

<div class="cta-inline">
<a class="cta-button cta-primary" href="https://lovable.dev/?via=arslan" target="_blank" rel="noopener noreferrer">Try Lovable →</a>
</div>


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/honest-review-of-lovable-from-an)._

