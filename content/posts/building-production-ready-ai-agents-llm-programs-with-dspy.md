---
title: "Building Production-Ready AI Agents & LLM programs with DSPy: Tips and Code Snippets"
excerpt: "A technical guide on how you can use DSPy in production for AI agents & large language model programs"
date: 2024-12-29T20:30:20+05:00
updated: 2024-12-29T20:30:20+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!MKUu!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe73faadd-bb92-48be-a69a-6e4eb899739e_900x464.jpeg"
tags:
  - AI
  - DSPy
  - AI Agents
  - LLM
  - Tutorial
published: true
original_url: "https://firebirdtech.substack.com/p/building-production-ready-ai-agents"
---

DSPy is my go-to framework for its simplicity and thoughtful design. I’ve used it for everything from building MVPs to scaling systems to handle millions of requests. While DSPy and AI programming are still evolving, finding clear, production-ready guidance can be tough.

In this blog, I share what I’ve learned — from hands-on experience to insights from documentation and GitHub discussions. It’s a practical guide filled with actionable tips for working with DSPy.  
  
If you find this helpful, follow me and Firebird Technologies for more content like this!

### Reliable Output

The biggest challenge for developers using LLMs is achieving structured and consistent outputs. Getting your agent to work is one thing, but ensuring 95%+ reliability is another. End users expect good results every time — they don’t care if LLMs are prone to hallucinations, inconsistencies, or occasional erratic behavior.

While some issues, like API provider outages, are beyond your control, you can address many on your end. With DSPy, you can use assertions and suggestions to guide your program toward better outputs and improve reliability. These tools also help catch bad results and implement automatic retry mechanisms to ensure high-quality responses.

**How to use** `dspy.Assert` **and** `dspy.Suggest` **?**

To use `dspy.Assert` and `dspy.Suggest` in DSPy, you define constraints in your program using boolean validation checks for the desired outcomes. These constraints are implemented as simple Python functions that validate model outputs.

The main difference lies in their strictness:

- `Assert` enforces strict conditions that the program must meet; otherwise, it will fail.
- `Suggest` provides non-mandatory recommendations to improve performance or output quality.

Here’s an example of how to validate a simple DSPy module:

```python
from dspy.primitives.assertions import assert_transform_module, backtrack_handler
# Define a validation function
# You can define you our validation function that is specific to your program

# Overly simplistic validation function
def your_validation_fn(model_outputs):
    return model_outputs.one_word_answer == "Islamabad"

# A simple DSPy program that gives a one-word answer to question
your_module = dspy.ChainOfThought("question->one_word_answer")

model_outputs = my_module(question="What is the capital of Pakistan?")

# Add assertions to your program

dspy.Assert(your_validation_fn(model_outputs), "Validation failed", target_module=your_module)
dspy.Suggest(your_validation_fn(model_outputs), "Consider revising output", target_module=your_module)

```

You can even add assertions into the forward function of your custom program. After defining these constraints, you integrate them into your program by wrapping your DSPy module with assertions using the `assert_transform_module` function, along with a `backtrack_handler`. This function transforms your program to include internal assertions backtracking and retry logic.

```python
class one_word_answer(dspy.Module):
    def __init__(self):
        self.one_word_program = dspy.ChainOfThought("question->one_word_answer")

    def forward(self, question):
        # send the question to the one_word_program
        response = self.one_word_program(question=question)
        # Assertion checks if the output is a single word
        dspy.Assert(response.one_word_answer.count(" ") == 0, "Validation failed, not one word", target_module=self.one_word_program)
        return response

my_module = one_word_answer()

# 1. way to activate assertions in the module, so whenever assertion fails, it will throw error
program_with_assertions = assert_transform_module(my_module(), backtrack_handler)

# 2. way to activate assertions

program_with_assertions = my_module().activate_assertions()

# Whenever the output is not a one word, or has space, then program will throw
# an error.
```

