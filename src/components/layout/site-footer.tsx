import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SERVICES, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/kGB9snXJ/1001571267.jpg"
              alt="Hope Tree Logo"
              width={48}
              height={48}
              className="size-12 rounded-full object-cover img-frame"
            />
            <div>
              <p className="font-display text-lg font-semibold leading-tight">
                {SITE.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Guidance and Counseling
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}. Confidential support with {SITE.counselor.name} in{" "}
            {SITE.city}.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-3 space-y-2">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  to="/"
                  hash="services"
                  className="text-sm text-muted-foreground outline-none transition-colors duration-150 hover:text-foreground focus-visible:text-foreground"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`tel:${SITE.counselor.phoneTel}`}
                className="text-muted-foreground outline-none hover:text-foreground"
              >
                {SITE.counselor.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={`mailto:${SITE.counselor.email}`}
                className="break-all text-muted-foreground outline-none hover:text-foreground"
              >
                {SITE.counselor.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">{SITE.city}</span>
            </li>
          </ul>
          <Link
            to="/book"
            className="mt-5 inline-flex h-11 items-center text-sm font-medium text-primary outline-none hover:underline"
          >
            Request a session
          </Link>
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {SITE.fullName}. All conversations are
          treated as confidential.
        </p>
        <p>
          {SITE.motto.join(" · ")}
        </p>
      </div>
    </footer>
  );
}
