---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.17.2
  kernelspec:
    display_name: base
    language: python
    name: python3
---

# Large Language Models as Research Agents: Part 1 - API Basics

*NASA Cosmic Origins AI/ML STIG Tutorial Series*

*Part 1 of 2: Working with LLM APIs*

**Learning Objectives:**
- Understand what APIs are and how to interact with LLMs programmatically
- Make your first API calls to Claude and other language models
- Master key parameters: temperature, max_tokens, system prompts
- Build multi-turn conversations and manage context
- Implement prompting strategies for research tasks
- Work with vision models for astronomical image analysis
- Handle rate limits and errors in production code


## Introduction

Large Language Models (LLMs) are rapidly transforming how we conduct astronomical research. 
While most researchers are familiar with ChatGPT or Claude through their web interfaces, 
the real power lies in programmatic access through APIs (Application Programming Interfaces). 
This allows you to:

- **Automate repetitive tasks**: Process hundreds of papers, generate summaries, or extract data
- **Integrate AI into your workflow**: Connect LLMs with your existing analysis pipelines
- **Build custom research tools**: Create specialized assistants for your specific needs
- **Scale your research**: Process large datasets with consistent, reproducible AI assistance

This tutorial series consists of two parts:
1. **Part 1 (This tutorial)**: Fundamentals of LLM APIs - making calls, managing conversations, prompting strategies
2. **Part 2 (Next tutorial)**: Advanced capabilities - function tools and Retrieval Augmented Generation (RAG)

Together, these tutorials will equip you to build AI-powered research agents tailored to astronomy.

**Prerequisites:**

This tutorial assumes basic familiarity with Python programming (variables, functions, loops, dictionaries). If you're new to Python or need a refresher, please check out [Coding Essentials for Astronomers](https://tingyuansen.github.io/coding_essential_for_astronomers/), a foundational Python course designed specifically for astronomers.


### Why Programmatic Access Matters

You might reasonably ask: "If LLMs can write code for me through ChatGPT, why do I need to learn 
to code with them?" It's a fair question that deserves a thoughtful answer.

**The Web Interface is Training Wheels**

Using ChatGPT or Claude through a browser is like using a calculator—it's great for one-off questions, 
but imagine if you needed to do the same calculation 1,000 times. You wouldn't manually type each one. 
Similarly, when you need to:
- Analyze abstracts from 500 papers
- Generate consistent summaries of observation logs
- Create custom research tools that combine AI with your data

...you need programmatic access.

**Real Research Scenarios**

Consider these common astronomy research tasks:
- Extracting key findings from every paper on exoplanet atmospheres published this year
- Generating natural language summaries of your spectroscopic observations
- Building a custom chatbot that answers questions about your telescope's documentation
- Creating an AI assistant that can both query astronomical databases AND reason about the results

None of these are possible through a web interface alone. You need code.

<!-- #region -->
### From Chat to Code: The Fundamental Shift

Up until now, your interaction with LLMs has probably been conversational and manual. 
You type a question, get an answer, perhaps follow up. Each interaction is separate.

**Programmatic access changes everything:**

```python
# Instead of manually asking about 100 papers...
for paper in my_reading_list:
    summary = ask_claude(f"Summarize this paper: {paper.abstract}")
    key_findings = ask_claude(f"What are the key findings?")
    save_to_database(paper.title, summary, key_findings)
```

This is the power we're unlocking today: **LLMs as programmable research tools**.

By the end of this tutorial, you'll understand how to integrate AI capabilities into your research workflow, 
making them as accessible as any other Python library.
<!-- #endregion -->

## Understanding APIs

Let's demystify this term that gets thrown around constantly in programming. API stands for Application Programming Interface, but that definition helps nobody. Here's a better way to think about it: an API is a structured way for programs to talk to each other. When your Python code needs to communicate with an LLM running on a server somewhere, the API defines exactly how that conversation happens.

Think of it like ordering at a restaurant. You (your Python code) don't walk into the kitchen and start cooking. Instead, you look at a menu (the API documentation), place an order with specific requirements (the API request), and receive your meal (the API response). The waiter (the API) handles all the communication between you and the kitchen (the LLM). You don't need to know how the kitchen works, what equipment they use, or who's cooking—you just need to know how to order.

In concrete terms, when you want an LLM to analyze text, you send a specially formatted message over the internet to the LLM's servers. The message contains your prompt, along with parameters like which model to use and how long the response should be. The server processes your request and sends back a response containing the LLM's output. All of this happens in seconds, and it's all just Python dictionaries and strings—data structures you already understand.

The beauty of APIs is standardization. Whether you're using OpenAI's GPT, Anthropic's Claude, or Google's Gemini, the basic pattern remains the same: format your request, send it to the server, receive the response, extract the data. Once you learn this pattern with Claude today, you can apply it to any LLM service.


### The Request-Response Dance

Every API interaction follows a simple rhythm: request, response. You ask, the LLM answers. But unlike human conversation where ambiguity is common, APIs demand precision. You need to specify exactly what you want, in exactly the right format, or the server will politely refuse to help.

Let's break down what actually happens when your Python code talks to an LLM:

**Your Request Contains:**
- **The Prompt**: Your actual question or task, written as a string
- **The Model**: Which LLM version to use (e.g., claude-sonnet-4-5, claude-haiku-4-5, claude-opus-4-1)
- **Parameters**: Settings that control the response (like max_tokens for length, temperature for creativity)
- **Your API Key**: A special password that identifies your account and tracks usage

**The Response Delivers:**
- **The Content**: The LLM's actual answer to your prompt
- **Usage Information**: How many tokens were used (affects cost)
- **Status Information**: Whether the request succeeded or failed
- **Metadata**: Additional information like which model version actually processed your request

This structure should feel familiar—it's just like functions you're used to working with. You provide inputs (arguments), the function processes them, and you get outputs (return values). The only difference is that the processing happens on a remote server instead of your laptop.

Understanding this request-response pattern is crucial because it's universal across all web APIs, not just LLMs. Whether you're fetching astronomical data from NASA's databases, weather data, or generating text with Claude, the pattern is the same.


## Setting Up Your Connection

### Getting Your API Key

Before we write any code, you need to obtain an API key from an LLM provider. We'll focus on Anthropic's Claude for this tutorial because of its strong performance on technical and scientific tasks, but the concepts apply to any LLM API.