![](https://substack-post-media.s3.amazonaws.com/public/images/b0642c79-6e6c-4b3b-b33b-c45584c7c014_859x61.png)

*Image by Author — Error you would get if the output validation fails, you can catch this error and implement your solution*

> Struggling with LLM outputs? Or want experienced developers to help you develop AI solutions? You can contact me & my team here:
>
> <div class="cta-inline">
> <a class="cta-button cta-primary" href="https://tally.so/r/3x9bgo" target="_blank" rel="noopener noreferrer">Reach out for help →</a>
> </div>

### Using Multiple Large Language Models

Large programs often need multiple LLMs. Here are three reasons why:

1. **Cost**: When you are serving 1000s of requests using the top-model would result in heavy cost, as many of those requests could be served with lower end models.
2. **Speed**: All LLM API providers have request limits based on tiers, but your user requests need to be served in time. You can send the request to different APIs or models.
3. **Output Quality:** You can look at LLM benchmarks to see which model does a better job at serving a certain requests. Some models are better at code generation (especially when adjusted for costs).
4. **System Overload:** Many enterprise use-cases prefer locally hosted LLMs, you can overload your system by serving all requests to one LLM.

In DSPy you define a global LLM which is the default the system would use whenever you make a request. You define it like this:

```python
lm = dspy.LM('openai/gpt-4o', model_type='chat', max_tokens =1000, api_key = '<>')
dspy.configure(lm=lm)
```

You can switch LMs like this but changing global settings every time can cause problems especially when you are making concurrent requests (common for large systems).

Fortunately, you can use context managers to switch LLMs like this. It is also thread safe and can work asynchronously.

```python
# Define LLMs 
lm1 = dspy.LM()
lm2 - dspy.LM()
lm3 = dspy.LM()

# you can define these conditions inside your DSPy Module
# The system switches based on any defined condition
if condition1:
  with dspy.settings.context(lm=lm1):
    response = dspy.Predict(..) 
if condition2:
  with dspy.settings.context(lm=lm2):
    response = dspy.Predict(..)
if condition3:
  with dspy.settings.context(lm=lm3):
    response = dspy.Predict(..)

```

Multiple LLMs are nice, what if you have multiple requests to serve to your users? The next chapter will teach how you can make asynchronous or parallel request using DSPy.

**[Building "Auto-Analyst" - A data analytics AI agentic system](https://www.firebird-technologies.com/p/building-auto-analyst-a-data-analytics)***[A technical guide on making a AI 'Auto-Analyst'](https://www.firebird-technologies.com/p/building-auto-analyst-a-data-analytics)*[www.firebird-technologies.com](https://www.firebird-technologies.com/p/building-auto-analyst-a-data-analytics)

### Concurrent or Asynchronous Requests

Building minimum viable prototypes is straightforward since they usually serve just one user at a time. But what happens when you need to scale to handle tens of thousands or even millions of requests? In such cases, you can leverage threading or asynchronous requests to efficiently manage the load. Here’s how:

#### “Asyncify” using DSPy

This code snippet will help you make async requests within your program

```python
import asyncio

# set the maximum number of async workers
dspy.settings.configure(async_max_workers=4) # default is 8

# define async version of your module
# The system was defined previously but can be any dspy.Module
async_system = dspy.asyncify(one_word_answer())

# a simple async program
async def get_all_responses(questions):
# Creates couroutines to be awaited later
  tasks = [async_system(question=q) for q in questions]
# You can also asyncio.wait, as_completed, wait for etc
  responses = await asyncio.gather(*tasks)
  return responses

questions = [
    "What is your name?",
    "How old are you?",
    "Where are you from?",
    "What is your favorite hobby?",
    "What do you do for a living?",
    "What is your favorite programming language?",
    "What are your goals for the next year?",
    "What is your favorite book or movie?",
    "Have you ever traveled abroad?",
    "What motivates you to learn new skills?"
]

# run the async program
all_responses = asyncio.run(get_all_responses(questions))

```

The above snippet allows you to asynchronously await responses. You can change the async\_max\_worker parameter to scale to 1000 of workers at once.

#### Threading using DSPy

In the latest version of dspy, every module has a built-in method `batch` which allows you to parallelize your requests.

Here is the inputs of that method

![](https://substack-post-media.s3.amazonaws.com/public/images/32852e37-8d26-4583-a30d-2b4aa579985d_900x147.png)

*Image by Author — Shows documentation of batch method*

**Code Snippet:**

```python
import dspy

# Create questions for analysis
questions = [
    "What is the relationship between customer lifetime value and transaction frequency?",
    "How does the average transaction value impact customer retention?",
    "Which customer segments show the highest predicted CLV and why?",
    "What are the key factors influencing the accuracy of our CLV predictions?",
    "How can we improve our CLV prediction model based on the current results?"
]

# Create a small DSPy Module, which gives one word answers
system = dspy.ChainOfThought("question->one_word_answer")

# Creating examples, which can be sent to module.batch
questions = [dspy.Example(question=q).with_inputs('question') for q in questions]

# Sends all the 5 questions in parallel, with certain settings
responses = system.batch(questions, num_threads = 3,return_failed_examples=True,max_errors=3)
```

![](https://substack-post-media.s3.amazonaws.com/public/images/94d998e0-2011-433e-bcf3-e6cad802a397_900x290.png)

*Image by Author — Responses from the batch*

Using threading or async you can serve millions of users concurrently.

Thank you for reading, I will be sharing more insights as I learn them. Please follow me and FireBird Technologies.

> Want to take advantage of my experience? You can reach out for help using this link:
>
> <div class="cta-inline">
> <a class="cta-button cta-primary" href="https://tally.so/r/3x9bgo" target="_blank" rel="noopener noreferrer">Reach out for help →</a>
> </div>


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/building-production-ready-ai-agents)._

