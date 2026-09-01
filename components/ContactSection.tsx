import { profile } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Monospace section label */}
        <p className="mb-4 font-mono text-sm uppercase tracking-wider text-accent">
          07. CONTACT
        </p>

        {/* Heading */}
        <h2 className="text-3xl font-semibold tracking-tight text-fg-primary md:text-4xl lg:text-5xl">
          Have a problem worth solving?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-lg text-fg-secondary">
          I&apos;m always open to discussing engineering challenges,
          collaboration opportunities, or interesting projects.
        </p>

        {/* Contact links */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Email button (primary) */}
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Send an Email</span>
          </a>

          {/* GitHub link */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border-primary px-6 py-3 text-sm font-medium text-fg-secondary transition-colors hover:bg-bg-secondary hover:text-fg-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
          </a>

          {/* LinkedIn link */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border-primary px-6 py-3 text-sm font-medium text-fg-secondary transition-colors hover:bg-bg-secondary hover:text-fg-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.92 0-1.66-.74-1.66-1.66s.74-1.66 1.66-1.66 1.66.74 1.66 1.66-.74 1.66-1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* CV download */}
        <div className="mt-6">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-fg-muted transition-colors hover:text-accent"
          >
            Download CV &darr;
          </a>
        </div>
      </div>
    </section>
  );
}