**Setting up Anthropic (Claude):**

1. **Create an Account**
   - Go to console.anthropic.com
   - Click "Sign up" and create an account
   - Verify your email address

2. **Add Credits to Your Account**
   - Once logged in, click on "API Keys" → "Billing" → "Buy Credits"
   - Add at least $5 to get started (this will last for thousands of API calls)
   - Enter your payment information
   - Note: Without credits, your API calls will fail with an error about insufficient funds

3. **Generate Your API Key**
   - Navigate to "API Keys" → "API Keys" in your dashboard
   - Click "Create Key"
   - Give it a descriptive name like "Astronomy Research Project"
   - **Critical**: Copy the key immediately! It looks like this:
     ```
     sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```
   - You won't be able to see this key again after leaving this page
   - Paste it somewhere temporary (like a text file on your desktop) - we'll move it to secure storage next


### Understanding Tokens and Costs
 
LLMs don't think in words—they think in "tokens," which are more like syllables than complete words. Here are some examples:
- "astronomy" → ["astro", "nomy"] (2 tokens)
- "star" → ["star"] (1 token)  
- "Hello, world!" → ["Hello", ",", " world", "!"] (4 tokens)
 
**Rule of thumb:** 1,000 tokens ≈ 750 words
 
When you send a prompt to Claude, you pay for input tokens. When Claude responds, you pay for output tokens. 

**The Model Tier Strategy:**

Every LLM company offers multiple models at different price points—think of it like choosing between a compact car and a luxury SUV. Both get you where you're going, but one is more economical while the other handles challenging terrain better.

Anthropic offers three main Claude models (as of late 2025):
- **Claude Opus 4.1**: $15/$75 per million input/output tokens - the most powerful model—excellent for complex reasoning, multi-step problems, and tasks requiring deep understanding
- **Claude Sonnet 4.5**: $3/$15 per million input/output tokens - balanced performance and cost, delivering excellent quality for most research tasks
- **Claude Haiku 4.5**: $1/$5 per million input/output tokens - the fastest and most economical option, great for simple tasks and high-volume processing

For most tasks, we'll use Claude Sonnet 4.5 because it offers an excellent balance of capability and cost. For simple, high-volume tasks like extracting data from observation logs, Haiku 4.5 can be very cost-effective. Let's break down the actual costs:

**Example calculation for analyzing one observation log:**
- Your prompt: ~100 tokens (asking to extract data)
- Claude's response: ~150 tokens (JSON with extracted fields)
- Total: 250 tokens

With **Haiku 4.5** pricing ($1/$5 per million tokens):
- Input cost: 100 tokens × ($1/1,000,000) = $0.0001
- Output cost: 150 tokens × ($5/1,000,000) = $0.00075
- **Total per log: ~$0.00085**

With **Sonnet 4.5** pricing ($3/$15 per million tokens):
- Input cost: 100 tokens × ($3/1,000,000) = $0.0003
- Output cost: 150 tokens × ($15/1,000,000) = $0.00225
- **Total per log: ~$0.00255**

With **Opus 4.1** pricing ($15/$75 per million tokens):
- Input cost: 100 tokens × ($15/1,000,000) = $0.0015
- Output cost: 150 tokens × ($75/1,000,000) = $0.01125
- **Total per log: ~$0.01275**

With your $5 credit:
- **Haiku 4.5**: $5 ÷ $0.00085 = ~5,900 observation logs
- **Sonnet 4.5**: $5 ÷ $0.00255 = ~1,960 observation logs
- **Opus 4.1**: $5 ÷ $0.01275 = ~390 observation logs

For simple extraction tasks like pulling galaxy names, dates, and observation parameters, Haiku 4.5 is incredibly cost-effective. Use Sonnet 4.5 for more complex analysis or when you need higher accuracy. Save Opus 4.1 for when you need the most sophisticated reasoning about the physical implications of your data.

The art is matching the model to your task. Simple extraction? Use the cheaper model. Complex multi-step reasoning about the physical implications of your data? Consider the premium model. 


### Keeping Your API Key Safe

An API key is like your personal identification for the LLM service. It proves to the service that you're an authorized user and tracks your usage. Here's what an API key looks like (this one is fake):
```
sk-proj-7x9YZ2aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789
```

The cardinal rule of API keys: **treat them like passwords**. Never, ever put them directly in your code. Why? Because the moment you share your notebook with a colleague, post it on GitHub, or show your screen during a presentation, anyone who sees that key can use it to rack up charges on your account.

Instead, we'll use an environment file—a separate file that stores sensitive information and stays on your computer. Think of it as a safe in your coding workspace. Your code knows the combination to open the safe, but the safe itself never leaves your machine.

### Creating your .env file

Let's create a file called `.env` (yes, the filename starts with a dot—this is a Unix convention that marks it as a hidden configuration file):

1. In your code editor: File → New Text File
2. Type your API key like this:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
   ```
3. File → Save As → name it `.env`
4. Save in your project folder (same folder as your notebooks)

The format is simple: `VARIABLE_NAME=value` with no spaces around the equals sign, no quotes (unless they're part of the key itself). This format is called "dotenv" and it's an industry standard used by thousands of applications.

**Important:** Keep your `.env` file private and never share it or upload it to public repositories. This file contains your secret API key which should be treated like a password.




<!-- #region -->
### Loading Your Keys in Python

Now that your API key is safely stored in `.env`, we need to tell Python how to read it. We'll install two packages:

1. **`python-dotenv`**: This package knows how to read `.env` files and load environment variables into Python. Without it, Python has no idea that `.env` files are special—it would just see them as text files.

2. **`anthropic`**: This is Anthropic's official Python library that handles all the complex networking details of talking to Claude. It manages HTTPS connections, formats your messages correctly, handles retries, and converts responses into Python objects.

Think of it this way: `python-dotenv` is the key to your safe, and `anthropic` is your communication channel to Claude. You need both to make the API work securely.

Let's install both packages:

```bash
pip install python-dotenv anthropic
```

With the packages installed, here's how to load your API key:
<!-- #endregion -->

```python
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Get your API key
api_key = os.getenv('ANTHROPIC_API_KEY')

# Verify it loaded (but don't print the actual key!)
if api_key:
    print("✓ API key loaded successfully")
    print(f"Key starts with: {api_key[:15]}...")  # Just show the beginning
else:
    print("✗ No API key found. Check your .env file!")
