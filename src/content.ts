export type Era = {
  id: string;
  year: string;
  title: string;
  short: string;
  summary: string;
  highlights: string[];
  tech: string[];
  reward: string;
};

export const eras: Era[] = [
  {
    id: "2019-20",
    year: "2019–20",
    title: "The Workshop",
    short: "ECE, C, robots and the first real spark.",
    summary: "College started with Electronics & Communication Engineering, but the interesting part quickly became the moment code made physical things react.",
    highlights: [
      "First programming language: C — started with Fibonacci and factorial and became fascinated by how decisions in code become visible output.",
      "Built a smart obstacle-avoiding vehicle with Arduino, ultrasonic sensing, a servo and motor driver; won 2nd place at a college fest.",
      "Built the IBM Watson mall chatbot 'Mike'; reached the top 8 and later won 1st place at the college fest.",
      "Started a BB-8-inspired robot. The spherical body was completed before lockdown paused the build."
    ],
    tech: ["C", "Arduino", "IBM Watson", "Python", "Robotics", "IoT"],
    reward: "THE BUILDER — first principles unlocked"
  },
  {
    id: "2021-22",
    year: "2021–22",
    title: "The Competition Floor",
    short: "Apps, robotics competitions and a national hackathon.",
    summary: "The experiments became more ambitious: software products on one side, hardware competitions on the other.",
    highlights: [
      "Built a React Native daily-sales/group-chat app and deployed it to the Play Store.",
      "Built a snake-inspired robotics prototype for a military-use problem statement and won the competition.",
      "Joined a Smart India Hackathon 2022 Software Edition team after a late team change and built an authentication-focused embedded system with Raspberry Pi and fingerprint scanning.",
      "Won 1st place at Smart India Hackathon 2022."
    ],
    tech: ["React Native", "Python", "Raspberry Pi", "Arduino", "Firebase", "Embedded Systems"],
    reward: "THE COMPETITOR — pressure-tested"
  },
  {
    id: "2023-24",
    year: "2023–24",
    title: "The Product Floor",
    short: "Startups, Flutter, cloud and production software.",
    summary: "The path moved from college prototypes into real users, startup constraints and enterprise engineering.",
    highlights: [
      "Founding-stage work at Shopperr.AI: React Native → Flutter, app prototypes, API integration and exposure to TensorFlow/datasets.",
      "Cloud-computing internship covering Java, MySQL, Terraform and AWS concepts.",
      "Joined Cognizant in December 2023; trained in C#, .NET and SQL Server before moving into production work.",
      "Started solving real production bugs, automation problems, authentication/directory integrations and modernization work."
    ],
    tech: ["Flutter", "C#/.NET", "SQL Server", "Terraform", "AWS", "TensorFlow"],
    reward: "THE ENGINEER — production unlocked"
  },
  {
    id: "2025-26",
    year: "2025–26",
    title: "The Freelance Lab",
    short: "Products shipped, systems automated and AI exploration.",
    summary: "Freelance work became a second engineering track alongside enterprise software: mobile apps, Firebase systems, hiring platforms and salon POS software.",
    highlights: [
      "Built and shipped client-facing Flutter/React Native products including PRP and Docaraj.",
      "Worked on Salon Shastra, a salon hiring platform with 1,000+ active users.",
      "Worked with a team on ChairPe salon POS, solving bugs and supervising delivery across web/mobile work.",
      "Expanded into AI/LLM systems, agents, RAG and local-model experimentation."
    ],
    tech: ["Flutter", "React", "React Native", "Firebase", "Supabase", "AI/LLMs"],
    reward: "THE SHIPPER — products in the wild"
  },
  {
    id: "future",
    year: "NEXT",
    title: "The Unbuilt Room",
    short: "Backend + Cloud + AI — still under construction.",
    summary: "The next room is deliberately unfinished. It represents the direction: stronger backend systems, cloud architecture and useful AI products.",
    highlights: [
      "Deepen backend engineering with APIs, distributed systems and system design.",
      "Build practical AI products instead of stopping at demos: agents, RAG, evaluation and model-backed workflows.",
      "Explore stronger cloud, Docker/Kubernetes and production infrastructure skills.",
      "Keep building projects that connect software with the physical world."
    ],
    tech: ["Backend", "Cloud", "Docker", "Kubernetes", "AI Agents", "LLMs"],
    reward: "THE NEXT BUILD — claim it by shipping"
  }
];

export const professional = {
  headline: "Software engineer who likes building things that actually do something.",
  summary: "3+ years across enterprise engineering, freelance products, mobile/web development, automation and hands-on hardware. Currently moving deeper into backend, cloud and AI.",
  skills: ["C#/.NET", "Python", "TypeScript", "React", "React Native", "Flutter", "Node.js", "SQL", "Firebase", "AWS", "Terraform", "TensorFlow", "GenAI"],
  experience: [
    { role: "Cognizant", period: "Dec 2023 — Present", text: "Production engineering, automation, .NET/SQL systems, integrations, modernization and GenAI-assisted workflows." },
    { role: "Shopperr.AI", period: "Nov 2022 — Nov 2023", text: "Founding-stage product work across Flutter/React Native, APIs and AI/ML experiments." },
    { role: "Freelance / Product Work", period: "2021 — Present", text: "Mobile/web products including Daily Sales, Docaraj, PRP, Salon Shastra and ChairPe." }
  ]
};
