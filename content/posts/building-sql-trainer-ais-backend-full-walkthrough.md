---
title: "Building SQL trainer AI’s backend — A full walkthrough"
excerpt: "Explains how the backend works"
date: 2025-07-27T08:02:44+05:00
updated: 2025-07-27T08:02:44+05:00
cover_image: "https://substackcdn.com/image/fetch/$s_!Kmnz!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fef1458cc-fd72-4f61-8c86-077e78363f03_1350x759.png"
tags:
  - AI
  - SQL
  - Tutorial
  - Backend
published: true
original_url: "https://firebirdtech.substack.com/p/building-sql-trainer-ais-backend"
---

At [FirebirdTech](https://firebird-technologies.com/), We believe in transparency and openness; we love to show how we build our projects. Carrying on with that spirit, we have recently launched the AI SQL Trainer in beta. This blog post shows how the backend of the application works.

You can register to use the beta here: [https://tally.so/r/n9A2MQ](https://tally.so/r/n9A2MQ)

Here is a glossary of the AI components in the system:

1. **Schema Generator**: Takes an initial prompt from the user & creates a schema. Then populates the tables with some data.
2. **Question Generator:** Generates questions by looking at the schema, topic and difficulty chosen by the user
3. **AI competitor:** The AI competes with the human in SQL, based on difficulty and schema.

**Note**: *For simplicity's sake we would be working with SQlite/DuckDB for the beta version, but others can be added just the same!*

## Schema Generator

In the app before training begins, users can with the help of AI generate a schema. They can generate a schema for almost anything ecommerce, restaurants, telecom & even spaceships!

**Code for Schema generator**

Like with most of our projects we use DSPy.ai, it helps us optimize the system as we please and it leads to a modular system design that can easily add & subtract components from.

```sql
import dspy
# DSPy Signature for the create schema LLM program
class create_schema(dspy.Signature):
    """
    You are a schema generation assistant. Given a natural language description of the data or entities
    the user wants to store, generate a SQL CREATE TABLE schema that defines appropriate tables, columns, 
    and data types. Use sensible names, appropriate data types, and include primary keys. If multiple tables 
    are needed, include foreign key relationships where applicable. Return only the SQL schema.

    Example:
    User Prompt: "I want to store information about books, authors, and publishers. Each book has a title, 
    publication year, genre, and is written by one or more authors. Each author has a name and birth year. 
    Each publisher has a name and address."

    Output: A valid SQL schema containing CREATE TABLE statements to represent this data model.

    Your are using duckDB SQL, which is based on SQLite
    - DO NOT TRY to add foreign_key etc relationships
    
    
    """
    user_prompt = dspy.InputField(desc="The prompt the user has given on what schema they want you to generate")
    schema_sql = dspy.OutputField(desc="The SCHEMA SQL for the requested prompt")

schema_gen = dspy.Predict(create_schema)
schema_prompt = "Generate a schema for an online pet store"

response = schema_gen(user_prompt = schema_prompt)

print(response.schema_sql)
```

Below is the schema generated, which you can add to any DB engine to execute. Since the system is based on DuckDB, we just connected DuckDB in memory and ran the SQL

```sql
# SCHEMA FOR PET STORE

CREATE TABLE Categories (
    category_id INTEGER PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE Products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone_number TEXT
);

CREATE TABLE Orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderItems (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
```

**Code for populating tables**

Now to populate tables with data, doing so in SQL is actually much harder. A better way to do so, is to create data in Python & then insert those into the DB.

```python
# DSPy signature that generates executable code that when executed will add data
class populate_table(dspy.Signature):
    """
    You are provided with a DuckDB SQL table schema.

    Your task is to write complete Python code that:
    - Uses DuckDB in Python.
    - Generates 250 rows of realistic simulated data based on column types and names.
    - Uses libraries such as `faker`, `random`, or `numpy` for data generation.
    - Creates the table using the exact schema provided.
    - Inserts the generated rows using DuckDB SQL INSERT statements (no DataFrame insertion).
    - Uses parameterized queries to avoid SQL injection and ensure clean formatting.
    - No need to import duckdb or connect it is already connected as conn
    - Do not do conn = duckdb.connect(), it is already connected
    - Take care of the foreign key relations, ensuring you add in good sequence!

    Do not return anything except the Python code.

    One-shot Example:

    Input
    table_schema = '''
    CREATE TABLE users (
        user_id INTEGER,
        full_name VARCHAR,
        email VARCHAR,
        age INTEGER,
        join_date DATE,
        is_active BOOLEAN
    );
    '''

    Output
    python_code = '''
    from faker import Faker
    import random
    from datetime import datetime, timedelta

    # Initialize
    fake = Faker()

    # Insert 250 rows
    insert_query = "INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)"
    for i in range(1, 251):
        full_name = fake.name()
        email = fake.email()
        age = random.randint(18, 70)
        join_date = fake.date_between(start_date='-3y', end_date='today').isoformat()
        is_active = random.choice([True, False])
        conn.execute(insert_query, (i, full_name, email, age, join_date, is_active))
    '''
    """
    table_schema = dspy.InputField(desc="The DuckDB SQL schema for the table")
    python_code = dspy.OutputField(desc="Python code that generates simulated data & adds it via DuckDB SQL")

pop_table_gen = dspy.Predict(populate_table)

# Get the DDL for all tables in the database and print them
tables = [row[0] for row in conn.execute("SHOW TABLES").fetchall()]
schema_result = []
for table in tables:
    ddl = conn.execute(f"DESCRIBE {table}").fetchall()
    schema_result.append((table,ddl))
    print(f"Schema for table '{table}':\n{ddl}\n{'-'*40}")

response = populate_agent(table_schema = str(schema_result))

print(response.python_code)
```

This is the result of the above code, a Python script that inserts data according to the schema into the tables.

Here is the data tables

> *Not only do we develop our own AI projects, but we also help clients build with AI the right way. We can help you develop proto-types and production ready systems.*
>
> *Reach out here: <https://tally.so/r/3x9bgo>*

# Question Generator

Now the system needs to generate questions for the user, based on the schema, difficulty & preferred topic.

After experimenting, it is better to have separate LLM programs based on difficulty. Easier to optimize and change on how the system evolves.

```sql
class basic_question_gen(dspy.Signature):
    """
    You are part of an AI-powered SQL training system designed to help beginners learn SQL through guided practice.

    Given:
    - A DuckDB database schema (`db_schema`) that includes tables and columns.
    - An optional topic (`topic`) such as SELECT, WHERE, JOIN, GROUP BY, etc.

    Your task:
    - Generate 1 beginner-level SQL question based on the provided schema and topic.
    - If the topic is 'All', select a fundamental concept like:
        - Selecting columns
        - Filtering rows
        - Sorting data
        - Using COUNT or SUM
        - Applying LIMIT

    Output:
    - A clear and simple question related to the schema.
    - A correct SQL solution for that question.
    """
    db_schema = dspy.InputField(desc="The schema of the DuckDB database")
    topic = dspy.InputField(desc="The SQL topic user wants to learn", default="All")
    question = dspy.OutputField(desc="A single basic-level SQL question")
    solution_sql = dspy.OutputField(desc="Correct SQL query that solves the question")

class intermediate_question_gen(dspy.Signature):
    """
    You are part of an AI-powered SQL training system designed to help users advance their SQL skills through practical exercises.

    Given:
    - A DuckDB database schema (`db_schema`) that includes tables and columns.
    - An optional topic (`topic`) such as JOINs, GROUP BY, subqueries, etc.

    Your task:
    - Generate 1 intermediate-level SQL question that applies concepts like:
        - JOINs across tables
        - GROUP BY with aggregate functions
        - Subqueries in SELECT or WHERE
        - Filtering using IN, BETWEEN, LIKE
        - HAVING clause

    Output:
    - A clear intermediate-level question that challenges understanding.
    - A correct SQL solution for that question.
    """
    db_schema = dspy.InputField(desc="The schema of the DuckDB database")
    topic = dspy.InputField(desc="The SQL topic user wants to learn", default="All")
    question = dspy.OutputField(desc="A single intermediate-level SQL question")
    solution_sql = dspy.OutputField(desc="Correct SQL query that solves the question")

class hard_question_gen(dspy.Signature):
    """
    You are part of an AI-powered SQL training system designed to help users master advanced SQL through challenging problems.

    Given:
    - A DuckDB database schema (`db_schema`) that includes tables and columns.
    - An optional topic (`topic`) such as advanced JOINs, window functions, CTEs, etc.

    Your task:
    - Generate 1 advanced SQL question involving:
        - CTEs (WITH clause)
        - Window functions (RANK, ROW_NUMBER, etc.)
        - Correlated subqueries
        - Multi-level aggregation
        - INTERSECT, EXCEPT

    Output:
    - A realistic and challenging SQL question.
    - A valid SQL solution that solves the problem.
    """
    db_schema = dspy.InputField(desc="The schema of the DuckDB database")
    topic = dspy.InputField(desc="The SQL topic user wants to learn", default="All")
    question = dspy.OutputField(desc="A single hard-level SQL question")
    solution_sql = dspy.OutputField(desc="Correct SQL query that solves the question")
```

Based on user feedback, this change will give us better control over how “difficult” the questions actually are. For example, the current “easy” level might be too simple, or “difficult” might be overly challenging. By adjusting the prompts independently, we can fine-tune the difficulty more effectively.

**Check Solution**

In this program, we need to repeatedly check whether the SQL is executable (both user-generated and system-generated). Next, we need to ensure that the user’s query and the expected result match — remember, there are many ways to achieve the same result, so the user should not be disqualified just because they used a different syntax.

The implementation for this is relatively simple.

**Generate Explanations**

Simple LLM program that generates explanation on why the AI answer is correct & user answer is wrong.

```python
class explanation_gen(dspy.Signature):
    """
    You are part of an AI-powered SQL training system that helps users learn from their mistakes.

    Given:
    - `error_generated`: The error message returned by the SQL engine (DuckDB) after running a query.
    - `faulty_sql`: The original SQL query written by the user that caused the error.
    - `corrected_sql`: A corrected version of the SQL query generated by the AI that fixes the issue.

    Your task:
    - Analyze the error message, the user's faulty SQL, and the corrected SQL.
    - Clearly explain what mistake the user made.
    - Avoid technical jargon and use simple English.
    - Focus on teaching the user so they can avoid this mistake in the future.
    - Use analogies or examples only if it helps clarify the concept.

    Output:
    - A single paragraph explanation written for beginners.
    """
    error_generated = dspy.InputField(desc="The error message returned by DuckDB")
    faulty_sql = dspy.InputField(desc="The incorrect SQL query the user wrote")
    corrected_sql = dspy.InputField(desc="The correct SQL query generated by the AI")
    explanation = dspy.OutputField(desc="A clear and beginner-friendly explanation of the mistake")
```

These explanations help the user learn. Next is the final & gamified AI vs Human competition.

<div class="post-embed"><a class="post-embed-link" href="/p/building-a-reliable-text-to-sql-pipeline"><div class="post-embed-image"><img alt="Building a Reliable Text-to-SQL Pipeline: A Step-by-Step Guide pt.1" loading="lazy" src="https://substack-post-media.s3.amazonaws.com/public/images/860b74d5-342f-4490-b42b-0d20b853ddfc_788x680.jpeg"/></div><div class="post-embed-body"><p class="post-embed-meta">Arslan Shahid · 24 January 2025</p><h4 class="post-embed-title">Building a Reliable Text-to-SQL Pipeline: A Step-by-Step Guide pt.1</h4><p class="post-embed-description">Many of our clients are asking for text-to-SQL solutions these days, and it’s become a key part of nearly every project we’ve worked on in the last quarter. While it’s easy to get a language model to generate SQL queries, building a reliable system for enterprise use is a different story. For business-critical applications, we need a high…</p></div></a></div>

# AI vs Human

This will be a timed match between a human and an AI. To ensure a fair challenge, the AI will use a [Text-to-SQL agent](https://medium.com/firebird-technologies/building-a-reliable-text-to-sql-pipeline-a-step-by-step-guide-pt-1-9041b0777a77) with a built-in constraint: **difficulty level**. This constraint intentionally limits the agent’s accuracy based on the selected difficulty, giving humans a more balanced opportunity to compete. Without such a constraint, high-end LLMs typically perform very well on schemas with 5–6 tables, leaving little room for human advantage.

To make it a playable game, we will initially restrict both the model and its response time.

1. In easy mode, the LLM will be a mid-tier model with access to only table names and column names. It will not include column types or sample data.
2. In intermediate mode, the LLM will still be a mid-tier model but will have access to a few-shot examples and column types, though not sample data from each table.
3. In hard mode, the model will be top-tier and equipped with a full-fledged RAG system that can fetch additional information, including sample data from the tables.

All of these modes will be restricted to respond within 5 seconds, while humans will be allowed a full minute.  
The implementation of the Text-to-SQL agent is described below, using three separate DSPy signatures for easy, intermediate, and hard modes.

```python
class text2sql_easy(dspy.Signature):
    """
    Easy mode Text-to-SQL agent.

    Uses a mid-tier model with access to only table and column names (no descriptions, examples, or relationships).
    Designed to challenge the AI with limited schema visibility.

    Instructions:
    You are a helpful SQL assistant. Your task is to convert a natural language question into a valid SQL query.

    You are only given the names of tables and their columns. Do not assume any additional relationships, foreign keys, or descriptions.

    Guidelines:
    - Use only the table and column names exactly as provided in the schema.
    - If the question involves multiple tables, use reasonable assumptions to join them (e.g., on common keys like 'id'), but keep it simple.
    - Do not make up columns or tables.
    - Stick to basic SQL syntax (SELECT, WHERE, GROUP BY, ORDER BY, etc.).
    - Avoid overly complex logic or nested queries unless clearly required.

    Return only the SQL query as your final output.
    """
    
    user_question = dspy.InputField(desc="The user's natural language question about the database")
    table_schema = dspy.InputField(desc="Only table names and column names from the database")
    sql_query = dspy.OutputField(desc="The SQL query corresponding to the question")

class text2sql_intermediate(dspy.Signature):
    """
    Intermediate mode Text-to-SQL agent.

    Uses a mid-tier model with access to only table and column names, but includes a set of few-shot examples to guide SQL generation.

    Instructions:
    You are a SQL assistant that translates natural language questions into SQL queries.

    You are given:
    - A database schema (just table and column names).
    - A set of few-shot examples that map natural language questions to SQL queries.

    Guidelines:
    - Learn from the structure, syntax, and logic of the few-shot examples.
    - Only use the table and column names provided in the schema.
    - Do not invent any tables, columns, or relationships not clearly present.
    - If joining tables is needed, use common-sense assumptions based on column names.
    - Keep SQL queries clean, syntactically correct, and aligned with the style of the examples.

    Your output must be a valid SQL query corresponding to the user’s question.
    """

    user_question = dspy.InputField(desc="The user's natural language question")
    table_schema = dspy.InputField(desc="Table and column names")
    sql_query = dspy.OutputField(desc="Generated SQL query")

class text2sql_hard(dspy.Signature):
    """
    Hard mode Text-to-SQL agent.

    Uses a top-tier model with access to a full RAG (retrieval-augmented generation) system and example-based reasoning.
    The agent is equipped with:
    - Schema documentation
    - Table relationships and join logic
    - Domain-specific metadata
    - A set of high-quality few-shot examples (question-SQL pairs)

    Instructions:
    You are an expert-level SQL assistant working with enterprise-scale databases.

    You are given:
    - A user's natural language question.
    - Retrieved context from schema documentation, data dictionaries, relationships, and metadata.
    - A curated set of few-shot examples to illustrate how natural language maps to SQL.

    Guidelines:
    - Carefully review the RAG context to understand schema relationships and constraints.
    - Learn from the structure, logic, and syntax of the few-shot examples.
    - Accurately determine joins, groupings, aggregations, filters, and subqueries.
    - Use table aliases for clarity and write clean, modular SQL.
    - Reflect business logic or terminology when applicable.

    Your output must be a well-formed, executable SQL query that answers the user's question, grounded in both the retrieved context and prior examples.
    """

    user_question = dspy.InputField(desc="The user's natural language question")
    context = dspy.InputField(desc="Context retrieved from schema documentation, join logic, metadata, etc.")
    few_shot_examples = dspy.InputField(desc="Few-shot examples of natural language questions and their corresponding SQL queries")
    sql_query = dspy.OutputField(desc="Generated SQL query")
```

We are excited to demo this in the coming weeks to actual users.

Here is the waitlist, we will start sending product invites on a first come first serve basis!  
  
[Join waitlist!](https://tally.so/r/n9A2MQ)


---

## Need help shipping AI products?

FireBird Technologies builds custom AI agents, internal analytics, and full SaaS products for teams that want to move fast without compromising on quality. If anything in this post sparked an idea, we'd love to hear about it.

<div class="cta-row"><a class="cta-button cta-primary" href="/#contact">Talk to FireBird →</a><a class="cta-button cta-secondary" href="/#products">See our products</a></div>


_Originally published on [FireBirdTech Substack](https://firebirdtech.substack.com/p/building-sql-trainer-ais-backend)._