```

The `load_dotenv()` function searches for a `.env` file in your current directory and loads all the variables it finds into Python's environment. Then `os.getenv('ANTHROPIC_API_KEY')` retrieves your specific key. It's like opening a safe (load_dotenv) and then taking out the specific item you want (os.getenv).

If you see "No API key found," check these common issues:
- Is your `.env` file in the same folder as your notebook?
- Did you spell `ANTHROPIC_API_KEY` exactly the same in both places?
- Did you save the `.env` file after adding your key?
- Are there spaces around the equals sign in your `.env` file? (There shouldn't be)


## Your First API Call

Now comes the exciting moment—actually talking to Claude through code instead of a chat interface. Let's start by creating our connection to Claude:

```python
import anthropic
import os

# Create a client object - think of this as your connection to Claude
client = anthropic.Anthropic(
    api_key=os.getenv('ANTHROPIC_API_KEY')
)
```

This `client` object is your gateway to Claude. It handles authentication, manages the network connection, and provides methods for sending messages. Think of it as establishing a phone line to Claude—once connected, you can have as many conversations as you want.

Now let's make our first API call. Watch how every Python concept comes together:

```python
# Make your first API call!
message = client.messages.create(
    model="claude-sonnet-4-5",  # Which model to use
    max_tokens=100,             # Maximum response length
    messages=[
        {
            "role": "user",
            "content": "What type of galaxy is M31?"
        }
    ]
)

# Display the response
print(message.content[0].text)
```

### Understanding What Just Happened

If everything worked, you should see Claude's response describing M31 (the Andromeda Galaxy) as a spiral galaxy. Congratulations—you just programmatically consulted an LLM!

But look closer at what just happened. Every Python concept is at work here:

- **Variables:** You stored the response in `message`
- **Dictionaries:** The message you sent has keys "role" and "content"
- **Lists:** The `messages` parameter takes a list of dictionaries
- **List indexing:** That `[0]` gets the first element
- **Dot notation:** `client.messages.create()` and `message.content[0].text`

This might seem like a lot of machinery for a simple question, but here's the power: you can now process hundreds of astronomy questions, save responses to files, and build entire data processing pipelines. The complexity is front-loaded—once you have this working, scaling to thousands of requests is just a matter of adding loops.


### Accessing Response Metadata

The response contains more than just text. It includes valuable metadata about your API call, including token usage which directly relates to cost. Let's explore what else is available:

```python
# Make a call and examine the full response
message = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=500,
    messages=[{"role": "user", "content": "What is a neutron star?"}]
)

# The actual text response
print("Response text:")
print(message.content[0].text)
print("\n" + "="*50 + "\n")

# Token usage information
print("Token usage:")
print(f"Input tokens: {message.usage.input_tokens}")
print(f"Output tokens: {message.usage.output_tokens}")
print(f"Total tokens: {message.usage.input_tokens + message.usage.output_tokens}")

# Calculate the cost (using Sonnet pricing)
input_cost = (message.usage.input_tokens / 1_000_000) * 3  # $3 per million
output_cost = (message.usage.output_tokens / 1_000_000) * 15  # $15 per million
total_cost = input_cost + output_cost

print(f"\nEstimated cost for this call: ${total_cost:.6f}")
print(f"Calls remaining with $5: {int(5 / total_cost) if total_cost > 0 else 'many'}")
```

Understanding token usage is crucial for managing costs. By tracking this metadata, you can:
- Monitor your spending in real-time
- Optimize prompts to use fewer tokens
- Predict costs before processing large batches
- Set alerts when approaching budget limits


## Understanding the Parameters

### The Model Parameter

The `model` parameter determines which version of Claude you're talking to. Each model has different capabilities, speeds, and costs. Let's understand the differences:

```python
# Using the standard model - fast and economical
response_sonnet = client.messages.create(
    model="claude-sonnet-4-5",  # Sonnet
    max_tokens=50,
    messages=[{"role": "user", "content": "What is a pulsar?"}]
)

print("Sonnet says:")
print(response_sonnet.content[0].text)
print(f"\nTokens used: {response_sonnet.usage.output_tokens}")
```

<!-- #region -->
You can also use the other models depending on your needs:
```python
model="claude-haiku-4-5"  # Fastest and cheapest - great for simple tasks
model="claude-opus-4-1"   # Most capable - for complex reasoning
```

The key is knowing when to use which model:
- **Haiku 4.5**: Simple data extraction, classification, reformatting, high-volume processing
- **Sonnet 4.5**: Most general-purpose tasks, complex extractions, moderate reasoning, balanced needs
- **Opus 4.1**: Sophisticated reasoning, multi-step problems, nuanced understanding, complex creative tasks
<!-- #endregion -->

### The max_tokens Parameter

This parameter sets a hard limit on response length. Understanding its behavior is crucial because it affects both cost and completeness. Remember, tokens are roughly 3/4 of a word, so 100 tokens ≈ 75 words.

When Claude hits the token limit, it stops mid-sentence without warning. Let's see this in action:

```python
# Very short limit - watch it get cut off!
short_response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=20,  # Only about 15 words
    messages=[{"role": "user", "content": "Explain how stars form from molecular clouds"}]
)

print("With max_tokens=20:")
print(short_response.content[0].text)
print("\n[Notice how it cuts off mid-sentence!]")
print("="*50)
```

```python
# Appropriate limit for a complete explanation
full_response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=200,  # About 150 words
    messages=[{"role": "user", "content": "Explain how stars form from molecular clouds"}]
)

print("With max_tokens=200:")
print(full_response.content[0].text)
print(f"\n[Complete response using {full_response.usage.output_tokens} tokens]")
```

**Choosing the right max_tokens:**
- **50 tokens**: Yes/no answers, single facts, classifications
- **100-200 tokens**: Short explanations, definitions
- **500 tokens**: Detailed explanations, multiple paragraphs
- **1000+ tokens**: Comprehensive analyses, long-form content

Pro tip: Set max_tokens slightly higher than you expect to need. It's a ceiling, not a target—Claude will stop naturally when done, using only the tokens it needs.


### The Temperature Parameter

Temperature controls the randomness in Claude's responses. Think of it like tuning the creativity knob from "strictly factual" to "creatively varied." The parameter ranges from 0.0 to 1.0:

- **0.0**: Most deterministic, same input → nearly identical output
- **0.5**: Balanced, some variation while staying on topic
- **1.0**: Maximum creativity, more varied and sometimes surprising

Let's see how temperature affects responses:

```python
# Low temperature - very consistent and factual
for i in range(3):
    factual = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=30,
        temperature=0.0,  # Minimum randomness
        messages=[{"role": "user", "content": "Distance to Proxima Centauri?"}]
    )
    print(f"Try {i+1}: {factual.content[0].text}")

