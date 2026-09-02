// ============================================================================
// Portfolio Data — Replace placeholder values with real information
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  images: string[]; // 1–3 showcase images (paths relative to /public)
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Principle {
  title: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface CommunityItem {
  title: string;
  description: string;
  category: string;
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Miracle Sumajow",
  title: "Software Developer",
  subtitle: "Building reliable and enjoyable software experiences.",
  location: "Kota Manado, Indonesia",
  bio: 
"I'm a Software Developer and Informatics Engineering graduate who enjoys turning requirements into practical software solutions." + "\n\n" +

"My experience spans backend development, web applications, mobile applications, and application development. I have worked with technologies such as Golang, NestJS, Laravel, Next.js, PostgreSQL, Flutter, Kotlin, and Unity, with a particular interest in building APIs, working with databases, and developing structured and maintainable software." + "\n\n" +

"Beyond development, I've worked in collaborative development teams, mentored junior developers, assisted in teaching database and programming courses, and coordinated technical learning programs.",
  email: "miraclesumajow32@gmail.com",
  github: "https://github.com/reyimanuel",
  linkedin: "https://linkedin.com/in/miraclesumajow",
  resume: "/cv-miraclesumajow.pdf",
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 1,
    title: "Report Formatter",
    category: "Template-Based Document Generation",
    description:
      "An academic writing platform that automatically formats theses and research papers according to institutional standards, freeing writers to focus entirely on their work.",
    technologies: ["Golang", "PostgreSQL", "LaTeX", "Next.js", "Docker", "REST API"],
    images: [
      "/projects/report-formatter 1.png",
      "/projects/report-formatter 2.png",
      "/projects/report-formatter 3.png",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "SPARK",
    category: "Chatbot for Information Retrieval",
    description:
      "An intelligent chatbot that enables natural language information retrieval from structured databases. Users ask questions conversationally and receive instant, contextual answers without navigating complex interfaces.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "REST API"],
    images: [
      "/projects/spark 1.png",
      "/projects/spark 2.png",
      "/projects/spark 3.png",
    ],
  },
  {
    id: 3,
    title: "E-Voting",
    category: "Real-Time Voting Platform",
    description:
      "A digital voting platform that makes organizational elections accessible and straightforward. Delivers a clear, reliable user experience with consistent interface design across all voting scenarios, removing barriers to participation.",
    technologies: ["Golang", "Next.js", "PostgreSQL", "REST API"],
    images: [
      "/projects/e-voting 1.png",
      "/projects/e-voting 2.png",
      "/projects/e-voting 3.png",
      "/projects/e-voting 4.png",
    ],
  },
  {
    id: 4,
    title: "Suluun Tiga",
    category: "Village Website",
    description:
      "A village information system that gives residents and tourists access to local data, services, and community resources in one place.",
    technologies: ["Next.js", "Git", "React", "TypeScript"],
    images: [
      "/projects/suluun-tiga 1.png",
      "/projects/suluun-tiga 2.png",
      "/projects/suluun-tiga 3.png",
    ],
  },
    {
    id: 5,
    title: "Leilem Tiga",
    category: "Village Website",
    description:
      "A comprehensive information system for a rural village, providing residents and touristswith access to local data, services, and community resources.",
    technologies: ["Next.js", "Git", "React", "TypeScript"],
    images: [
      "/projects/leilem-tiga 1.png",
      "/projects/leilem-tiga 2.png",
      "/projects/leilem-tiga 3.png",
    ],
  },
      {
    id: 6,
    title: "Paroki Bunda Teresa dari Calcutta",
    category: "Church Website",
    description:
      "A church information system that provides parishioners and visitors with access to local data, services, and community resources in one place.",
    technologies: ["Next.js", "Git", "React", "TypeScript"],
    images: [
      "/projects/paroki-bunda-teresa 1.png",
      "/projects/paroki-bunda-teresa 2.png",
      "/projects/paroki-bunda-teresa 3.png",
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experiences: Experience[] = [
  {
    role: "Senior Backend Developer Unity Project Team E-Voting",
    organization: "UNSRAT IT Community",
    period: "2026",
    description:
      "Contributed to the development of the E-Voting application in a backend team with one senior and two junior developers. Coordinated task discussions and development work, while mentoring junior developers and guiding them in backend development, project workflows, and business processes.",
    responsibilities: [
      "Coordinated backend development tasks and discussions with the team to ensure smooth progress and alignment with project goals.",
      "Mentored junior developers, providing guidance on backend development best practices, project workflows, and business processes.",
      "Reviewed code contributions from junior developers, providing constructive feedback and suggestions for improvement.",
      "Assisted in the design and implementation of backend features, ensuring they met project requirements and adhered to best practices.",
      "Collaborated with other team members to troubleshoot issues, optimize performance, and ensure the overall quality of the application.",
    ],
    technologies: ["Golang", "PostgreSQL", "REST API","JWT"],
  },
  {
    role: "Backend Developer Unity Project Team Beyond Unity",
    organization: "UNSRAT IT Community x Renify",
    period: "2025",
    description:
      "Continued development of Report Formatter by implementing endpoints for chapters, subchapters, subpoints, image management, and file downloads. Refactored existing APIs, standardized API responses, strengthened API security, and maintained clean, structured, and maintainable code.",
    responsibilities: [
      "Implemented new backend endpoints for chapters, subchapters, subpoints, image management, and file downloads.",
      "Refactored existing APIs to improve code structure, maintainability, and performance.",
      "Standardized API responses and payload structures for consistency across the application.",
      "Strengthened API security by implementing authentication, authorization, and input validation.",
      "Maintained clean, structured, and maintainable code to facilitate future development and collaboration.",
    ],
    technologies: ["Golang", "Next.js", "PostgreSQL", "LaTeX", "REST API"],
  },
    {
    role: "Backend Developer Cross Engineering Team TECHOFEST Grand Project",
    organization: "UNSRAT IT Community",
    period: "2024",
    description:
      "Contributed to Report Formatter and Spark by developing backend services with Golang and NestJS, building REST API endpoints, and creating OpenAPI documentation for the Report Formatter API as part of a team workflow.",
    responsibilities: [
      "Served as a backup backend developer, supporting the team with backend responsibilities when needed.",
      "Participated in daily Scrum meetings and attended sprint planning and sprint review sessions.",
      "Focused on maintaining API responses and payload structures to ensure consistency and reliability.",
      "Contributed to API documentation to keep endpoints clear and easy to understand for the team and consumers.",
    ],
    technologies: ["NestJS", "Golang", "PostgreSQL", "REST API", "Swagger / OpenAPI"],
  },
  {
    role: "Backend Developer Web-Dev.XML",
    organization: "UNSRAT IT Community",
    period: "2024",
    description:
      "Contributed to the development of a web-based information system for a university community. Focused on backend services, database design, and API development.",
    responsibilities: [
      "Facilitated daily Scrum meetings to share progress, discuss blockers, and align priorities with the team.",
      "Participated in sprint planning and sprint review sessions to support project delivery and team coordination.",
      "Developed backend endpoints and API logic to support application features and business requirements.",
      "Maintained code readability and structure by writing organized, maintainable code and improving implementation consistency.",
      "Discussed system flow and logic with other developers to align technical decisions and improve overall implementation quality.",
    ],
    technologies: ["Laravel", "PostgreSQL", "Docker", "REST API", "JWT"],
  },
];

// ---------------------------------------------------------------------------
// Engineering Principles
// ---------------------------------------------------------------------------

export const principles: Principle[] = [
  {
    title: "API Design",
    description:
      "Design APIs around clear contracts and predictable responses. Favor consistency, proper status codes, and self-documenting endpoints.",
  },
  {
    title: "Maintainability",
    description:
      "Prefer structured and readable code that can evolve over time. Optimize for the next person reading it, including future self.",
  },
  {
    title: "Security",
    description:
      "Treat authentication, authorization, and input validation as core requirements—not afterthoughts bolted on before deployment.",
  },
  {
    title: "Collaboration",
    description:
      "Use clear task management, documentation, code discussion, and iterative development. Good software is built by teams, not heroes.",
  },
  {
    title: "Problem Decomposition",
    description:
      "Break complex requirements into smaller, testable components. Ship iteratively. Validate assumptions before scaling solutions.",
  },
  {
    title: "Observability",
    description:
      "Build systems that explain themselves. Structured logging, meaningful error messages, and clear operational boundaries.",
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills: SkillCategory[] = [
  {
    category: "Backend",
    items: ["Golang", "NestJS", "Laravel"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MariaDB"],
  },
  {
    category: "API / Architecture",
    items: ["REST API", "OpenAPI / Swagger", "JWT", "WebSocket"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Git", "GitHub", "GitLab", "CI/CD"],
  },
  {
    category: "Other",
    items: ["Firebase", "LaTeX", "PWA / TWA", "Flutter", "Kotlin"],
  },
];

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export const metrics: Metric[] = [
  { value: "02+", label: "Projects Shipped" },
  { value: "02+", label: "Years Building Software" },
  { value: "8+", label: "Developers Collaborated With" },
  { value: "10+", label: "Technologies Used" },
];

// ---------------------------------------------------------------------------
// Community
// ---------------------------------------------------------------------------

export const community: CommunityItem[] = [
  {
    title: "Backend Division Coordinator - UNSRAT IT Community",
    description:
      "Designed and led a 5-session backend learning program for 10+ university students. Managed curriculum design, session planning, speaker coordination, and learning assessments.",
    category: "Mentoring",
  },
  {
    title: "Workshop Assistant of Community Partnership Program of Informatics Lecturers",
    description:
        "Assisted in organizing and facilitating a technical workshop for participant, helped with technical setup, and participant support.",
    category: "Coordination",
  },
  {
    title: "Vice-Coordinator of Pre-Christmas Event - Himpunan Mahasiswa Elektro",
    description:
      "Coordinated event planning and logistics across divisions. Managed venue selection, performer scheduling, external partnerships, and day-of execution.",
    category: "Coordination",
  },
  {
    title: "Vice-Coordinator of Social Service Event - Himpunan Mahasiswa Elektro",
    description:
      "Planned and executed a large-scale student community event. Managed venue selection, budget coordination, logistics, performer scheduling, and event day supervision.",
    category: "Leadership",
  },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
