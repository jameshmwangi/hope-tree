import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_8%,var(--color-background)),var(--color-background)_46%)]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-20">
        <div className="hero-enter">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {SITE.city} · Guidance & Counseling
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            A quiet place to find your next step
          </h1>
          <p className="mt-5 max-w-xl font-display text-xl italic font-medium leading-snug text-primary/90">
            {SITE.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Hope Tree offers confidential counseling with {SITE.counselor.name} —
            for individuals, families, and communities who need support, healing,
            and a clearer path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/book">
                Book a session
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#services">See services</a>
            </Button>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-2xl bg-card p-1 shadow-border">
            <img
              src="https://i.postimg.cc/5tnZRZr0/Screenshot-2026-10-02-100305.png"
              alt={`${SITE.counselor.name}, counselor at Hope Tree Guidance and Counseling`}
              width={504}
              height={620}
              className="aspect-[3/4] w-full rounded-xl object-cover object-center img-frame"
            />
          </div>
          <figcaption className="mt-4">
            <p className="font-display text-lg font-semibold leading-tight">
              {SITE.counselor.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {SITE.counselor.title} · {SITE.city}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
