---
title: "Building “Auto-Analyst” — A data analytics AI agentic system"
excerpt: "A technical guide on making a AI ‘Auto-Analyst’"
date: 2024-09-01T12:16:25+05:00
updated: 2024-09-01T12:16:25+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!v-CY!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe8054a04-3791-44c7-adcf-a70d8a3a1322_788x445.jpeg"
tags:
  - AI Agents
  - Data Analytics
  - Open Source
  - LLM
published: true
original_url: "https://firebirdtech.substack.com/p/building-auto-analyst-a-data-analytics"
---

I’ve been developing AI-powered agents to reduce my workload as a data scientist/analyst. While pop culture often shows AI taking over human jobs, in reality, most AI agents aren’t replacements for humans. Instead, they help us work more efficiently. This agent is designed to do just that. Previously, I had designed a data visualization agent which helped me make visualizations faster, using only natural language inputs.

Watch the video version of this post here, made using [https://blog2video.app](https://blog2video.app/)

<div class="video-embed">
<iframe src="https://www.youtube-nocookie.com/embed/R8g_GVmzR7s" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>
</div>

## Design

![](https://substack-post-media.s3.amazonaws.com/public/images/0cf53b06-70e6-44b9-99c3-6e3d6695a1a7_536x1009.png)

*Image by Author*

The flow diagram illustrates a system that begins with a user-defined goal. The planner agent then delegates tasks to a group of worker agents, each responsible for generating code to address a specific part of the problem. Finally, all the individual pieces of code are gathered and integrated by a code combiner agent, resulting in a single, cohesive script that accomplishes the entire goal.

***Note: The planner agent could delegate to some of the agents, not necessarily to all. Also, each agent would have its own set of inputs not shown in the diagram.***

> Want someone to design and build AI agents for you? Or having trouble with agents/RAG application you’re building.   
> [Feel free to reach out:](https://tally.so/r/3x9bgo)

# Individual components

This blog post will guide you step-by-step through building the agent, presenting code blocks for each individual component. In the following section, we’ll demonstrate how these parts seamlessly integrate.

## Planner Agent

The planner agent takes three inputs, user-defined goal, the datasets available, and agents' descriptions. It outputs a plan in this format:

Agent1-> Agent2-> Agent3….

```python
# You can use other orchestration libraries but I found DSPy
# good for building fast, simpler and evaluation (making the application more relibale)
import dspy

# This object inherits from the dspy.Signature class
# The text inside """ is the prompt
class analytical_planner(dspy.Signature):
    """ You are data analytics planner agent. You have access to three inputs
    1. Datasets
    2. Data Agent descriptions
    3. User-defined Goal
    You take these three inputs to develop a comprehensive plan to achieve the user-defined goal from the data & Agents available.
    In case you think the user-defined goal is infeasible you can ask the user to redefine or add more description to the goal.

    Give your output in this format:
    plan: Agent1->Agent2->Agent3
    plan_desc = Use Agent 1 for this reason, then agent2 for this reason and lastly agent3 for this reason.

    You don't have to use all the agents in response of the query
    
    """
# Input fields and their descriptions
    dataset = dspy.InputField(desc="Available datasets loaded in the system, use this df_name,columns  set df as copy of df_name")
    Agent_desc = dspy.InputField(desc= "The agents available in the system")
    goal = dspy.InputField(desc="The user defined goal ")
# Output fields and their description
    plan = dspy.OutputField(desc="The plan that would achieve the user defined goal")
    plan_desc= dspy.OutputField(desc="The reasoning behind the chosen plan")
```

![](https://substack-post-media.s3.amazonaws.com/public/images/fba2145c-efd5-4597-a817-912b125a1395_788x153.png)

*Sample output from the planner agent*

## Analysis Agents

Most analysis agents share a common structure with slight variations in their prompts. They accept two inputs: the user-defined goal and the dataset index. They produce two outputs: the code for the analysis and commentary, which can be useful for debugging or redirecting the agent.

```python
# I define analysis agents as those agents that are in the middle-layer
# they produce code for a specialised data analysis task
class preprocessing_agent(dspy.Signature):
    """ You are a data pre-processing agent, your job is to take a user-defined goal and available dataset,
    to build an exploratory analytics pipeline. You do this by outputing the required Python code. 
    You will only use numpy and pandas, to perform pre-processing and introductory analysis

    """
    dataset = dspy.InputField(desc="Available datasets loaded in the system, use this df_name,columns  set df as copy of df_name")
    goal = dspy.InputField(desc="The user defined goal ")
    commentary = dspy.OutputField(desc="The comments about what analysis is being performed")
    code = dspy.OutputField(desc ="The code that does the data preprocessing and introductory analysis")

class statistical_analytics_agent(dspy.Signature):
    """ You are a statistical analytics agent. 
    Your task is to take a dataset and a user-defined goal, and output 
    Python code that performs the appropriate statistical analysis to achieve that goal.
    You should use the Python statsmodel library"""
    dataset = dspy.InputField(desc="Available datasets loaded in the system, use this df_name,columns  set df as copy of df_name")
    goal = dspy.InputField(desc="The user defined goal for the analysis to be performed")
    commentary = dspy.OutputField(desc="The comments about what analysis is being performed")
    code = dspy.OutputField(desc ="The code that does the statistical analysis using statsmodel")

class sk_learn_agent(dspy.Signature):
# Prompt
    """You are a machine learning agent. 
    Your task is to take a dataset and a user-defined goal, and output Python code that performs the appropriate machine learning analysis to achieve that goal. 
    You should use the scikit-learn library."""
# Input Fields
    dataset = dspy.InputField(desc="Available datasets loaded in the system, use this df_name,columns. set df as copy of df_name")
    goal = dspy.InputField(desc="The user defined goal ")
# Output Fields
    commentary = dspy.OutputField(desc="The comments about what analysis is being performed")
    code = dspy.OutputField(desc ="The code that does the Exploratory data analysis")

## I worked on the data-viz agent and already optimized using DSPy.
## The only big difference is that this agents takes another input of styling index

```

![](https://substack-post-media.s3.amazonaws.com/public/images/39ba51c2-1a5c-49b3-8d0d-5e6f04f2a640_788x620.png)

*Sample output from one of the agents*

## Code Combiner Agent

The purpose of this agent is to clean the output from all the agents into one coherent script. It takes a long str of a list of code, and outputs code.

```python
class code_combiner_agent(dspy.Signature):
    """ You are a code combine agent, taking Python code output from many agents and combining the operations into 1 output
    You also fix any errors in the code"""
    agent_code_list =dspy.InputField(desc="A list of code given by each agent")
    refined_complete_code = dspy.OutputField(desc="Refined complete code base")
```

## Optional Agents/Indexes

For the agent to work more smoothly and to catch some errors, I also built these additional agents or indexes.

```python
# The same signature used in Data Viz agent post
class Data_Viz(dspy.Signature):
    """
    You are AI agent who uses the goal to generate data visualizations in Plotly.
    You have to use the tools available to your disposal
    {dataframe_index}
    {styling_index}

    You must give an output as code, in case there is no relevant columns, just state that you don't have the relevant information
    """
    goal = dspy.InputField(desc="user defined goal which includes information about data and chart they want to plot")
    dataframe_context = dspy.InputField(desc=" Provides information about the data in the data frame. Only use column names and dataframe_name as in this context")
    styling_context = dspy.InputField(desc='Provides instructions on how to style your Plotly plots')
    code= dspy.OutputField(desc="Plotly code that visualizes what the user needs according to the query & dataframe_index & styling_context")

# An optional agent that checks if the user-defined goal works well
class goal_refiner_agent(dspy.Signature):
    """You take a user-defined goal given to a AI data analyst planner agent, 
    you make the goal more elaborate using the datasets available and agent_desc"""
    dataset = dspy.InputField(desc="Available datasets loaded in the system, use this df_name,columns  set df as copy of df_name")
    Agent_desc = dspy.InputField(desc= "The agents available in the system")
    goal = dspy.InputField(desc="The user defined goal ")
    refined_goal = dspy.OutputField(desc='Refined goal that helps the planner agent plan better')
```

Instead of feeding information about the whole dataset I also built a retriever that takes in information about the data available.

```python
# I choose a LLama-Index based retriever as it was more convenient.
# Basically you can feed your data in a multiple ways.
# Providing description about column names, dataframe reference
# And also what purpose the data was collected etc.
dataframe_index =  VectorStoreIndex.from_documents(docs)

# I also defined a styling index for the data visualization agent.
# Which has natural language instructions on how to style different visualizations
style_index =  VectorStoreIndex.from_documents(styling_instructions)
```

# Putting everything together as one system

In DSPy, to compile a complex LLM application, you need to define a module with two essential methods: `__init__` and `forward`.

The `__init__` method initializes the module by defining all the variables that will be used throughout. The `forward` method, however, is where the core functionality is implemented. This method outlines how the outputs from one component interact with other components, effectively driving the application's logic.

```python
# This module takes only one input on initiation
class auto_analyst(dspy.Module):
    def __init__(self,agents):
# Defines the available agents, their inputs, and description
        self.agents = {}
        self.agent_inputs ={}
        self.agent_desc =[]
        i =0
        for a in agents:
            name = a.__pydantic_core_schema__['schema']['model_name']
# Using CoT prompting as from experience it helps generate better responses
            self.agents[name] = dspy.ChainOfThought(a)
            agent_inputs[name] ={x.strip() for x in str(agents[i].__pydantic_core_schema__['cls']).split('->')[0].split('(')[1].split(',')}
            self.agent_desc.append(str(a.__pydantic_core_schema__['cls']))
            i+=1
# Defining the planner, refine_goal & code combiner agents seperately
# as they don't generate the code & analysis they help in planning, 
# getting better goals & combine the code
        self.planner = dspy.ChainOfThought(analytical_planner)
        self.refine_goal = dspy.ChainOfThought(goal_refiner_agent)
        self.code_combiner_agent = dspy.ChainOfThought(code_combiner_agent)
# these two retrievers are defined using llama-index retrievers
# you can customize this depending on how you want your agents
        self.dataset =dataframe_index.as_retriever(k=1)
        self.styling_index = style_index.as_retriever(similarity_top_k=1)
        
    def forward(self, query):
# This dict is used to quickly pass arguments for agent inputs
        dict_ ={}
# retrieves the relevant context to the query
        dict_['dataset'] = self.dataset.retrieve(query)[0].text
        dict_['styling_index'] = self.styling_index.retrieve(query)[0].text
        dict_['goal']=query
        dict_['Agent_desc'] = str(self.agent_desc)
# output_dictionary that stores all agent outputs
        output_dict ={}
# this comes up with the plan
        plan = self.planner(goal =dict_['goal'], dataset=dict_['dataset'], Agent_desc=dict_['Agent_desc'] )
        output_dict['analytical_planner'] = plan
        plan_list =[]
        code_list =[]
# if the planner worked as intended it should give agents seperated by ->
        if plan.plan.split('->'):
            plan_list = plan.plan.split('->')
# in case the goal is unclear, it sends it to refined goal agent
        else:
            refined_goal = self.refine_goal(dataset=data, goal=goal, Agent_desc= self.agent_desc)
            forward(query=refined_goal)
# passes the goal and other inputs to all respective agents in the plan
        for p in plan_list:
            inputs = {x:dict_[x] for x in agent_inputs[p.strip()]}
            output_dict[p.strip()]=self.agents[p.strip()](**inputs)
# creates a list of all the generated code, to be combined as 1 script
            code_list.append(output_dict[p.strip()].code)
# Stores the last output
        output_dict['code_combiner_agent'] = self.code_combiner_agent(agent_code_list = str(code_list))
        
        return output_dict
# you can store all available agent signatures as a list
agents =[preprocessing_agent, statistical_analytics_agent, sk_learn_agent,data_viz_agent]

# Define the agentic system
auto_analyst_system = auto_analyst(agents)

# the system is preloaded with Chicago crime data
goal = "What is the cause of crime in Chicago?"

# Asking the agentic system to perform analysis for this query
output = auto_analyst_system(query = goal)
```

Now looking at result of the query step by step.

*For this query = ’What is the cause of crime in Chicago?’*

![](https://substack-post-media.s3.amazonaws.com/public/images/a4c23219-188a-435c-bbdf-77173f286a24_788x127.png)

*Planner-Agent output, recommending preprocessing_agent->stat_agent->data_viz_agent*

Executing the plan, first preprocessing agent

![](https://substack-post-media.s3.amazonaws.com/public/images/9f337673-cee9-46f9-a020-ea264618e54f_788x527.png)

*As can be seen from the commentary & reasoning, it cleans the data and does some basic count based analysis.*

Next statistical analysis agent

![](https://substack-post-media.s3.amazonaws.com/public/images/84ecdd49-8d48-4785-9b9d-a8e3954e390c_788x486.png)

*The agents builds a ARIMA model the change in crime counts over time.*

Next the Plotly data visualization agent

![](https://substack-post-media.s3.amazonaws.com/public/images/b82bd74c-dcd2-432e-a842-89b86f93cbd7_788x380.png)

*Constructs a heatmap like visualization.*

Finally, the code combiner agent, to put it all together

![](https://substack-post-media.s3.amazonaws.com/public/images/679797e2-f40e-4373-9891-ed30e4e286a2_788x707.png)

*Combines the pre-processing, ARIMA model and plotly visualization*

This is the output after executing the code from the last agent.

![](https://substack-post-media.s3.amazonaws.com/public/images/2f2912d4-5c67-4c34-acc3-93033dd68d0b_788x901.png)

*First half of the output*

![](https://substack-post-media.s3.amazonaws.com/public/images/7157640f-1ab7-401a-9bdb-005876cbf881_788x1115.png)

*The output all generated by the agent*

> Seems cool, right? Want me to help you to design, implement and evaluate AI agents? Click here:
>
> <div class="cta-inline">
> <a class="cta-button cta-primary" href="https://tally.so/r/3x9bgo" target="_blank" rel="noopener noreferrer">Reach out for help →</a>
> </div>

# Limitations

Like many agents, it performs excellently when it works as intended. This is just the first iteration of a project I aim to improve over time. Please follow me and FireBird Technologies to stay updated. Here are the current limitations:

1. **Hallucination**: The agent sometimes produces inexecutable code due to hallucinations.
2. **Unreliable/Inconsistent**: The agent’s outputs are inconsistent, with different variations of the same query resulting in significantly different code.
3. **Mixed Output**: Many agents do not exclusively address separate aspects of the problem. For example, the data-preprocessing agent generates its own visualizations, while the data-visualization agent also creates its own.

# Next Steps

This is an ongoing project; these are the steps I would likely take next to improve the agent

1. **Optimize Signature/Prompt**: DSPy is designed to evaluate LLM applications, this was just the implementation, next I would have to figure out the best prefix, signature & prompts.
2. **Add Guardrails:** Auto-fixing the code generated by the agent is a solution used in many other agentic systems. Trying to constrain prompt injection attacks is also on the roadmap
3. **Add Memory/interaction:** This agent does everything in one step, also there is no interaction between the individual components where they see each others outputs.
4. **Build a UI:** Right now I only built the agent backend for further testing and allowing user-feedback I would build a UI.

Thank you, for reading!

Please do subscribe to FireBirdTech


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/building-auto-analyst-a-data-analytics)._

