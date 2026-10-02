import {
  formatLabel,
  formatTimeSlot,
  serviceTitle,
  SITE,
  type FormatId,
  type ServiceId,
  type TimeSlot,
} from "./site";

export type BookingDraft = {
  name: string;
  email: string;
  phone: string;
  service: ServiceId;
  format: FormatId;
  date: string;
  time: TimeSlot;
  notes: string;
};

export type StoredBooking = BookingDraft & {
  id: string;
  createdAt: string;
};

const STORAGE_KEY = "hopetree.session-requests.v1";

export function listBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredBooking);
  } catch {
    return [];
  }
}

export function saveBooking(draft: BookingDraft): StoredBooking {
  const stored: StoredBooking = {
    ...draft,
    id: `HT-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  const next = [stored, ...listBookings()].slice(0, 8);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return stored;
}

export function buildBookingMessage(booking: BookingDraft): string {
  const lines = [
    `Hello ${SITE.counselor.name},`,
    "",
    "I would like to book a session with Hope Tree Guidance and Counseling.",
    "",
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Service: ${serviceTitle(booking.service)}`,
    `Session format: ${formatLabel(booking.format)}`,
    `Preferred date: ${booking.date}`,
    `Preferred time: ${formatTimeSlot(booking.time)} (East Africa Time)`,
  ];
  if (booking.notes.trim()) {
    lines.push("", `Note: ${booking.notes.trim()}`);
  }
  lines.push("", "Please confirm if this time works. Thank you.");
  return lines.join("\n");
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.counselor.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(message: string): string {
  const subject = encodeURIComponent("Hope Tree session request");
  return `mailto:${SITE.counselor.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
}

function isStoredBooking(value: unknown): value is StoredBooking {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.phone === "string" &&
    typeof v.service === "string" &&
    typeof v.format === "string" &&
    typeof v.date === "string" &&
    typeof v.time === "string"
  );
}