print("\nNotice how the responses are nearly identical!")
```

```python
# Higher temperature - more creative variation
for i in range(3):
    creative = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=50,
        temperature=0.8,  # More creative
        messages=[{"role": "user", "content": "Describe a sunset on Mars poetically"}]
    )
    print(f"Try {i+1}: {creative.content[0].text}\n")

print("Notice the variety in descriptions!")
```

For astronomical data extraction, you'll almost always want low temperature (0.0-0.3) because you need consistent, reproducible results. Save higher temperatures for creative tasks like generating varied descriptions or brainstorming.


### System Prompts: Setting the Context

So far, we've only used "user" messages. But there's another powerful way to guide Claude: the "system" parameter. This sets the overall context and behavior for Claude, like giving it a specific role or persistent instructions.

System prompts are especially useful when you want Claude to maintain a consistent persona or follow specific rules throughout a conversation:

```python
# Without system prompt - general response
response_general = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    messages=[
        {"role": "user", "content": "What causes stellar parallax?"}
    ]
)

print("General response:")
print(response_general.content[0].text)
print("\n" + "="*50 + "\n")
```

```python
# With system prompt - specialized response
# Note: system is a parameter of messages.create(), not part of messages list!
response_expert = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    system="You are an astronomy expert. Explain concepts clearly with examples, and always mention the practical applications in modern astronomy.",
    messages=[
        {"role": "user", "content": "What causes stellar parallax?"}
    ]
)

print("With system prompt (expert mode):")
print(response_expert.content[0].text)
```

System prompts are powerful for:
- **Consistent formatting**: "Always return responses as JSON"
- **Domain expertise**: "You are an expert in stellar spectroscopy"
- **Output constraints**: "Keep all responses under 50 words"
- **Behavioral rules**: "Never make up data; say 'unknown' if not certain"

The system prompt persists across all messages in a conversation, making it perfect for maintaining consistent behavior throughout your data processing pipeline.


## Building Conversations

Unlike the chat interface where Claude seems to "remember" your conversation, the API is completely stateless—each API call is independent and has no memory of previous calls. To maintain context, you must explicitly provide the entire conversation history with each request.

Let's demonstrate this crucial difference:

```python
# First, let's show that Claude does NOT remember without context
print("Example 1: Without maintaining context (two separate calls)")
print("="*50)

# First call
response1 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=100,
    messages=[{"role": "user", "content": "My favorite galaxy is M31. Remember this."}]
)
print("Call 1 - User: My favorite galaxy is M31. Remember this.")
print("Call 1 - Claude:", response1.content[0].text)

# Second call - Claude has NO memory of the first call
response2 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=100,
    messages=[{"role": "user", "content": "What is my favorite galaxy?"}]
)
print("\nCall 2 - User: What is my favorite galaxy?")
print("Call 2 - Claude:", response2.content[0].text)
print("\nNotice: Claude has no idea! Each API call is completely independent.")
```

### Building Context with Message History

To create a conversation where Claude "remembers," you must manually maintain the conversation history and send it with each request:

```python
print("\nExample 2: Maintaining context by building conversation history")
print("="*50)

# Start with an empty conversation history
conversation = []

# First question
conversation.append({"role": "user", "content": "What is a pulsar?"})

# Get Claude's response
response1 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    messages=conversation  # Just the user question
)

# CRITICAL: Add Claude's response to the conversation history
# Without this, Claude won't "remember" what it said
conversation.append({
    "role": "assistant", 
    "content": response1.content[0].text
})

print("Q: What is a pulsar?")
print("A:", response1.content[0].text)
print("\n" + "="*50 + "\n")
```

```python
# Now ask a follow-up question
conversation.append({
    "role": "user", 
    "content": "How fast do they typically spin?"
})

# Claude now has the full context because we're sending the entire conversation
response2 = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    messages=conversation  # Now includes all previous messages
)

# Add this response too
conversation.append({
    "role": "assistant",
    "content": response2.content[0].text
})

print("Q: How fast do they typically spin?")
print("A:", response2.content[0].text)
print("\nNotice: Claude knows 'they' refers to pulsars because we sent the history!")
print("\n" + "="*50 + "\n")
```

```python
# Let's see what's actually being sent
print("What we're actually sending to Claude:")
print("="*50)
for i, msg in enumerate(conversation):
    print(f"Message {i+1} - {msg['role']}:")
    print(f"  {msg['content'][:100]}..." if len(msg['content']) > 100 else f"  {msg['content']}")
    print()

print(f"Total messages in conversation: {len(conversation)}")
print(f"Estimated tokens in context: ~{sum(len(m['content'])/4 for m in conversation):.0f}")
```

### The Key Insight

Every time you make an API call, you're sending the **entire conversation history** to Claude. This is why:
1. **Costs increase** with longer conversations (you're paying for all previous messages as input tokens)
2. **You have complete control** over what Claude "remembers" (you can edit or remove messages)
3. **Context windows matter** (eventually you hit the token limit and need to manage the history)

This manual conversation management might seem tedious, but it's actually powerful—you control exactly what context Claude sees!


### Managing Long Conversations with Summarization

As conversations grow, you face two challenges: rising costs (every old message counts as input tokens) and context limits (models have maximum token windows). The solution? Summarization.

When your conversation history gets too long, you can ask Claude to summarize it, then start fresh with just the summary. This is like taking notes during a long meeting—you keep the key points without all the back-and-forth.

**Understanding the Problem:**

Let's say you've been discussing different types of stellar objects with Claude. After 10 exchanges, your conversation history might be 2000 tokens. That means:
- Every new question costs you those 2000 tokens as input
- You're paying to send the same old messages over and over
- Eventually you'll hit the context limit
 
### What is a context limit? 

The context limit is the maximum number of tokens (input + output) that a model can process in a single request. Think of it as the model's "working memory"—it can only keep track of so much text at once. When you exceed this limit, the API will reject your request or automatically truncate older messages.

**The Summarization Solution:**

Here's how we'll implement conversation summarization step by step:

```python
# First, let's build a conversation that's getting long
print("Building a long conversation...")

