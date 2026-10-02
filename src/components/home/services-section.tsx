import { Link } from "@tanstack/react-router";
import {
  Apple,
  Brain,
  Compass,
  HeartHandshake,
  Shield,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type ServiceId } from "@/lib/site";

const ICONS: Record<ServiceId, LucideIcon> = {
  nutritional: Apple,
  psychological: Brain,
  debriefing: HeartHandshake,
  substance: Shield,
  prison: Users,
  orphans: Sprout,
  guidance: Compass,
};

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Professional support
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          We offer counseling that meets people where they are
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Choose the kind of support you need. You can book any of these as an
          in-person, phone, or video session.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.id];
            return (
              <li key={service.id}>
                <Link
                  to="/book"
                  hash={service.id}
                  className="flex h-full flex-col rounded-2xl bg-card p-5 shadow-border outline-none transition-[background-color,box-shadow] duration-150 ease-out hover:bg-paper focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <span className="mt-4 text-sm font-medium text-primary">
                    Book this session
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
