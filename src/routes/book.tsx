import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/book")({
  component: BookPage,
  head: () => ({
    meta: [
      { title: "Book a session · Hope Tree" },
      {
        name: "description",
        content:
          "Request a confidential counseling session with Cr. Jean Pierre Nubaha at Hope Tree Guidance and Counseling in Nairobi.",
      },
    ],
  }),
});

function BookPage() {
  return (
    <main id="main" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Book a session
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Request time with Hope Tree
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Fill in the form, review your request, then send it to{" "}
            {SITE.counselor.name} on WhatsApp or email. He will confirm a time
            that works.
          </p>
          <div className="mt-8 space-y-4 rounded-2xl bg-card p-5 shadow-border">
            <p className="text-sm font-semibold">Prefer to call first?</p>
            <a
              href={`tel:${SITE.counselor.phoneTel}`}
              className="flex min-h-11 items-center gap-2.5 text-sm font-medium outline-none hover:underline"
            >
              <Phone className="size-4 text-primary" />
              {SITE.counselor.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE.counselor.email}`}
              className="flex min-h-11 items-center gap-2.5 break-all text-sm font-medium outline-none hover:underline"
            >
              <Mail className="size-4 text-primary" />
              {SITE.counselor.email}
            </a>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Sessions are available in person in Nairobi, by phone, or by video.
            If you are in immediate danger, contact local emergency services.
          </p>
        </div>
        <BookingForm />
      </div>
    </main>
  );
}
