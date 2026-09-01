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
  currentlyBuilding: string;
  currentlyLearning: string;
  interestedIn: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  implementation: string;
  contribution: string;
  outcome: string;
  technologies: string[];
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

export interface LeadershipItem {
  title: string;
  description: string;
  category: string;
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Your Name",
  title: "Backend Engineer",
  subtitle: "Building reliable software systems.",
  location: "Your City, Country",
  bio: "A software engineer focused on backend systems, API design, and building tools that solve real problems. Drawn to clean architecture, thoughtful abstractions, and code that other people can maintain.",
  email: "your.email@placeholder.dev",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  resume: "/cv-placeholder.pdf",
  currentlyBuilding: "A distributed task scheduler",
  currentlyLearning: "Systems design patterns & event-driven architecture",
  interestedIn: "Open-source tooling, developer experience, technical writing",
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 1,
    title: "Relay API Platform",
    category: "API Infrastructure",
    description:
      "A centralized API gateway and management platform that standardized service communication across multiple internal teams. Handled authentication, rate limiting, request transformation, and observability.",
    problem:
      "Internal services communicated through inconsistent ad-hoc integrations. Each team maintained its own authentication logic, error formats, and retry strategies, leading to fragile cross-service dependencies.",
    approach:
      "Designed a unified API gateway layer that abstracted common concerns—auth, rate limiting, circuit breaking—away from individual services. Introduced contract-first API design using OpenAPI specifications.",
    implementation:
      "Built with Golang and PostgreSQL. Used JWT-based authentication with role-scoped access tokens. Implemented request/response transformation middleware and structured logging for observability. Deployed via Docker containers behind a reverse proxy.",
    contribution:
      "Architected the gateway core, built the middleware pipeline, designed the token lifecycle system, and wrote the OpenAPI tooling that auto-generated client SDKs for consuming teams.",
    outcome:
      "Reduced inter-service integration time by approximately 60%. Standardized error handling across 8+ services. Eliminated duplicated auth logic in 5 separate codebases.",
    technologies: ["Golang", "PostgreSQL", "Docker", "REST API", "JWT", "OpenAPI"],
    featured: true,
  },
  {
    id: 2,
    title: "DocForge",
    category: "Document Automation",
    description:
      "An automated document generation system that transformed structured data into formatted PDFs, reports, and compliance documents. Replaced manual processes for multiple operational teams.",
    problem:
      "Operational teams spent significant hours each week manually assembling reports from spreadsheets and database exports. The process was error-prone and created bottlenecks during audit periods.",
    approach:
      "Developed a template-driven document engine that pulled data from existing databases and applied configurable formatting rules. Users could define document templates through a simple configuration interface.",
    implementation:
      "Backend built with NestJS and TypeScript. Used LaTeX for high-fidelity PDF rendering and a custom template DSL for defining document structures. PostgreSQL for template storage and generation history.",
    contribution:
      "Designed the template engine architecture, built the rendering pipeline, and implemented the scheduling system for automated report generation.",
    outcome:
      "Automated generation of 200+ documents monthly. Reduced report preparation time from hours to minutes. Eliminated formatting inconsistencies across compliance documents.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "LaTeX", "Docker", "REST API"],
  },
  {
    id: 3,
    title: "VoteStream",
    category: "Workflow Application",
    description:
      "A real-time voting and decision-tracking platform designed for organizational governance. Supported multiple voting methods, quorum rules, and audit-ready result recording.",
    problem:
      "Governance decisions were tracked through email threads and spreadsheets, making it difficult to verify quorum, audit vote history, or ensure procedural compliance.",
    approach:
      "Built a structured workflow engine that modeled different voting procedures as configurable state machines. Each decision followed a defined lifecycle from proposal through resolution.",
    implementation:
      "Full-stack application with Next.js frontend and Laravel backend. Real-time updates via WebSocket connections. Role-based access control with granular permissions per organization unit.",
    contribution:
      "Designed the voting state machine, implemented the real-time sync layer, and built the admin dashboard for managing organizational units and permissions.",
    outcome:
      "Processed 500+ governance decisions. Provided complete audit trail for compliance review. Reduced decision cycle time by approximately 40%.",
    technologies: ["Laravel", "Next.js", "MySQL", "Redis", "WebSocket", "REST API"],
  },
  {
    id: 4,
    title: "DevKit CLI",
    category: "Developer Tooling",
    description:
      "A command-line toolkit that automated common development workflows—scaffolding, environment setup, database migrations, and deployment preparation—for a team of 10+ developers.",
    problem:
      "Developers spent time on repetitive setup tasks: configuring environments, running migration sequences, preparing deployment artifacts. The lack of standardization caused environment-specific bugs.",
    approach:
      "Created an opinionated CLI tool that encoded team conventions into executable commands. Each command encapsulated a multi-step workflow with validation and rollback capabilities.",
    implementation:
      "Built in Golang with a plugin architecture for extensibility. Configuration via YAML files. Integrated with Git hooks for pre-commit validation and Docker for environment standardization.",
    contribution:
      "Sole developer. Designed the plugin system, built core commands, wrote documentation, and facilitated adoption across the engineering team.",
    outcome:
      "Standardized development setup across 10+ engineers. Reduced onboarding environment setup from a full day to under 30 minutes. Eliminated a class of deployment-related configuration bugs.",
    technologies: ["Golang", "Docker", "Git", "YAML", "CLI"],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experiences: Experience[] = [
  {
    role: "Backend / Engineering Coordinator",
    organization: "Placeholder Organization",
    period: "2026",
    description:
      "Coordinating backend architecture decisions and mentoring junior developers while continuing to ship production features.",
    responsibilities: [
      "Leading API design reviews and architectural discussions",
      "Mentoring 3 junior developers through code review and pairing sessions",
      "Building internal tooling to improve developer workflow",
      "Coordinating cross-team technical initiatives",
    ],
    technologies: ["Golang", "NestJS", "PostgreSQL", "Docker", "Git"],
  },
  {
    role: "Senior Backend Developer",
    organization: "Placeholder Project B",
    period: "2025–2026",
    description:
      "Owned the backend architecture for a document automation platform. Designed and shipped the core rendering pipeline and API layer.",
    responsibilities: [
      "Architected the document generation engine and template system",
      "Designed RESTful APIs consumed by frontend and external integrations",
      "Implemented CI/CD pipelines and containerized deployment",
      "Conducted technical interviews and onboarded new engineers",
    ],
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "LaTeX"],
  },
  {
    role: "Backend Developer",
    organization: "Placeholder Project A",
    period: "2025",
    description:
      "Built core backend services for a real-time voting platform. Focused on data integrity, state management, and real-time synchronization.",
    responsibilities: [
      "Implemented voting workflow state machine with transactional guarantees",
      "Built WebSocket layer for real-time vote synchronization",
      "Designed role-based access control system",
      "Wrote integration tests covering critical governance workflows",
    ],
    technologies: ["Laravel", "MySQL", "Redis", "WebSocket", "REST API"],
  },
  {
    role: "Backend Developer",
    organization: "Placeholder Project (Early Career)",
    period: "2024",
    description:
      "First professional backend role. Contributed to an API gateway project, learning production-grade Golang and distributed system patterns.",
    responsibilities: [
      "Built middleware components for request validation and transformation",
      "Implemented structured logging and basic observability tooling",
      "Contributed to API documentation and OpenAPI specifications",
      "Participated in code reviews and engineering discussions",
    ],
    technologies: ["Golang", "PostgreSQL", "Docker", "REST API", "JWT"],
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
    items: ["Golang", "NestJS", "Laravel", "Node.js"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "Redis"],
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
    items: ["Firebase", "LaTeX", "PWA / TWA", "Linux"],
  },
];

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export const metrics: Metric[] = [
  { value: "05+", label: "Projects Shipped" },
  { value: "03+", label: "Years Building Software" },
  { value: "10+", label: "Developers Collaborated With" },
  { value: "15+", label: "Technologies Used" },
];

// ---------------------------------------------------------------------------
// Leadership & Community
// ---------------------------------------------------------------------------

export const leadership: LeadershipItem[] = [
  {
    title: "Technical Mentoring",
    description:
      "Guided junior developers through code reviews, pairing sessions, and structured learning paths focused on backend fundamentals.",
    category: "Mentoring",
  },
  {
    title: "Workshop Facilitation",
    description:
      "Planned and led technical workshops on API design patterns, Git workflows, and containerization for development teams.",
    category: "Education",
  },
  {
    title: "Cross-Team Coordination",
    description:
      "Facilitated technical alignment between frontend and backend teams during multi-service integration projects.",
    category: "Coordination",
  },
  {
    title: "Knowledge Sharing",
    description:
      "Established internal documentation practices and contributed to a shared engineering knowledge base covering architecture decisions.",
    category: "Communication",
  },
  {
    title: "Event Organization",
    description:
      "Coordinated developer meetups and internal tech talks, creating space for knowledge exchange across engineering disciplines.",
    category: "Community",
  },
];

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
