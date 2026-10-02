import { SITE } from "@/lib/site";

const PILLARS = [
  {
    title: "Support",
    text: "You do not have to carry this alone. Sessions are paced for real life — not lectures.",
  },
  {
    title: "Healing",
    text: "We work with grief, stress, addiction, family strain, and the quiet weight people hide.",
  },
  {
    title: "Hope",
    text: "The aim is a next honest step: a plan, a conversation, a steadier week.",
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-border bg-card px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About Hope Tree
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Led by {SITE.counselor.name}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Hope Tree Guidance and Counseling is a Nairobi practice for people
              who need a confidential, respectful conversation — and practical
              help afterward.
            </p>
            <p>
              {SITE.counselor.shortName} works with individuals and families
              through psychological counseling, nutritional guidance,
              debriefing, substance-use recovery, care for orphans, and prison
              visiting, including accompaniment around Nairobi West Prison.
            </p>
            <p>
              If you are carrying something heavy, you are welcome here. Bring
              as much or as little of the story as you are ready to tell.
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-2xl bg-background p-5 shadow-border"
            >
              <p className="font-display text-xl font-semibold tracking-tight text-primary">
                {pillar.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
