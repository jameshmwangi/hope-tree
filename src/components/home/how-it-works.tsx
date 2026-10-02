const STEPS = [
  {
    n: "01",
    title: "Tell us what you need",
    text: "Choose a service, a date, and how you would like to meet — in person in Nairobi, by phone, or by video.",
  },
  {
    n: "02",
    title: "Send it privately",
    text: "Your form stays on this device. You send the request to Counselor Jean Pierre on WhatsApp or email.",
  },
  {
    n: "03",
    title: "He confirms the time",
    text: "You will hear back to confirm the session. If the slot is taken, he will offer another.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Booking
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          How a session is arranged
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl bg-card p-6 shadow-border"
            >
              <p className="font-display text-sm font-semibold tracking-[0.16em] text-primary">
                {step.n}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