long_conversation = []

# Topic 1: Red giants
long_conversation.append({"role": "user", "content": "Tell me about red giant stars"})
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    messages=long_conversation
)
long_conversation.append({"role": "assistant", "content": response.content[0].text})

tokens_so_far = sum(len(msg['content'])/4 for msg in long_conversation)
print(f"Turn 1: Asked about red giant stars ({tokens_so_far:.0f} tokens total)")

# Topic 2: White dwarfs
long_conversation.append({"role": "user", "content": "What about white dwarfs?"})
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    messages=long_conversation
)
long_conversation.append({"role": "assistant", "content": response.content[0].text})

tokens_so_far = sum(len(msg['content'])/4 for msg in long_conversation)
print(f"Turn 2: Asked about white dwarfs ({tokens_so_far:.0f} tokens total)")

# Topic 3: Neutron stars
long_conversation.append({"role": "user", "content": "How do neutron stars form?"})
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=150,
    messages=long_conversation
)
long_conversation.append({"role": "assistant", "content": response.content[0].text})

tokens_so_far = sum(len(msg['content'])/4 for msg in long_conversation)
print(f"Turn 3: Asked about neutron stars ({tokens_so_far:.0f} tokens total)")

print(f"\nConversation is getting long ({tokens_so_far:.0f} tokens). Time to summarize!")
```

Now let's create a summary of this conversation:

```python
# Now let's summarize the conversation
print("Creating summary...\n")

# Add a request for summarization to the conversation
summary_request = long_conversation + [{
    "role": "user",
    "content": "Please provide a comprehensive summary of our entire conversation about stellar objects. Include the key facts we discussed about each type."
}]

# Get the summary
summary_response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=300,
    temperature=0.0,  # We want consistent summaries
    messages=summary_request
)

summary_text = summary_response.content[0].text

print("Summary of our conversation:")
print("="*50)
print(summary_text)
print("\n" + "="*50)

# Compare sizes
original_tokens = sum(len(msg['content'])/4 for msg in long_conversation)
summary_tokens = len(summary_text)/4

print(f"\nOriginal conversation: {len(long_conversation)} messages, ~{original_tokens:.0f} tokens")
print(f"Summary: 1 message, ~{summary_tokens:.0f} tokens")
print(f"Token savings: {(1 - summary_tokens/original_tokens)*100:.0f}% reduction!")
```

Now we can start a new conversation with just the summary as context:

```python
# Start a new conversation with the summary
compressed_conversation = [
    {
        "role": "assistant",
        "content": f"[Previous conversation summary]: {summary_text}"
    },
    {
        "role": "user",
        "content": "What types of stellar remnants did we discuss?"
    }
]

# Claude should still know what we talked about!
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=300,
    messages=compressed_conversation
)

print("Starting fresh conversation with summary as context...\n")
print("Question: What types of stellar remnants did we discuss?\n")
print("Claude's response:")
print(response.content[0].text)
print("\nClaude successfully remembered the conversation through the summary!")
```

**When to use summarization:**
- After 10-15 conversation turns
- When approaching 1000+ tokens in history  
- Before context window limits (typically 200k tokens for Claude)
- When switching between major topics

**Pro tips for effective summarization:**
1. Keep important numerical data and specific findings in the summary
2. Consider keeping the last 2-3 messages unsummarized for immediate context
3. You can create multiple summary levels (detailed → brief → key points only)
4. Save full conversations before summarizing if you need complete records

**Cost benefit example:**
- Without summarization: 20-turn conversation = ~4000 input tokens per new message
- With summarization: Same conversation = ~500 token summary
- Savings: 87.5% reduction in input token costs!


## Prompting Strategies

### Chain-of-Thought Prompting

One of the most powerful techniques for improving LLM accuracy is "chain-of-thought" prompting—explicitly asking the model to show its reasoning step-by-step. This is especially valuable for scientific calculations and multi-step problems.

Let's compare responses with and without chain-of-thought:

```python
# Without chain-of-thought - direct answer
direct_response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=100,
    temperature=0.0,
    messages=[{
        "role": "user",
        "content": "A star has a parallax of 0.05 arcseconds. What is its distance in parsecs and light-years?"
    }]
)

print("Direct answer:")
print(direct_response.content[0].text)
print("\n" + "="*50 + "\n")
```

```python
# With chain-of-thought - step-by-step reasoning
cot_response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=300,
    temperature=0.0,
    messages=[{
        "role": "user",
        "content": """A star has a parallax of 0.05 arcseconds. What is its distance in parsecs and light-years?

Please solve this step-by-step:
1. State the parallax formula
2. Show the calculation for parsecs
3. Convert to light-years
4. State the final answer"""
    }]
)

print("Chain-of-thought answer:")
print(cot_response.content[0].text)
```

Chain-of-thought prompting helps in several ways:
1. **Accuracy**: Breaking problems into steps reduces errors
2. **Verifiability**: You can check each step of the reasoning
3. **Learning**: The model's explanation helps you understand the solution
4. **Debugging**: If wrong, you can identify exactly where the error occurred

This technique is particularly powerful for:
- Multi-step calculations
- Complex logical reasoning
- Data extraction with validation
- Scientific analysis requiring justification


### Few-Shot Prompting

Another powerful technique is "few-shot prompting"—providing examples of the input-output pattern you want. This is incredibly effective for consistent data extraction:

```python
# Zero-shot (no examples) - might be inconsistent
zero_shot = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=100,
    temperature=0.0,
    messages=[{
        "role": "user",
        "content": """Extract the observation data from: 
        'Observed NGC 1234 at 21:30 with 2m telescope, seeing 1.1 arcsec'"""
    }]
)

print("Zero-shot extraction:")
print(zero_shot.content[0].text)
print("\n" + "="*50 + "\n")
```

```python
# Few-shot (with examples) - consistent format
few_shot = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=100,
    temperature=0.0,
    messages=[{
        "role": "user",
        "content": """Extract observation data to JSON. Examples:

Input: 'Observed M31 at 22:00 with 1m telescope, seeing 0.9 arcsec'
Output: {"target": "M31", "time": "22:00", "telescope": "1m", "seeing": 0.9}

Input: 'Started on Jupiter at 23:15 using 3m scope, seeing 1.5 arcsec'
Output: {"target": "Jupiter", "time": "23:15", "telescope": "3m", "seeing": 1.5}

Now extract from: 'Observed NGC 1234 at 21:30 with 2m telescope, seeing 1.1 arcsec'
Output:"""
    }]
)

