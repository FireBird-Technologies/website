---
title: "KPAI — A new way to look at business metrics"
excerpt: "KPI+AI, a demo for the future of business metrics"
date: 2024-08-28T13:16:00+05:00
updated: 2024-08-28T13:16:00+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!tUOY!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fabaaee05-ecc5-4be5-8267-b18893325eb9_788x443.png"
tags:
  - KPIs
  - Business
  - Analytics
  - Strategy
published: true
original_url: "https://firebirdtech.substack.com/p/kpai-a-new-way-to-look-at-business"
---

A few weeks ago, MIT researcher Michael Schrage approached me with an idea for a demo project for his executive education class at the MIT Sloan School of Business. He wanted me to build a system using autonomous AI agents to represent key performance indicators (KPIs). These agents would be able to answer executive questions, predict and simulate the future of their metrics, and even interact with each other to uncover deeper insights from the data.

I’m sharing this post to explain the core development of the demo. I’ll also provide guidance on how to scale this concept into a full-fledged enterprise solution for tracking KPIs.

![](https://substack-post-media.s3.amazonaws.com/public/images/0a9fc921-7eb3-4e6d-aa16-b046e4e41c24_788x462.png)

*Overview of the developed app.*

# Overview of client requirements

## Goal

The project aimed to create a system that could be presented to executives as an innovative blend of AI and business intelligence. Instead of just being another dashboard, it needed to demonstrate how, by adopting a similar solution, executives could gain new insights from the metrics they already monitor.

**Note**: This project focused on key performance indicators (KPIs) related to marketing. These KPIs include Customer Lifetime Value, Customer Acquisition Cost, Churn, Customer Experience, Net Promoter Score, and Customer Effort.

However, the idea isn’t just limited to marketing — it can be applied to other areas, like supply chain or finance (think cash flow, EBITDA, ROI, and so on). This approach can be used in almost any kind of metrics, for real estate you could look into average housing price per sqm, for HR you could look at hire per applications, average salaries, and retention.

## Constraints

The project needed to be completed in a short period, the client wanted a proof of concept. With more time and resources, a scalable solution can be developed but that would be beyond the scope.

Given the need for speed, I chose a technology stack optimized for quick iteration rather than one designed for production.

# Demo Implementation

This part is a walkthrough of how the demo was created.

## Technology stack

The following technologies were used to build the project

1. **DSPy** — This LLM orchestration framework was chosen because in my experience it is simplest to use, and also is built for prompt optimization.
2. **GraphRAG** — This [open-source graphRAG](https://github.com/microsoft/graphrag) solution from Microsoft. Used to build long-term memory
3. **Streamlit —** Used to build the demo frontend
4. **Plotly —** Used for visualizing KPI cards (dashboard)
5. **DuckDB —** Used for building a DB for login/logout. Storing responses from users
6. **mem0** —Used for short-term memory
7. **Pandas/Numpy** — standard packages for manipulating data in Python

## UI — Streamlit & Plotly

![](https://substack-post-media.s3.amazonaws.com/public/images/c8b22532-c217-4ffc-a5c5-b9b00a3fbc9b_788x421.png)

The UI primarily consists of Streamlit components, featuring a model selector in the sidebar, a chatbox in the center, and two containers displaying a dashboard and an editable table.

![](https://substack-post-media.s3.amazonaws.com/public/images/b1f4dfd3-398a-4d75-85de-36cde8d0fd38_787x975.png)

*KPI cards which show historical trends for each of the KPIs*

![](https://substack-post-media.s3.amazonaws.com/public/images/eee97eb2-3800-4578-bb7a-b604ca0b2717_788x204.png)

*Last two months of data is editable by using this component*

## Backend

The backend is built using DSPy. Each KPI is represented as an Agent. There are six KPAIs.

1. Customer Lifetime Value
2. Churn
3. Customer Acquisition Cost
4. Customer Experience
5. Net Promoter Score
6. Customer Effort Score

There is also a router agent which distributes user queries to the right agent(s)

**Example**

![](https://substack-post-media.s3.amazonaws.com/public/images/0a33529f-8aff-4864-8844-8ac61c01c652_788x765.png)

*Answer Generated for Query “What is the state of Churn and CLV, what do you foresee 6 months in the future?” pt-1*

![](https://substack-post-media.s3.amazonaws.com/public/images/b08e77db-116b-4cdf-8d7e-ab1ce1466317_788x849.png)

*Response to “What is the state of Churn and CLV, what do you foresee 6 months in the future?” pt.2*

The above images show the response to the query “What is the state of Churn and CLV, what do you foresee 6 months in the future?”

The query is routed to two agents Churn and CLV, each of whom gives their analysis/prediction about what would happen.

> *Looking for someone to develop AI into your app? Here is what Michael had to say about working with me:*
>
> <div class="cta-inline">
> <a class="cta-button cta-primary" href="https://tally.so/r/3x9bgo" target="_blank" rel="noopener noreferrer">Reach out for help →</a>
> </div>

**KPAI structure**

![](https://substack-post-media.s3.amazonaws.com/public/images/cbcaa76b-9c03-456b-8fe2-b9ff560bd238_788x408.png)

*Image by Author*

Each KPAI agent is a [DSPy signature](https://dspy-docs.vercel.app/docs/building-blocks/signatures) composed of Chain Of Thought reasoning. They are given system memory (long-term information about KPI trends), user query, current state, and short-term memory. They output an answer to the user’s query.

This structure was chosen so that each agent could do these things:

1. Answer questions about historic trends/relationships etc. Also, use this information to give a prediction or simulate different outcomes.
2. Can respond to a changing environment (using the current state)
3. Can interact with other agents (using short-term memory + historical context)

**Agent System Overview**

![](https://substack-post-media.s3.amazonaws.com/public/images/3e9f8157-83dc-489a-8ee6-f3b05f2c704c_788x525.png)

*Image by the Author*

Think of the system as a smart distributor for your input. If you tell it which KPAI agent you want to talk to, it sends your query directly to that agent. If you don’t specify, the system hands your query over to a “router,” which figures out the best agent for the job.

This setup allows two ways to get an answer to a query:

1. **User-lead** — where the user knows what they want or what business metric they would like a deeper view on
2. **System-led —** Where the query the user asks is open-ended. Queries like “Do you foresee any problems 3 months down the road?”

Most of the time, the best analysis comes from a blend of both approaches. You might start with your own preferred method, then later on, let the system offer insights to dig deeper and uncover more complex details. This way, you get a richer, more comprehensive understanding.

# Making a scaleable enterprise solution

In this portion, I will share how to build the enterprise version of KPAIs. This is mostly hypothetical and based on my opinion what would work well to make it ready for production-level use cases.

## Frontend

Streamlit, which was chosen for the demo, isn’t the best option for building large, enterprise-level applications. Something like React would be a much better fit. There are other frameworks out there too, but the main thing we need is something faster and more flexible for designing the user experience (UX).

Streamlit is great for quickly testing ideas because it’s a low-code tool, meaning you can create apps without writing a lot of code. However, that ease of use comes with limitations. It’s harder to customize how your app looks and works, you have less control over the app’s flow, and it’s tricky to move elements around within the app.

For the dashboard built with Plotly, you can design the entire plot using React instead. This would give you more flexibility in how users interact with the charts. You can also create custom designs for these charts, which might look better than the default Plotly styles and will load faster.

## Backend

**Agentic System**

DSPy can be used for production use cases, they have listed some [large-scale tech companies using the framework in production](https://github.com/stanfordnlp/dspy/blob/main/docs/docs/dspy-usecases.md).

The only change I would make to the agentic part of the backend is to add concurrency or asynchronous functionality.

Concurrency allows multiple tasks to run in overlapping time periods, improving efficiency, especially for I/O-bound or long-running operations. Asynchronous programming (async) enables tasks to run without waiting for others to complete, allowing the program to handle multiple operations simultaneously.

**Memory/Retrievers**

The system uses two retrievers: one for GraphRAG and another for short-term memory. If your data changes frequently, you might need to replace GraphRAG with something else, since it can be expensive to run. However, once it’s set up, you can reuse it multiple times.

For short-term memory, I’d suggest using a vector store that’s reliable for production, like Qdrant or Pinecone. There are plenty of options out there, so you’ll want to figure out how many users you expect and how much storage per user you can manage before deciding.

Short-term memory for the demo is small and is suited for less than 1000 users. You can experiment with how much you need to retain for there to be no meaningful impact on UX.

**Database**

The demo uses DuckDB, a simple SQL database, to manage logins and user response records. DuckDB can handle thousands of users. If you need advanced security features, Postgres is the top choice in the industry. However, setting up and managing Postgres can be more expensive, whereas DuckDB is a simpler and more cost-effective option for most small SaaS applications.

# Suggestions and Comments

This portion is about suggesting improvement plus also adding my own comments as an experienced data professional on the project

**RAGifying Agents with internal knowledge**:  
The agents use the built-in knowledge of the LLMs to talk about KPIs. However, many organizations have their own specific ways of defining and measuring some KPIs. By giving each agent access to this internal knowledge (using RAG), they could become more effective in helping with internal diagnostics.

There are some downsides to consider. Technically, it would use up more tokens and add the cost of maintaining a knowledge base, making the system more complex and expensive. From a business perspective, the agents might end up just repeating what the company already knows, which goes against the goal of KPAIs to provide fresh insights that executives aren’t already aware of.

It might be worth adding an option to switch between using internal context and relying solely on the LLM’s knowledge.

**Access to external knowledge:** Technically, this is still an RAG, but I wanted to highlight this separately. If the agents could search Google or tap into an external consultant’s knowledge base, they could generate unique insights that aren’t generic like LLM training data, or repetitive like internal knowledge.

Search engine APIs are available to integrate and I suppose many consulting firms would give clients access to their knowledge on request.

**The usefulness of KPAIs:** After graduating in 2020, I’ve been working in data within marketing departments. I want to share how I think KPAIs could be really valuable in a business setting.

When I’m writing, I often use AI to help me find better ways to phrase my ideas. I think KPAIs could serve a similar purpose — they can tap into the vast data they’re trained on and offer suggestions or improvements that a person might not think of. In my data work, I sometimes get stuck on what to do next. KPAIs could act as an idea generator, helping me expand my list of hypotheses or actions. They could significantly cut down on the time spent researching and brainstorming by doing the heavy lifting of gathering all known knowledge.

However, just like when I’m writing, I’m the one who shapes the final result. Even though AI suggests wording, I decide what makes the most sense because AI suggestions can sometimes change the meaning of what I want to say. Similarly, KPAIs won’t have the same experience I do, so some of their suggestions might be irrelevant or off the mark.

Even though I might not always follow AI’s suggestions, I still use it every day. I think KPAIs might not be perfect, but it would still be very usable. Sticking with the writing analogy, I have to say that after using AI, my readership metrics improved. There are fewer typos, and my writing is clearer and more concise. I think KPAIs would do the same for business.

# Conclusion

The project was a great learning experience and highlights how blending traditional Business Intelligence with modern Artificial Intelligence and Large Language Models can open up exciting new possibilities.

The demo runs smoothly and is useful for stakeholders who want to use intelligent KPIs to gain deeper insights into their business. As mentioned earlier the concept can be extended to multiple other fields. If you’re interested in applying a similar concept in your industry please do reach out.

> *If you’re looking for experienced and vetted developers (like me), you can reach out using this button:*
>
> <div class="cta-inline">
> <a class="cta-button cta-primary" href="https://tally.so/r/3x9bgo" target="_blank" rel="noopener noreferrer">Reach out for help →</a>
> </div>

Thank you for reading, if you like to learn more about our (FireBird Technologies) projects, please follow us on substack and [Linkedin](https://www.linkedin.com/company/firebird-technologies-singapore/?viewAsMember=true).


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/kpai-a-new-way-to-look-at-business)._

