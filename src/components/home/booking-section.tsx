import { Mail, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { SITE } from "@/lib/site";

export function BookingSection() {
  return (
    <section
      id="book"
      className="scroll-mt-24 border-t border-border bg-[linear-gradient(180deg,var(--color-background),color-mix(in_oklab,var(--color-primary)_7%,var(--color-background)))] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Request a session
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Book time with {SITE.counselor.shortName}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Share your name, a preferred time, and what you need. After you
            review the request, send it on WhatsApp or email. He will confirm
            the appointment with you.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 text-primary" />
              <a
                href={`tel:${SITE.counselor.phoneTel}`}
                className="font-medium outline-none hover:underline"
              >
                {SITE.counselor.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-primary" />
              <a
                href={`mailto:${SITE.counselor.email}`}
                className="break-all font-medium outline-none hover:underline"
              >
                {SITE.counselor.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Conversations are confidential. This form is not a public inbox —
            you choose when the message is sent.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