print("Few-shot extraction:")
print(few_shot.content[0].text)
```

Few-shot prompting is perfect for:
- **Consistent formatting**: The model mimics your example format exactly
- **Edge case handling**: Examples can show how to handle special cases
- **Complex patterns**: Examples are clearer than lengthy descriptions
- **Quality control**: Examples set the quality bar for responses

Rule of thumb: 2-3 good examples are usually better than a paragraph of instructions!


## Making It Practical

### Creating Helper Functions

Now let's combine everything we've learned into practical, reusable functions for your research:

```python
def ask_claude(prompt, max_tokens=100, temperature=0.3, system=None):
    """Send a question to Claude and get a response."""
    # Build the basic parameters
    params = {
        "model": "claude-sonnet-4-5",
        "max_tokens": max_tokens,
        "temperature": temperature,
        "messages": [{"role": "user", "content": prompt}]
    }
    
    # Add system prompt if provided
    if system:
        params["system"] = system
    
    message = client.messages.create(**params)
    return message.content[0].text

# Test it
response = ask_claude(
    "What type of star is Betelgeuse?",
    system="You are an astronomy expert. Keep answers concise."
)
print(response)
```

### Understanding Rate Limits

When you're processing hundreds of observation logs, you'll encounter **rate limits**—restrictions on how many API calls you can make per minute. Think of it like a speed limit on a highway: the API provider wants to ensure their servers aren't overwhelmed and that all users get fair access.

### What are rate limits?

Rate limits typically come in two forms:
1. **Requests per minute (RPM)**: How many API calls you can make (e.g., 50 requests/minute)
2. **Tokens per minute (TPM)**: How many tokens you can process (e.g., 40,000 tokens/minute)

When you hit a rate limit, the API returns a `RateLimitError` instead of a response. It's like getting a "please wait" message at a busy restaurant.

**How to handle rate limits gracefully:**

The simplest solution is to add pauses between requests using `time.sleep()`. This gives the server time to breathe between your requests:

```python
import time

def process_with_rate_limit(items, delay=1.0):
    """Process items with a delay between each to avoid rate limits."""
    results = []
    
    for i, item in enumerate(items):
        # Process the item
        result = ask_claude(f"What type of star is {item}?", max_tokens=20)
        results.append(result)
        
        print(f"Request {i+1}/{len(items)}: {result}")
        
        # Sleep to avoid rate limits (except after the last item)
        if i < len(items) - 1:
            time.sleep(delay)
    
    return results

# Example: Process multiple stars with rate limiting
stars = ["Betelgeuse", "Rigel", "Sun", "Proxima Centauri", "Sirius B"]

print("Processing 5 requests with rate limiting...")
start_time = time.time()

results = process_with_rate_limit(stars, delay=1.0)  # 1 second between requests

end_time = time.time()
print(f"\nTotal time: {end_time - start_time:.2f} seconds")
print(f"Average time per request: {(end_time - start_time)/len(stars):.2f} seconds")

```

### Advanced rate limit handling with exponential backoff

Sometimes you don't know the exact rate limit, or it varies based on server load. A smarter approach uses exponential backoff—starting with short delays and increasing them if you still hit limits:

```python
def call_with_backoff(prompt, max_retries=5):
    """Call API with exponential backoff for rate limits."""
    
    delay = 0.5  # Start with 0.5 second delay
    
    for attempt in range(max_retries):
        try:
            # Try the API call
            response = ask_claude(prompt, max_tokens=30)
            return response  # Success! Return the result
            
        except anthropic.RateLimitError as e:
            if attempt == max_retries - 1:
                print(f"Failed after {max_retries} attempts")
                raise e
            
            # Exponential backoff: double the delay each time
            print(f"Rate limited. Waiting {delay} seconds...")
            time.sleep(delay)
            delay *= 2  # 0.5 → 1 → 2 → 4 → 8 seconds
            
        except Exception as e:
            print(f"Unexpected error: {e}")
            raise e
    
    return None

# Example usage
response = call_with_backoff("What types of stars are in the Orion Nebula?")
print(f"Successfully processed: {response}")

```

Rate limits might seem annoying, but they ensure the service stays reliable for everyone. With proper handling, they're just a minor speed bump in your data processing pipeline.


### Adding Error Handling

Real-world API calls can fail for various reasons. Let's build robust error handling:

```python
import time

def ask_claude_safely(prompt, max_tokens=100, temperature=0.3, system=None, max_retries=3):
    """Ask Claude with automatic retry on failure."""
    
    for attempt in range(max_retries):
        try:
            return ask_claude(prompt, max_tokens, temperature, system)
            
        except anthropic.RateLimitError:
            wait_time = 2 ** attempt  # Exponential backoff: 1, 2, 4 seconds
            print(f"Rate limited. Waiting {wait_time} seconds...")
            time.sleep(wait_time)
            
        except anthropic.APIConnectionError:
            print(f"Connection error on attempt {attempt + 1}")
            if attempt < max_retries - 1:
                time.sleep(1)
            
        except Exception as e:
            print(f"Unexpected error: {e}")
            return None
    
    print(f"Failed after {max_retries} attempts")
    return None

# Test error handling
response = ask_claude_safely("What causes a supernova?")
if response:
    print(response)
```

<!-- #region -->
## Structured Outputs 

### From Text to Data

So far, Claude returns plain text. But for those 200 observation logs, you want structured data you can analyze. Let's transform unstructured text into Python dictionaries and lists.

Imagine you have this observation log:
```
"Started observing at 22:15 UTC. Target: NGC 4526, spiral galaxy. 
Conditions were excellent with seeing at 0.8 arcsec. Used the 
2.4m telescope with R-band filter. Exposure time 300 seconds."
```

You want to extract:
```python
{
    "start_time": "22:15 UTC",
    "target": "NGC 4526",
    "object_type": "spiral galaxy",
    "seeing": 0.8,
    "telescope": "2.4m",
    "filter": "R-band",
    "exposure": 300
}
```

This structured format lets you analyze hundreds of logs programmatically!
<!-- #endregion -->

### Instructing Claude to Return JSON

The key to getting structured data is being explicit about the format you want. Clear instructions lead to consistent results:

```python
# Sample observation log
log = """Started observing at 22:15 UTC. Target: NGC 4526, spiral galaxy. 
Conditions were excellent with seeing at 0.8 arcsec. Used the 
2.4m telescope with R-band filter. Exposure time 300 seconds."""

