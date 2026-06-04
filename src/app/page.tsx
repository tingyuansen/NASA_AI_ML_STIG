"use client";

import React, { useState, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const GITHUB_BASE =
  "https://github.com/tingyuansen/NASA_AI_ML_STIG/blob/main/public";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface Lecture {
  number: number;
  title: string;
  speaker: string;
  affiliation: string;
  description: string;
  topics: string[];
  youtube?: string;
  links: { label: string; href: string }[];
  attribution?: { text: string; href: string; doi?: { label: string; href: string } };
}

const lectures: Lecture[] = [
  {
    number: 1,
    title: "Overview",
    speaker: "Jesse Thaler",
    affiliation: "MIT",
    description:
      "An overview of how AI is transforming the mathematical and physical sciences, exploring opportunities and strategic priorities for the astronomy and astrophysics community.",
    topics: [
      "AI's role in scientific discovery",
      "Opportunities for astronomy & astrophysics",
      "Building interdisciplinary AI+MPS communities",
      "Strategic priorities and future directions",
      "Education and workforce development",
    ],
    youtube: "KOcacjfVlm0",
    links: [
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture1_Jesse_Thaler/The_Future_of_AI_and_MPS_Workshop.pdf`,
      },
      {
        label: "Read White Paper on arXiv",
        href: "https://arxiv.org/abs/2509.02661",
      },
    ],
  },
  {
    number: 2,
    title: "LLM API Basics",
    speaker: "Yuan-Sen Ting",
    affiliation: "The Ohio State University",
    description:
      "Learn the fundamentals of working with LLM APIs — making calls, managing conversations, and crafting effective prompts.",
    topics: [
      "Understanding and using LLM APIs",
      "Temperature, max_tokens, system prompts",
      "Multi-turn conversations",
      "Prompting strategies for research",
      "Vision models for image analysis",
    ],
    youtube: "Zh44bOt_mbE",
    links: [
      {
        label: "View/Download on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture2_Yuan-Sen_Ting/LLM_API_Basics_STIG.ipynb`,
      },
      {
        label: "View Slides",
        href: `${BASE_PATH}/Resources/Lecture2_Yuan-Sen_Ting/STIG_Lecture2_Slides/`,
      },
    ],
    attribution: {
      text: "Coding Essentials for Astronomers",
      href: "https://tingyuansen.github.io/coding_essential_for_astronomers/",
      doi: {
        label: "DOI: 10.5281/zenodo.17850426",
        href: "https://doi.org/10.5281/zenodo.17850426",
      },
    },
  },
  {
    number: 3,
    title: "RAG & Function Tools",
    speaker: "Yuan-Sen Ting",
    affiliation: "The Ohio State University",
    description:
      "Break through LLM limitations with function tools and Retrieval Augmented Generation. Build astronomical calculation tools and implement document-based Q&A.",
    topics: [
      "Function tools for extending LLM capabilities",
      "Astronomical calculation tools",
      "Retrieval Augmented Generation (RAG)",
      "Document chunking and embedding search",
      "Vector databases for production systems",
    ],
    youtube: "eic_kIll-ts",
    links: [
      {
        label: "View/Download on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture3_Yuan-Sen_Ting/LLM_Function_Tools_RAG_STIG.ipynb`,
      },
      {
        label: "View Slides",
        href: `${BASE_PATH}/Resources/Lecture3_Yuan-Sen_Ting/STIG_Lecture3_Slides/`,
      },
    ],
    attribution: {
      text: "Coding Essentials for Astronomers",
      href: "https://tingyuansen.github.io/coding_essential_for_astronomers/",
      doi: {
        label: "DOI: 10.5281/zenodo.17850426",
        href: "https://doi.org/10.5281/zenodo.17850426",
      },
    },
  },
  {
    number: 4,
    title: "LLM as Agent",
    speaker: "Francisco Villaescusa-Navarro",
    affiliation: "Flatiron Institute CCA",
    description:
      "Explore autonomous AI agents that can reason, act, and collaborate. Learn about multi-agent systems, LangGraph workflows, and how AI agents are revolutionizing scientific research.",
    topics: [
      "AI Agents and ReAct (Reason + Act) framework",
      "Multi-agent systems: collaboration & competition",
      "Agentic workflows in scientific research",
      "LangGraph for building agent systems",
      "Applications: hypothesis generation, code generation, paper writing",
    ],
    youtube: "7hY8wLjGSdg",
    links: [
      {
        label: "View/Download on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture4_Francisco_Villaescusa-Navarro/AI_Agents_Multi-Agent_Systems_STIG.ipynb`,
      },
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture4_Francisco_Villaescusa-Navarro/AI_Agents_and_Multi-Agent_Systems.pdf`,
      },
    ],
  },
  {
    number: 5,
    title: "Model Context Protocol",
    speaker: "Yuan-Sen Ting",
    affiliation: "The Ohio State University",
    description:
      "Introduction to the Model Context Protocol (MCP) for connecting LLMs to external data and tools. Learn how to build MCP servers to expose local resources and APIs to AI assistants.",
    topics: [
      "Model Context Protocol (MCP) basics",
      "Building MCP Servers",
      "Connecting local data to LLMs",
      "Resources and Tools",
    ],
    youtube: "ttKtiG6-V5U",
    links: [
      {
        label: "View/Download on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture5_Yuan-Sen_Ting/LLM_MCP_STIG.ipynb`,
      },
      {
        label: "View Slides",
        href: `${BASE_PATH}/Resources/Lecture5_Yuan-Sen_Ting/STIG_Lecture5_Slides/`,
      },
    ],
    attribution: {
      text: "Coding Essentials for Astronomers",
      href: "https://tingyuansen.github.io/coding_essential_for_astronomers/",
      doi: {
        label: "DOI: 10.5281/zenodo.17850426",
        href: "https://doi.org/10.5281/zenodo.17850426",
      },
    },
  },
  {
    number: 6,
    title: "PyTorch and Autodifferentiation",
    speaker: "Phill Cargile",
    affiliation: "Harvard-Smithsonian CfA",
    description:
      "Master the fundamentals of PyTorch and automatic differentiation. Learn how to build, train, and optimize neural networks using PyTorch's powerful autodiff engine.",
    topics: [
      "PyTorch tensors and operations",
      "Automatic differentiation (autograd)",
      "Building models with torch.nn.Module",
      "Optimization with torch.optim",
      "CPU vs GPU: device management",
      "Training a minimal MLP from scratch",
    ],
    youtube: "DVnRi8pszss",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture6_Phill_Cargile/PyTorch_Autodiff_STIG.ipynb`,
      },
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture6_Phill_Cargile/PyTorch_Autodiff_STIG.pdf`,
      },
    ],
  },
  {
    number: 7,
    title: "JAX",
    speaker: "Phill Cargile",
    affiliation: "Harvard-Smithsonian CfA",
    description:
      "Dive into JAX, Google's high-performance numerical computing library. Learn how JAX combines NumPy-like syntax with automatic differentiation, vectorization, and JIT compilation.",
    topics: [
      "JAX fundamentals and NumPy compatibility",
      "Automatic differentiation with grad, value_and_grad",
      "JIT compilation for performance",
      "Vectorization with vmap and pmap",
      "Functional programming paradigm",
      "Building neural networks with JAX",
    ],
    youtube: "M5MLjRAeoKw",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture7_Phill_Cargile/JAX_STIG.ipynb`,
      },
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture7_Phill_Cargile/JAX_STIG.pdf`,
      },
    ],
  },
  {
    number: 8,
    title: "Inductive Biases",
    speaker: "John Wu",
    affiliation: "STScI",
    description:
      "Understand how different neural network architectures encode different assumptions about data structure. Compare MLPs, CNNs, RNNs, and Transformers through the lens of inductive biases.",
    topics: [
      "What are inductive biases in neural networks",
      "MLPs: independent feature assumption",
      "CNNs: local temporal features and translation invariance",
      "RNNs: sequential dependencies",
      "Transformers: attention and long-range dependencies",
      "Hands-on: transit detection in synthetic light curves",
    ],
    youtube: "z3qqoRzIV3M",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture8_John_Wu/Inductive_Biases_STIG.ipynb`,
      },
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture8_John_Wu/Inductive_Biases_STIG.pdf`,
      },
    ],
  },
  {
    number: 9,
    title: "Convolutional Neural Networks",
    speaker: "John Wu",
    affiliation: "STScI",
    description:
      "Build a CNN to estimate physical properties of galaxies directly from images. Train a model to predict gas-phase metallicity from SDSS galaxy images.",
    topics: [
      "Loading galaxy images as tensors (g, r, i bands)",
      "Building CNNs from scratch in PyTorch",
      "Convolutional layers, pooling, and feature extraction",
      "Training and optimization with gradient descent",
      "Model evaluation and performance analysis",
      "Hands-on: predicting metallicity from SDSS images",
    ],
    youtube: "qsgXNIs2Wzc",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture9_John_Wu/Convolutional_Neural_Networks_STIG.ipynb`,
      },
    ],
  },
  {
    number: 10,
    title: "Graph Neural Networks",
    speaker: "Tri Nguyen",
    affiliation: "Northwestern University",
    description:
      "Learn how to build Graph Neural Networks (GNNs) to work with graph-structured data. Explore node classification on citation networks and apply GNNs to model dark matter subhalo interactions.",
    topics: [
      "Introduction to graph-structured data and GNNs",
      "Node classification with the Cora citation network",
      "Building GNNs with PyTorch Geometric",
      "Graph attention mechanisms and message passing",
      "Application: inferring dark matter subhalo properties from stellar streams",
      "Working with point cloud data in astronomy",
    ],
    youtube: "-J5t3CsgRP8",
    links: [
      {
        label: "View/Download Notebook 1 on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture10_Tri_Nguyen/GNN_Tutorial1_Cora_STIG.ipynb`,
      },
      {
        label: "View/Download Notebook 2 on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture10_Tri_Nguyen/GNN_Tutorial2_Streams_STIG.ipynb`,
      },
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture10_Tri_Nguyen/GNN_Tutorial_STIG.pdf`,
      },
    ],
  },
  {
    number: 11,
    title: "Transformers",
    speaker: "Helen Qu",
    affiliation: "Flatiron Institute",
    description:
      "Build a decoder-only transformer (GPT-style) from scratch in PyTorch. Train it on Tiny Shakespeare for character-level language modeling and generate text.",
    topics: [
      "Self-attention as a learned, data-dependent mixing operator",
      "Causal (masked) self-attention for autoregressive modeling",
      "Building a GPT-style Transformer block from scratch",
      "Token and positional embeddings",
      "Training a small autoregressive language model",
      "Text generation with temperature and top-k sampling",
    ],
    youtube: "GfqGzho22z8",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture11_Helen_Qu/Transformers_STIG.ipynb`,
      },
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture11_Helen_Qu/Transformers_STIG.pdf`,
      },
    ],
  },
  {
    number: 12,
    title: "Recurrent Neural Networks",
    speaker: "Daniel Muthukrishna",
    affiliation: "MIT / Harvard-Smithsonian CfA",
    description:
      "Build Recurrent Neural Networks from first principles and apply them to real-time classification of astronomical transients. Implement vanilla RNNs, LSTMs, and GRUs in PyTorch and train a classifier on supernova light curves.",
    topics: [
      "Motivation: sequential and time-series data in astronomy",
      "Vanilla RNNs: architecture, forward pass, and vanishing gradients",
      "Gated architectures: LSTM and GRU cells",
      "Uni-directional vs. bi-directional RNNs",
      "Building an RNN from scratch in PyTorch",
      "Application: supernova light curve classification with LSTMs",
    ],
    youtube: "Pt3SWhc2hWg",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture12_Daniel_Muthukrishna/RNN_Tutorial_STIG.ipynb`,
      },
    ],
  },
  {
    number: 13,
    title: "Equivariant Neural Networks",
    speaker: "Anna Scaife",
    affiliation: "U. of Manchester",
    description:
      "An introduction to equivariant neural networks, exploring the theoretical foundations of how symmetry constraints can be built directly into neural network architectures for more efficient and physically meaningful learning.",
    topics: [
      "Symmetries and invariances in physics and astronomy",
      "Group theory foundations for neural networks",
      "Equivariant layers and architectures",
      "Translation, rotation, and permutation equivariance",
      "Applications to astronomical data analysis",
    ],
    youtube: "HQwT2WsisAk",
    links: [
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture13_Anna_Scaife/Equivariant_Neural_Networks_STIG.pdf`,
      },
    ],
  },
  {
    number: 14,
    title: "Equivariant Neural Networks (Application)",
    speaker: "Anna Scaife",
    affiliation: "U. of Manchester",
    description:
      "Hands-on applications of equivariant neural networks to astronomical problems, building on the theoretical foundations from the previous lecture to implement symmetry-aware models in PyTorch.",
    topics: [
      "Implementing equivariant architectures in PyTorch",
      "Applying symmetry constraints to astronomical datasets",
      "Performance gains from built-in equivariance",
      "Case studies in astronomy and astrophysics",
      "Best practices and practical considerations",
    ],
    youtube: "6Y4adyDFU6A",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture14_Anna_Scaife/Equivariant_Neural_Networks_Application_STIG.ipynb`,
      },
    ],
  },
  {
    number: 15,
    title: "Normalizing Flows",
    speaker: "Gregory Green",
    affiliation: "Westlake University",
    description:
      "An introduction to normalizing flows for generative modeling, covering the mathematical foundations of invertible transformations and density estimation, with hands-on tutorials implementing RealNVP and flow matching techniques.",
    topics: [
      "Foundations of normalizing flows and change of variables",
      "Invertible transformations and Jacobian determinants",
      "RealNVP: coupling layers and affine transformations",
      "Flow matching: continuous normalizing flows",
      "Applications to density estimation in astronomy",
    ],
    youtube: "8HWQKOJuUkA",
    links: [
      {
        label: "View Slides",
        href: "https://gregreen.github.io/presentations/presentations/normalizing_flows_tutorial_2026y03m.html#/",
      },
      {
        label: "View/Download RealNVP Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture15_Gregory_Green/Normalizing_Flows_RealNVP_STIG.ipynb`,
      },
      {
        label: "View/Download Flow Matching Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture15_Gregory_Green/Normalizing_Flows_Flow_Matching_STIG.ipynb`,
      },
    ],
  },
  {
    number: 16,
    title: "Diffusion Models",
    speaker: "Duo Xu",
    affiliation: "University of Toronto",
    description:
      "An introduction to denoising diffusion probabilistic models (DDPMs) for astronomy, covering the mathematical foundations of forward and reverse diffusion processes, conditional generation of synthetic galaxy images, and image-to-image translation for data restoration.",
    topics: [
      "Motivation: from data-starved to data-dominated astronomy",
      "Generative model landscape: VAEs, GANs, normalizing flows, diffusion, flow matching, and score-based models",
      "Forward and reverse diffusion processes",
      "Conditional DDPMs for synthetic galaxy generation",
      "Image-to-image translation for astronomical data restoration",
    ],
    youtube: "JNHNpjTA0q0",
    links: [
      {
        label: "View/Download Slides on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture16_Duo_Xu/Diffusion_Models_STIG.pdf`,
      },
      {
        label: "View/Download Galaxy Tutorial Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture16_Duo_Xu/Diffusion_Models_Galaxy_Tutorial_STIG.ipynb`,
      },
      {
        label: "View/Download Image-to-Image Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture16_Duo_Xu/Diffusion_Models_Image2Image_STIG.ipynb`,
      },
    ],
  },
  {
    number: 17,
    title: "Flow Matching",
    speaker: "Tomasz Rozanski",
    affiliation: "ANU",
    description:
      "A hands-on tutorial on flow matching for generative modeling in astronomy, covering continuous normalizing flows applied to stellar population modeling with both single and conditional population examples.",
    topics: [
      "Introduction to flow matching and continuous normalizing flows",
      "Vector fields and optimal transport",
      "Single population modeling of stellar properties",
      "Conditional flow matching for population-dependent generation",
      "Applications to isochrone and stellar catalog generation",
    ],
    youtube: "eAiXMEVAMHc",
    links: [
      {
        label: "View/Download Slides (PDF)",
        href: `${GITHUB_BASE}/Resources/Lecture17_Tomasz_Rozanski/Flow_Matching_STIG.pdf`,
      },
      {
        label: "View/Download Single Population Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture17_Tomasz_Rozanski/Flow_Matching_Single_Population_STIG.ipynb`,
      },
      {
        label: "View/Download Conditional Population Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture17_Tomasz_Rozanski/Flow_Matching_Conditional_Population_STIG.ipynb`,
      },
    ],
  },
  {
    number: 18,
    title: "Simulation-Based Inference",
    speaker: "Tomasz Rozanski",
    affiliation: "ANU",
    description:
      "An introduction to simulation-based inference (SBI) for astronomy, using normalizing flows to perform posterior estimation in settings where the likelihood is intractable. Hands-on tutorials cover a toy physics problem and a stellar population application.",
    topics: [
      "Motivation: inference when the likelihood is intractable",
      "Approximate Bayesian computation and its limitations",
      "Neural posterior estimation with normalizing flows",
      "Tutorial: inferring parameters from ball throw observations",
      "Application: SBI for stellar population modeling",
    ],
    youtube: "bArKnWB92o8",
    links: [
      {
        label: "View/Download Slides (PDF)",
        href: `${GITHUB_BASE}/Resources/Lecture18_Tomasz_Rozanski/Simulation_Based_Inference_STIG.pdf`,
      },
      {
        label: "View/Download Ball Throw Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture18_Tomasz_Rozanski/SBI_Ball_Throw_STIG.ipynb`,
      },
      {
        label: "View/Download Stellar Population Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture18_Tomasz_Rozanski/SBI_Stellar_Population_STIG.ipynb`,
      },
    ],
  },
  {
    number: 19,
    title: "AI and Scientific Publishing",
    speaker: "Licia Verde",
    affiliation: "U. of Barcelona/JCAP",
    description:
      "Examine the evolving landscape of scientific publishing in the era of AI. Explore how Large Language Models impact the balance between paper generation and peer review, and the challenges of maintaining quality control.",
    topics: [
      "The evolution and features of academic publishing",
      "Bibliometrics, the 'Publish or Perish' culture, and Goodhart's Law",
      "The impact of LLMs on the volume and quality of submissions",
      "AI 'slop', paper mills, and the effort imbalance in peer review",
      "The future of quality assurance in scientific literature",
    ],
    youtube: "SoBprVD5lEI",
    links: [
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture19_Licia_Verde/AI_and_Scientific_Publishing_STIG.pdf`,
      },
    ],
  },
  {
    number: 20,
    title: "The Meaning of Understanding in AI-Laden Science",
    speaker: "Siyu Yao & André Curtis-Trudel",
    affiliation: "Shanghai Jiao Tong University; U. of Cincinnati",
    description:
      "A philosophical examination of what it means to understand in an era of AI-laden science. Explore the relationship between AI, explanation, and understanding, and consider what scientific pursuits remain worthy in this new landscape.",
    topics: [
      "AI-laden science and the relevance of philosophy",
      "AI, explanation, and understanding",
      "Empirical study of understanding",
      "What's worthy of pursuit now?",
      "Conclusion and discussion",
    ],
    youtube: "ahTP9fDR_0I",
    links: [
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture20_Siyu_Yao_Andre_Curtis-Trudel/The_Meaning_of_Understanding_in_AI_Laden_Science_STIG.pdf`,
      },
    ],
  },
  {
    number: 21,
    title: "NASA ASTRA Initiative",
    speaker: "Peter Kurczynski & Swara Ravindranath",
    affiliation: "NASA GSFC",
    description:
      "ASTRA is an innovative and fast-developing initiative to encourage new astrophysics mission concepts for consideration by NASA. Artificial Intelligence will have increasing impact on NASA astrophysics. Learn how you can become involved. This will be a brief presentation followed by discussion and Q&A.",
    topics: [
      "The ASTRA initiative: goals and scope",
      "New astrophysics mission concepts for NASA",
      "AI's growing role in NASA astrophysics",
      "Community engagement and involvement opportunities",
      "Open discussion and Q&A",
    ],
    youtube: "LsOPVqgf7Nw",
    links: [
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture21_Peter_Kurczynski_Swara_Ravindranath/ASTRA_Intro_STIG.pdf`,
      },
      {
        label: "ASTRA Initiative Homepage",
        href: "https://science.nasa.gov/astrophysics/programs/cosmic-origins/studies/astra-initiative/",
      },
      {
        label: "Mission Concepts (PDF)",
        href: "https://assets.science.nasa.gov/content/dam/science/astro/documents/ASTRA_Web_Update_2026-03-25.pdf",
      },
      {
        label: "Ad ASTRA Community Workshop (Sept 2026)",
        href: "https://conference.ipac.caltech.edu/community2026/",
      },
    ],
  },
  {
    number: 22,
    title: "Reinforcement Learning Fundamentals",
    speaker: "Carol Cuesta-Lazaro",
    affiliation: "Institute for Advanced Study at Princeton / Flatiron Institute",
    description:
      "An introduction to reinforcement learning from its classical foundations to its central role in modern large language models. Trace the arc from TD-Gammon and AlphaGo through DQN and multi-agent emergent behavior to RLHF and RLVR, and learn how policy gradients turn a non-differentiable reward signal into a usable training objective.",
    topics: [
      "A brief history of RL: TD-Gammon, AlphaGo, DQN, RLHF, and RLVR",
      "The agent-environment loop: states, actions, policies, and rewards",
      "How RL differs from supervised learning: shifting data, exploration vs. exploitation, evaluative and delayed rewards",
      "The non-differentiability of the learning problem and policy gradients",
      "The REINFORCE estimator, baselines, and reward-to-go for variance reduction",
      "Reinforcement Learning from Human Feedback (RLHF) for instruction-tuned models",
      "Reinforcement Learning from Verifiable Rewards (RLVR) and reasoning in LLMs",
      "Open questions: is RL teaching new capabilities or sharpening existing ones?",
    ],
    youtube: "lrAt3rPPznI",
    links: [
      {
        label: "View Slides (PDF)",
        href: `${BASE_PATH}/Resources/Lecture22_Carol_Cuesta-Lazaro/Reinforcement_Learning_Fundamentals_STIG.pdf`,
      },
      {
        label: "View Handwritten Notes (PDF)",
        href: `${BASE_PATH}/Resources/Lecture22_Carol_Cuesta-Lazaro/Reinforcement_Learning_Fundamentals_Notes_STIG.pdf`,
      },
    ],
  },
  {
    number: 23,
    title: "Reinforcement Learning Applications",
    speaker: "Carol Cuesta-Lazaro",
    affiliation: "Institute for Advanced Study at Princeton / Flatiron Institute",
    description:
      "A hands-on reinforcement learning tutorial that builds policy-gradient methods from scratch with LunarLander as the running environment, progressing from vanilla REINFORCE to variance-reduced policy gradients and actor-critic learning.",
    topics: [
      "Using LunarLander to connect the agent-environment loop to code",
      "Implementing a policy network and sampling actions with PyTorch",
      "Training vanilla REINFORCE from trajectory-level returns",
      "Reducing variance with reward-to-go, discounting, and normalized advantages",
      "Building actor-critic methods with a learned value-function baseline",
      "Comparing learning curves across REINFORCE, improved REINFORCE, and actor-critic",
    ],
    youtube: "lDphCPxn1BE",
    links: [
      {
        label: "View/Download Notebook on GitHub",
        href: `${GITHUB_BASE}/Resources/Lecture23_Carol_Cuesta-Lazaro/Reinforcement_Learning_from_Scratch_STIG.ipynb`,
      },
    ],
  },
  {
    number: 24,
    title: "From Text to Spaceship",
    speaker: "Ryan McClelland",
    affiliation: "NASA GSFC",
    description:
      "An exploration of how AI is reshaping spacecraft design — using generative design and agentic workflows to translate text-based science objectives into optimized flight hardware, compressing structural design timelines from months to days through a secure, cloud-deployed ecosystem of AI tools that spans concept, analysis, and manufacturing.",
    topics: [
      "AI-driven generative design for spaceflight structures",
      "From language-defined requirements to mission design",
      "Agentic workflows linking concept, analysis, and manufacturing",
      "Cloud-deployed AI tool ecosystems for engineering",
      "Examples from Hubble, ISS, and payload hardware",
    ],
    youtube: "xj4Irl3OFt8",
    links: [
      {
        label: "Davinci by Celedon Solutions (AI engineering platform)",
        href: "https://celedon.solutions/davinci/",
      },
      {
        label: "Synera (agentic AI for engineering workflows)",
        href: "https://www.synera.io/",
      },
    ],
  },
];

interface ScheduleRow {
  week: number;
  date: string;
  topic: string;
  speaker: string;
}

interface ModuleHeader {
  module: string;
}

type ScheduleEntry = ScheduleRow | ModuleHeader;

const schedule: ScheduleEntry[] = [
  { week: 1, date: "Nov 3", topic: "Overview", speaker: "Jesse Thaler, MIT" },
  { module: "Module 1: Large Language Models as Autonomous Agents" },
  { week: 2, date: "Nov 10", topic: "LLM API Basics", speaker: "Yuan-Sen Ting, OSU" },
  { week: 3, date: "Nov 17", topic: "RAG & Function Tools", speaker: "Yuan-Sen Ting, OSU" },
  { week: 4, date: "Nov 24", topic: "LLM as Agent", speaker: "Francisco Villaescusa-Navarro, Flatiron" },
  { week: 5, date: "Dec 8", topic: "Model Context Protocol (MCP)", speaker: "Yuan-Sen Ting, OSU" },
  { module: "Module 2: Deep Learning Frameworks" },
  { week: 6, date: "Dec 15", topic: "PyTorch and Autodifferentiation", speaker: "Phill Cargile, Harvard-Smithsonian" },
  { week: 7, date: "Dec 22", topic: "JAX", speaker: "Phill Cargile, Harvard-Smithsonian" },
  { module: "Module 3: Neural Network Basics" },
  { week: 8, date: "Jan 12", topic: "Inductive Biases", speaker: "John Wu, STScI" },
  { week: 9, date: "Jan 26", topic: "Convolutional Neural Networks (CNNs)", speaker: "John Wu, STScI" },
  { week: 10, date: "Feb 2", topic: "Graph Neural Networks (GNNs)", speaker: "Tri Nguyen, Northwestern" },
  { week: 11, date: "Feb 9", topic: "Transformers", speaker: "Helen Qu, Flatiron" },
  { week: 12, date: "Feb 23", topic: "Recurrent Neural Networks (RNNs)", speaker: "Daniel Muthukrishna, Harvard/MIT" },
  { module: "Module 4: Physics-Inspired Networks" },
  { week: 13, date: "Mar 2", topic: "Equivariant Neural Networks (Theory)", speaker: "Anna Scaife, U. of Manchester" },
  { week: 14, date: "Mar 9", topic: "Equivariant Neural Networks (Application)", speaker: "Anna Scaife, U. of Manchester" },
  { module: "Module 5: Generative Models" },
  { week: 15, date: "Mar 16", topic: "Normalizing Flows", speaker: "Gregory Green, Westlake" },
  { week: 16, date: "Mar 23", topic: "Diffusion Models", speaker: "Duo Xu, U. of Toronto" },
  { week: 17, date: "Mar 30", topic: "Flow Matching", speaker: "Tomasz Rozanski, ANU" },
  { week: 18, date: "Apr 6", topic: "Simulation-Based Inference", speaker: "Tomasz Rozanski, ANU" },
  { module: "Module 6: Ethics and Philosophy of Science" },
  { week: 19, date: "Apr 13", topic: "AI and Scientific Publishing", speaker: "Licia Verde, U. of Barcelona/JCAP" },
  { week: 20, date: "Apr 27", topic: "The Meaning of Understanding in AI-Laden Science", speaker: "Siyu Yao, SJTU & André Curtis-Trudel, U. Cincinnati" },
  { module: "Module 7: Opportunities at NASA" },
  { week: 21, date: "May 4", topic: "NASA ASTRA Initiative", speaker: "Peter Kurczynski & Swara Ravindranath, NASA GSFC" },
  { module: "Module 8: Reinforcement Learning" },
  { week: 22, date: "May 11", topic: "Reinforcement Learning Fundamentals", speaker: "Carol Cuesta-Lazaro, IAS/Flatiron" },
  { week: 23, date: "May 18", topic: "Reinforcement Learning Applications", speaker: "Carol Cuesta-Lazaro, IAS/Flatiron" },
  { module: "Module 9: Agentic Workflows for Instrumentation Design" },
  { week: 24, date: "Jun 1", topic: "From Text to Spaceship", speaker: "Ryan McClelland, NASA GSFC" },
];

const leadership = [
  { name: "Yuan-Sen Ting", affiliation: "The Ohio State University", chair: true },
  { name: "Digvijay Wadekar", affiliation: "University of Texas at Austin", chair: true },
  { name: "Andrew Saydjari", affiliation: "Princeton University", chair: false },
  { name: "Alex Gagliano", affiliation: "MIT", chair: false },
  { name: "Carol Cuesta-Lazaro", affiliation: "Institute for Advanced Study at Princeton/Flatiron Institute", chair: false },
  { name: "Georgios Valogiannis", affiliation: "University of Chicago", chair: false },
  { name: "Siddharth Mishra-Sharma", affiliation: "Boston University", chair: false },
];

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function isModuleHeader(entry: ScheduleEntry): entry is ModuleHeader {
  return "module" in entry;
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "about" },
    { label: "Schedule", href: "schedule" },
    { label: "Leadership", href: "leadership" },
    { label: "Participate", href: "participate" },
    { label: "Resources", href: "resources" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="font-semibold text-lg text-white tracking-tight">
            NASA AI/ML STIG
          </span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="text-sm font-medium px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-md border-t border-slate-800">
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-400 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-block mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
            NASA Cosmic Origins Program
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          AI/ML Science &amp; Technology
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Interest Group
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Building AI literacy for astronomical research through stackable,
          bite-sized modular training designed for the astronomy community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#schedule"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            View Lecture Schedule
          </a>
          <a
            href="#participate"
            className="px-8 py-4 border border-slate-700 text-white font-semibold rounded-full hover:bg-white/5 hover:border-slate-600 transition-all"
          >
            Join the Community
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About Section                                                      */
/* ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            About the STIG
          </h2>
        </div>
        <div className="space-y-6">
          <p className="text-lg text-slate-400 leading-relaxed">
            The NASA Cosmic Origins Program AI/ML Science and Technology
            Interest Group (AI/ML STIG) addresses the critical need to upskill
            the astronomy community with AI literacy. We provide structured,
            domain-specific AI education through stackable, bite-sized modular
            training designed for astronomical research contexts.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            Established under the Cosmic Origins Program Analysis Group
            (COPAG), the STIG brings together researchers and educators to
            build a comprehensive AI education framework tailored for the
            astronomy community.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            { label: "24", sub: "Total Sessions" },
            { label: "9", sub: "Modules" },
            { label: "Open", sub: "To Everyone" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.label}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Expanded Lecture Detail (inline in schedule)                        */
/* ------------------------------------------------------------------ */

function LectureDetail({ lecture, onClose }: { lecture: Lecture; onClose: () => void }) {
  return (
    <tr>
      <td colSpan={4} className="p-0">
        <div className="bg-slate-900/80 border-x border-b border-blue-500/30 mx-0">
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="p-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{lecture.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Collapse"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed mb-5">{lecture.description}</p>

            {/* Two-column: video + topics */}
            <div className="grid lg:grid-cols-2 gap-6 mb-5">
              {lecture.youtube && (
                <div className="rounded-xl overflow-hidden border border-slate-800">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${lecture.youtube}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Topics Covered
                </h4>
                <ul className="space-y-1.5">
                  {lecture.topics.map((t, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2">
              {lecture.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Attribution */}
            {lecture.attribution && (
              <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-800 italic">
                Adapted from{" "}
                <a href={lecture.attribution.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                  {lecture.attribution.text}
                </a>
                .{" "}
                {lecture.attribution.doi && (
                  <>
                    Ting, Y.-S. (2025). <em>Coding Essentials for Astronomers</em>. Zenodo.{" "}
                    <a href={lecture.attribution.doi.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                      {lecture.attribution.doi.label}
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Schedule + Lectures (unified)                                      */
/* ------------------------------------------------------------------ */

function ScheduleSection() {
  const [expandedLecture, setExpandedLecture] = useState<number | null>(null);
  const lectureMap = new Map(lectures.map((l) => [l.number, l]));

  return (
    <section id="schedule" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Lecture Series
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Program Schedule
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A 24-session open-source lecture series across 9 modules.
            Click any row with a
            <span className="inline-flex items-center gap-1 mx-1 text-[11px] font-medium text-blue-400/70 bg-blue-500/8 border border-blue-500/15 px-2 py-0.5 rounded-full align-middle">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              Video &amp; Materials
            </span>
            badge to expand recordings, notebooks, and slides.
          </p>
        </div>

        {/* Info box */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Duration", value: "24 sessions (Nov 2025 - Jun 2026)" },
              { label: "Format", value: "Weekly lectures plus focused module talks" },
              { label: "Time", value: "Mondays at 4:00 PM ET" },
              { label: "Delivery", value: "Remote only" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-slate-300">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-slate-800">
            <a
              href="https://science.nasa.gov/astrophysics/programs/cosmic-origins/community/artificial-intelligence-machine-learning-science-technology-interest-group-ai-ml-stig/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-500/25 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all group"
            >
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <div>
                <div className="text-sm font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                  Join the Weekly Meeting
                </div>
                <div className="text-xs text-slate-500">
                  Meeting link on the NASA AI/ML STIG Official Page
                </div>
              </div>
              <svg className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Schedule table with expandable lecture details */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-slate-800">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-blue-300 px-6 py-4 w-16">
                    Week
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-blue-300 px-6 py-4 w-24">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-blue-300 px-6 py-4">
                    Topic
                  </th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-blue-300 px-6 py-4">
                    Speaker
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((entry, i) => {
                  if (isModuleHeader(entry)) {
                    return (
                      <tr key={`mod-${i}`} className="bg-slate-800/40">
                        <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-blue-400">
                          {entry.module}
                        </td>
                      </tr>
                    );
                  }

                  const lecture = lectureMap.get(entry.week);
                  const hasMaterials = !!lecture;
                  const isExpanded = expandedLecture === entry.week;

                  return (
                    <React.Fragment key={`row-${i}`}>
                      <tr
                        onClick={hasMaterials ? () => setExpandedLecture(isExpanded ? null : entry.week) : undefined}
                        className={`border-t border-slate-800/50 transition-colors ${
                          hasMaterials
                            ? "cursor-pointer hover:bg-blue-500/5 group"
                            : ""
                        } ${isExpanded ? "bg-blue-500/5" : ""}`}
                      >
                        <td className="px-6 py-3.5 text-sm text-slate-500 font-mono">
                          {entry.week}
                        </td>
                        <td className="px-6 py-3.5 text-sm text-slate-400">
                          {entry.date}
                        </td>
                        <td className="px-6 py-3.5 text-sm">
                          <div className="flex items-center gap-3">
                            <span className={`${hasMaterials ? "text-slate-200 group-hover:text-blue-300" : "text-slate-400"} transition-colors`}>
                              {entry.topic}
                            </span>
                            {hasMaterials && !isExpanded && (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-400/70 group-hover:text-blue-400 bg-blue-500/8 group-hover:bg-blue-500/15 border border-blue-500/15 group-hover:border-blue-500/30 px-2.5 py-0.5 rounded-full transition-all whitespace-nowrap">
                                {lecture.youtube ? (
                                  <>
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Video &amp; Materials
                                  </>
                                ) : (
                                  "Materials"
                                )}
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </span>
                            )}
                            {isExpanded && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 bg-blue-500/15 border border-blue-500/30 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                                Collapse
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-sm text-slate-500">
                          {entry.speaker}
                        </td>
                      </tr>
                      {isExpanded && lecture && (
                        <LectureDetail
                          lecture={lecture}
                          onClose={() => setExpandedLecture(null)}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Leadership Section                                                 */
/* ------------------------------------------------------------------ */

function LeadershipSection() {
  return (
    <section id="leadership" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Leadership Council
          </h2>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl divide-y divide-slate-800">
          {leadership.map((person, i) => (
            <div key={i} className="px-6 py-4 flex items-baseline justify-between gap-4 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-white">{person.name}</span>
                {person.chair && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                    (Co-Chair)
                  </span>
                )}
              </div>
              <span className="text-sm text-slate-500">{person.affiliation}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-600 mt-8">
          For inquiries, please contact:{" "}
          <a href="mailto:ting.74@osu.edu" className="text-blue-400 hover:text-blue-300">
            ting.74@osu.edu
          </a>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Participate Section                                                */
/* ------------------------------------------------------------------ */

function ParticipateSection() {
  return (
    <section id="participate" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Join Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            How to Participate
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Membership</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              The AI/ML STIG is open to the national and international
              community without regard to institutional affiliation, education,
              or career status. We welcome astronomers, astrophysicists, data
              scientists, and anyone interested in AI applications in astronomy.
            </p>
            <a
              href="mailto:AI-ML-STIG-join@lists.nasa.gov?subject=Join"
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Join Mailing List
            </a>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Recordings</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              All lecture recordings are hosted on the NASA Cosmic Origins
              Program subpage, making them accessible to the broader community
              for asynchronous learning. Past lectures include YouTube
              recordings embedded directly in each lecture card above.
            </p>
            <a
              href="https://science.nasa.gov/astrophysics/programs/cosmic-origins/community/artificial-intelligence-machine-learning-science-technology-interest-group-ai-ml-stig/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              NASA Official Page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Resources Section                                                  */
/* ------------------------------------------------------------------ */

function ResourcesSection() {
  const resources = [
    {
      title: "GitHub Repository",
      description: "Access all tutorial materials, code examples, and documentation.",
      href: "https://github.com/tingyuansen/NASA_AI_ML_STIG",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      title: "Community White Paper",
      description: "Read our comprehensive white paper on AI literacy in astronomy.",
      href: "https://arxiv.org/abs/2509.02661",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Cosmic Origins Program",
      description: "Learn more about NASA's Cosmic Origins Program.",
      href: "https://cor.gsfc.nasa.gov/",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="resources" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            Links
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            Resources
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <a
              key={i}
              href={res.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                {res.icon}
              </div>
              <h3 className="font-bold text-white mb-2">{res.title}</h3>
              <p className="text-sm text-slate-500">{res.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-semibold text-white">NASA AI/ML STIG</span>
          </div>

          <p className="text-sm text-slate-600">
            &copy; 2026 NASA Cosmic Origins AI/ML Science and Technology Interest Group
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/tingyuansen/NASA_AI_ML_STIG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://cor.gsfc.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              COR
            </a>
            <a
              href="mailto:ting.74@osu.edu"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <LeadershipSection />
      <ParticipateSection />
      <ResourcesSection />
      <Footer />
    </main>
  );
}
