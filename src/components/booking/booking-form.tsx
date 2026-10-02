import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Mail, MessageCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  buildBookingMessage,
  mailtoUrl,
  saveBooking,
  whatsappUrl,
  type StoredBooking,
} from "@/lib/bookings";
import {
  FORMAT_IDS,
  FORMATS,
  formatTimeSlot,
  SERVICE_IDS,
  SERVICES,
  SITE,
  TIME_SLOTS,
  type FormatId,
  type ServiceId,
  type TimeSlot,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 9 && digits.length <= 15;
    }, "Enter a phone number we can reach you on"),
  service: z.enum(SERVICE_IDS, { error: "Choose a service" }),
  format: z.enum(FORMAT_IDS, { error: "Choose how you would like to meet" }),
  date: z
    .string()
    .min(1, "Choose a preferred date")
    .refine((value) => {
      const picked = new Date(`${value}T00:00:00`);
      if (Number.isNaN(picked.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, "Please choose today or a later date"),
  time: z.enum(TIME_SLOTS, { error: "Choose a preferred time" }),
  notes: z.string().max(800, "Please keep this under 800 characters"),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm you understand how this request is sent",
  }),
});

type BookingValues = z.infer<typeof bookingSchema>;

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function BookingForm({ className }: { className?: string }) {
  return <BookingFormFields className={className} />;
}

function BookingFormFields({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState<StoredBooking | null>(null);

  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
      format: "in-person",
      date: "",
      time: undefined,
      notes: "",
      consent: false,
    },
  });

  const minDate = useMemo(() => todayIso(), []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (SERVICE_IDS.includes(hash as ServiceId)) {
      form.setValue("service", hash as ServiceId);
    }
  }, [form]);

  const onSubmit = form.handleSubmit((values) => {
    const stored = saveBooking({
      name: values.name,
      email: values.email,
      phone: values.phone,
      service: values.service as ServiceId,
      format: values.format as FormatId,
      date: values.date,
      time: values.time as TimeSlot,
      notes: values.notes ?? "",
    });
    setSubmitted(stored);
  });

  if (submitted) {
    const message = buildBookingMessage(submitted);
    return (
      <div
        className={cn("rounded-2xl bg-card p-6 shadow-border sm:p-8", className)}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Your request is ready
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Reference {submitted.id}. Send it to {SITE.counselor.name} on
              WhatsApp or email. He will reply to confirm the time. Nothing is
              published on this site.
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 rounded-xl bg-background p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Service</dt>
            <dd className="font-medium">
              {SERVICES.find((s) => s.id === submitted.service)?.title}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">When</dt>
            <dd className="font-medium">
              {submitted.date} · {formatTimeSlot(submitted.time)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Format</dt>
            <dd className="font-medium">
              {FORMATS.find((f) => f.id === submitted.format)?.label}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">{submitted.name}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="sm:flex-1">
            <a href={whatsappUrl(message)} target="_blank" rel="noreferrer">
              <MessageCircle />
              Send on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="sm:flex-1">
            <a href={mailtoUrl(message)}>
              <Mail />
              Send by email
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => {
            setSubmitted(null);
            form.reset();
          }}
        >
          <RotateCcw />
          Make another request
        </Button>
      </div>
    );
  }

  const errors = form.formState.errors;

  return (
    <form
      onSubmit={onSubmit}
      className={cn("rounded-2xl bg-card p-6 shadow-border sm:p-8", className)}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            {...form.register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@email.com"
            {...form.register("email")}
          />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+254 7.."
            {...form.register("phone")}
          />
        </Field>
        <Field
          label="Service"
          htmlFor="service"
          error={errors.service?.message}
        >
          <NativeSelect id="service" {...form.register("service")}>
            <option value="">Choose a service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field
          label="How would you like to meet?"
          htmlFor="format"
          error={errors.format?.message}
        >
          <NativeSelect id="format" {...form.register("format")}>
            {FORMATS.map((format) => (
              <option key={format.id} value={format.id}>
                {format.label}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field
          label="Preferred date"
          htmlFor="date"
          error={errors.date?.message}
        >
          <Input
            id="date"
            type="date"
            min={minDate}
            {...form.register("date")}
          />
        </Field>
        <Field
          label="Preferred time (EAT)"
          htmlFor="time"
          error={errors.time?.message}
        >
          <NativeSelect id="time" {...form.register("time")}>
            <option value="">Choose a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {formatTimeSlot(slot)}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <div className="sm:col-span-2">
          <Field
            label="What would you like support with? (optional)"
            htmlFor="notes"
            error={errors.notes?.message}
          >
            <Textarea
              id="notes"
              rows={4}
              placeholder="Share as much or as little as you are comfortable with."
              {...form.register("notes")}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 size-5 shrink-0 rounded-sm border border-input accent-primary"
          {...form.register("consent")}
        />
        <Label htmlFor="consent" className="text-sm font-normal leading-snug">
          I understand this request is not published here. I will send it to{" "}
          {SITE.counselor.shortName} on WhatsApp or email so we can confirm a
          time.
        </Label>
      </div>
      {errors.consent?.message ? (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {errors.consent.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="mt-6 w-full">
        Review and send request
      </Button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        If this is an emergency, contact local emergency services. Hope Tree is
        counseling support, not a crisis hotline.
      </p>
    </form>
  );
}