# Create a detailed prompt with clear instructions
prompt = f"""Extract the following information from this observation log 
and return it as a JSON object:

Observation log: {log}

Return a JSON object with these fields (use null if not found):
- start_time: when observation started
- target: object name
- object_type: type of astronomical object
- seeing: seeing in arcseconds (number only)
- telescope: telescope used
- filter: filter used
- exposure: exposure time in seconds (number only)

Return ONLY the JSON object, no other text."""

# Get structured response
json_text = ask_claude_safely(prompt, max_tokens=200, temperature=0.0)
print("Raw JSON response:")
print(json_text)
```

### Converting JSON to Python Dictionary

The response is still just text! We need to parse it into a Python dictionary to work with it programmatically.
 
Even with temperature=0.0, LLMs can produce varied output formats. Sometimes the JSON comes wrapped in markdown code blocks, sometimes with extra whitespace, or other formatting quirks. Robust string cleaning is essential - string manipulation techniques will be very handy here!
 
In the following example, we'll show how to handle JSON wrapped in markdown, but remember this is just one case. You'll need to adapt your parsing based on what the model actually returns:

```python
import json

def parse_json_response(json_text):
    """Parse JSON response from Claude, handling common formatting issues."""
    try:
        # Claude sometimes wraps JSON in markdown code blocks
        if '```' in json_text:
            # Extract content between ```
            json_text = json_text.split('```')[1]
            # Remove 'json' language identifier if present
            if json_text.startswith('json'):
                json_text = json_text[4:]
        
        # Parse the cleaned JSON
        return json.loads(json_text.strip())
        
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON: {e}")
        print(f"Raw text: {json_text}")
        return None

# Parse the response
data = parse_json_response(json_text)

if data:
    print("\nExtracted data as Python dictionary:")
    for key, value in data.items():
        print(f"  {key}: {value} (type: {type(value).__name__})")
    
    # Now we can work with it programmatically!
    print(f"\nThe observation started at {data['start_time']}")
    print(f"Seeing quality: {data['seeing']} arcsec")
```

### Processing Multiple Logs with Few-Shot Examples

Let's combine structured extraction with few-shot prompting for consistent results across multiple logs:

```python
def create_extraction_prompt(log):
    """Create a few-shot prompt for consistent extraction."""
    return f"""Extract observation data to JSON format.

Examples:
Log: "At 20:30 UTC began observing M42 (Orion Nebula). Seeing 1.2 arcsec, using 1m telescope with H-alpha filter, 120 second exposure."
JSON: {{"time": "20:30 UTC", "target": "M42", "object_type": "Orion Nebula", "seeing": 1.2, "telescope": "1m", "filter": "H-alpha", "exposure": 120}}

Log: "23:45 UTC: Target Vega (star) for calibration. Excellent seeing at 0.6 arcsec. 0.5m telescope, V-band filter, 30 seconds."
JSON: {{"time": "23:45 UTC", "target": "Vega", "object_type": "star", "seeing": 0.6, "telescope": "0.5m", "filter": "V-band", "exposure": 30}}

Now extract from this log:
Log: "{log}"
JSON:"""

# Sample observation logs
logs = [
    "Started at 19:45 UTC observing Betelgeuse (red supergiant). Seeing 0.95 arcsec, 2.5m telescope, R-band filter, 45 second exposure.",
    "01:15 UTC: Switched to Saturn for planetary observations. Seeing deteriorated to 1.8 arcsec. Using 1.5m scope with methane filter, 90 seconds.",
    "Began at 03:30 UTC on M13 (globular cluster). Good conditions, 0.7 arcsec seeing. 3m telescope, B-band filter, exposure 180 seconds."
]

# Process each log
results = []

for i, log in enumerate(logs, 1):
    print(f"Processing log {i}...")
    
    # Get response with few-shot prompt
    prompt = create_extraction_prompt(log)
    response = ask_claude_safely(prompt, max_tokens=150, temperature=0.0)
    
    # Parse JSON
    data = parse_json_response(response)
    
    if data:
        results.append(data)
        print(f"  ✓ Extracted: {data['target']} at {data['time']}")
    else:
        print(f"  ✗ Failed to parse log {i}")
    
    time.sleep(0.5)  # Rate limiting

# Analyze the extracted data
print("\n" + "="*50)
print("Extracted Data Summary:")
print("="*50)

for obs in results:
    print(f"\nTarget: {obs['target']}")
    print(f"  Type: {obs['object_type']}")
    print(f"  Time: {obs['time']}")
    print(f"  Seeing: {obs['seeing']} arcsec")
    print(f"  Setup: {obs['telescope']} telescope, {obs['filter']} filter")
    print(f"  Exposure: {obs['exposure']} seconds")

# Calculate statistics
if results:
    seeing_values = [obs['seeing'] for obs in results]
    avg_seeing = sum(seeing_values) / len(seeing_values)
    print(f"\nAverage seeing across all observations: {avg_seeing:.2f} arcsec")
```

## Vision Models - Beyond Text

Modern AI models aren't limited to just text—they can also analyze and understand images. This opens up exciting possibilities for astronomy, where visual data is fundamental to our observations and discoveries. In this section, we'll explore how to work with vision models using our astronomical images.

### First, Let's Display Our Astronomical Image

Before we dive into how to send images to AI models, let's first look at the image we'll be working with using matplotlib. We'll use `matplotlib.image.mpimg.imread()` to load our image file - this function reads image files (like JPEG, PNG, etc.) and converts them into NumPy arrays that Python can work with:


```python
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

# Load and display the M31 image
img = mpimg.imread("data_m31.jpg")

plt.figure(figsize=(12, 8))
plt.imshow(img)
plt.title('M31 - The Andromeda Galaxy', fontsize=16, fontweight='bold')
plt.axis('off')
plt.show()

print(f"Image shape: {img.shape}")
print(f"Image data type: {img.dtype}")

