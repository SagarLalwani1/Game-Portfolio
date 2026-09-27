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
      "Built and deployed a React Native/Firebase retail POS and group-based workflow through Google Play Console.",
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
      "Shopperr.AI: early engineering work across Flutter, Firebase, Node.js, APIs and machine-learning experimentation with TensorFlow/Keras.",
      "LTIMindtree cloud internship: hands-on work with AWS and Terraform / infrastructure-as-code.",
      "Joined Cognizant in December 2023 and moved from C#/.NET and SQL Server training into production engineering.",
      "Started solving production bugs, automation problems, authentication/directory integrations, modernization and GenAI/chatbot workflows."
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
      "Built and shipped client-facing Flutter/React Native products including PRP and other production applications.",
      "Built across React, Next.js, React Native, Flutter, Node.js, Firebase and Supabase, including authentication, Cloud Functions, webhooks and third-party integrations.",
      "Worked on Salon Shastra, a salon hiring platform with 1,000+ active users, and contributed to ChairPe salon POS with a small engineering team.",
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
  headline: "Software engineer who builds products, automation and systems that actually ship.",
  summary: "Software Engineer with 3+ years across enterprise engineering, freelance products and startup development. Experienced with backend, cloud, mobile/web, automation and AI/ML — currently moving deeper into backend, cloud and AI.",
  skills: ["C#/.NET", "Python", "TypeScript", "JavaScript", "SQL", "Dart", ".NET", "FastAPI", "Node.js", "REST APIs", "AWS", "GCP", "Firebase", "Terraform", "Docker", "Linux", "SQL Server", "PostgreSQL", "Firestore", "Supabase", "React", "Next.js", "React Native", "Flutter", "Generative AI", "TensorFlow", "Keras", "Automation", "SDLC", "CI/CD"],
  experience: [
    { company: "Cognizant Technology Solutions", role: "Software Engineer (Associate)", period: "Dec 2023 — Present", text: "Enterprise applications with C#/.NET, SQL Server and REST APIs across development, debugging, testing and production support. Automated a workflow from ~1–2 weeks to ~10 hours, reduced downstream processing from ~40,000 to <10,000 records/day, and resolved a production email failure that had remained unresolved for 6+ months." },
    { company: "Freelance Software Engineer", role: "Software Engineer", period: "2021 — Present", text: "Designed, developed and deployed production web/mobile applications across React, Next.js, React Native, Flutter, Node.js, Firebase and Supabase; handled APIs, databases, cloud services, authentication, webhooks, integrations and release support." },
    { company: "Shopperr.AI", role: "Software Engineer — Backend, Mobile & AI", period: "Nov 2022 — Nov 2023", text: "Early engineering team member working across Flutter, Firebase, Node.js and machine-learning technologies, including mobile features, backend workflows, APIs and TensorFlow/Keras experimentation." },
    { company: "LTIMindtree", role: "Cloud Computing Intern", period: "Mar 2023 — May 2023", text: "Worked with AWS and Terraform, gaining hands-on experience with cloud infrastructure and infrastructure-as-code." }
  ],
  projects: [
    { name: "PRP", label: "Vehicle QR & Communication Platform", year: "2026", text: "Production Flutter/Firebase platform with QR scanning, authentication, claims, checkout and sticker workflows; Cloud Functions with Exotel and Razorpay APIs/webhooks.", tags: ["Flutter", "Firebase", "Cloud Functions", "APIs"] },
    { name: "ChairPe", label: "Salon POS Platform", year: "2026", text: "Production React/React Native/Supabase salon billing and POS platform used by multiple salons, collaborating with a small engineering team.", tags: ["React", "React Native", "Supabase"] },
    { name: "Daily Sales", label: "Retail POS App", year: "2021", text: "React Native/Firebase Android application with authentication and group-based workflows, published through Google Play Console.", tags: ["React Native", "Firebase", "Android"] }
  ],
  impact: [
    { value: "~10 hrs", label: "automation execution time", detail: "from a manual workflow that previously required ~1–2 weeks" },
    { value: "<10k/day", label: "downstream records", detail: "from a workflow involving ~40,000 records/day" },
    { value: "6+ mo", label: "production issue resolved", detail: "email delivery failure investigated to root cause and fixed" },
    { value: "3+ yrs", label: "professional experience", detail: "enterprise, startup and freelance product engineering" }
  ]
};