```

### Understanding Base64 Encoding

Now that we can see our beautiful astronomical image, let's understand how to send it to AI models. Images are binary data—they can't be sent as plain text in a JSON message. The solution is **base64 encoding**, which converts binary data (your image) into text characters that can be transmitted over the internet.

Think of it like this: you want to send a photograph through a system that only handles text messages. Base64 encoding "translates" your image into a long string of letters and numbers that can be sent as text, then decoded back into an image on the other end.

Here's how it works:

```python
import base64

# Let's see what base64 encoding looks like
def demonstrate_base64():
    # Start with simple text
    text = "Hello, Astronomy!"
    
    # Convert to bytes
    text_bytes = text.encode('utf-8')
    
    # Encode to base64
    encoded = base64.b64encode(text_bytes).decode('ascii')
    
    print(f"Original text: {text}")
    print(f"Base64 encoded: {encoded}")
    print(f"Length increased from {len(text)} to {len(encoded)} characters")
    
    # Decode back
    decoded_bytes = base64.b64decode(encoded)
    decoded_text = decoded_bytes.decode('utf-8')
    print(f"Decoded back: {decoded_text}")

demonstrate_base64()
print("\n" + "="*50 + "\n")

# Now for an actual image file
def encode_image_demo(image_path):
    """Show how image encoding works."""
    with open(image_path, "rb") as f:
        image_bytes = f.read()
    
    # Encode to base64
    encoded = base64.b64encode(image_bytes).decode('ascii')
    
    print(f"Image file: {image_path}")
    print(f"Original size: {len(image_bytes):,} bytes")
    print(f"Base64 size: {len(encoded):,} characters")
    print(f"First 100 characters of encoded image: {encoded[:100]}...")
    print(f"\nThis string representation of the image can be sent through the API!")
    
    return encoded

# Encode your M31 image
encoded_image = encode_image_demo("data_m31.jpg")
```

### Analyzing Astronomical Images

Now that we understand base64 encoding, let's build a function to analyze astronomical images:

```python
def analyze_astronomical_image(image_path, question):
    """Send an astronomical image to Claude for analysis."""
    
    # Read the image file as binary data
    with open(image_path, "rb") as f:
        image_data = f.read()
    
    # Convert to base64 - this is how we send binary data as text
    image_base64 = base64.b64encode(image_data).decode('ascii')
    
    # Create message with both text and image
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=300,
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": question},
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",  # Specify the image type
                        "data": image_base64  # The encoded image data
                    }
                }
            ]
        }]
    )
    
    return message.content[0].text

# Analyze the M31 galaxy image
analysis = analyze_astronomical_image(
    "data_m31.jpg",
    """Analyze this astronomical image:
    1. What type of object is shown?
    2. Describe its morphological features
    3. What can you infer about its structure?
    4. Are there any companion objects visible?"""
)

print("Image Analysis:")
print(analysis)
```

### Combining Text and Image Analysis

The real power comes from analyzing both observation logs and their resulting images together. This creates a complete picture of your observations:

```python
def compare_log_with_image(log_text, image_path):
    """Compare an observation log with the resulting image."""
    
    prompt = f"""Compare this observation log with the astronomical image:
    
OBSERVATION LOG:
{log_text}

Please analyze:
1. Does the image quality match the reported seeing conditions?
2. Is the target object clearly identifiable?
3. Are there any unexpected features or issues visible?
4. Overall assessment of observation success.

Provide your analysis in JSON format with fields:
quality_match, target_visible, unexpected_features, success_rating (1-10), notes"""
    
    # Read and encode image
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode('ascii')
    
    # Send both log and image
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=400,
        temperature=0.0,
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": image_data
                    }
                }
            ]
        }]
    )
    
    return message.content[0].text

# Example observation log
observation_log = """Observed M31 (Andromeda Galaxy) at 22:00 UTC. 
Conditions: Excellent, seeing 0.8 arcsec
Equipment: 2.5m telescope, R-band filter
Exposure: 120 seconds
Notes: Clear skies, no moon interference"""

# Compare log with image
comparison = compare_log_with_image(observation_log, "data_m31.jpg")
print("Log-Image Comparison:")
print(comparison)

# Parse the JSON result
comparison_data = parse_json_response(comparison)
if comparison_data:
    print(f"\nSuccess Rating: {comparison_data.get('success_rating')}/10")
    print(f"Notes: {comparison_data.get('notes')}")
```

### Vision Model Capabilities and Limitations

**What vision models CAN do well:**
- Classify galaxy morphologies (spiral, elliptical, irregular)
- Identify obvious features (spiral arms, dust lanes, star clusters)
- Compare images qualitatively
- Describe general image quality and artifacts

**What they CANNOT do:**
- Process raw FITS files (use astropy for this)
- Perform precise photometry or astrometry
- Make quantitative measurements
- Detect faint features below visual threshold
- Replace proper astronomical image analysis software

Vision models are best used as a first-pass analysis tool or for processing large numbers of images where perfect accuracy isn't required.


## Summary

Congratulations! You've just learned the fundamentals of working with Large Language Model APIs. 
Let's recap what you've mastered:

**Core Concepts:**
- How APIs enable programmatic access to LLMs
- Making basic API calls with proper authentication
- Understanding tokens, costs, and rate limits

**Key Parameters:**
- `max_tokens`: Controlling response length
- `temperature`: Balancing creativity vs. consistency
- `system`: Setting context and behavior

**Advanced Techniques:**
- Building multi-turn conversations with message history
- Managing long conversations through summarization
- Crafting effective prompts with few-shot examples
- Extracting structured data (JSON) from LLM responses
- Working with vision models for image analysis
- Implementing error handling and rate limit management

**You're Now Ready For:**

These skills form the foundation for everything we'll build in Part 2. You can now:
- Automate repetitive research tasks
- Build custom AI tools for your workflow
- Process data at scale with consistent AI assistance

In **Part 2: Function Tools and RAG**, we'll extend these capabilities dramatically by:
- Teaching Claude to use external functions (perform calculations, query databases)
- Implementing Retrieval Augmented Generation to work with your documents
- Building complete research assistants that combine reasoning with real data

**Practice Exercises:**

Before moving to Part 2, try building:
1. A script that summarizes astronomical paper abstracts from a CSV file
2. A conversation analyzer for your observing logs
3. An image classification tool for telescope data

**Resources:**
- Anthropic API Documentation: https://docs.anthropic.com

See you in Part 2!






