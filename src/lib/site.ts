export const SITE = {
  name: "Hope Tree",
  fullName: "Hope Tree Guidance and Counseling",
  tagline: "Together we can build hope and a better future",
  motto: ["Support", "Healing", "Hope"] as const,
  city: "Nairobi, Kenya",
  counselor: {
    name: "Cr. Jean Pierre Nubaha",
    shortName: "Jean Pierre Nubaha",
    title: "Counselor",
    email: "jeanpierrenubaha0@gmail.com",
    phoneDisplay: "+254 707 366 343",
    phoneE164: "254707366343",
    phoneTel: "+254707366343",
  },
} as const;

export const SERVICE_IDS = [
  "nutritional",
  "psychological",
  "debriefing",
  "substance",
  "prison",
  "orphans",
  "guidance",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICES: ReadonlyArray<{
  id: ServiceId;
  title: string;
  summary: string;
}> = [
  {
    id: "nutritional",
    title: "Nutritional Counseling",
    summary:
      "Practical guidance on food, health, and daily habits that support recovery and wellbeing.",
  },
  {
    id: "psychological",
    title: "Psychological Counseling",
    summary:
      "A confidential space to work through stress, grief, anxiety, and the thoughts that weigh you down.",
  },
  {
    id: "debriefing",
    title: "Debriefing / Emotional Support",
    summary:
      "Steady company after a difficult event — so you can name what happened and find a next step.",
  },
  {
    id: "substance",
    title: "Drug & Substance Abuse Counseling",
    summary:
      "Respectful support for people ready to change their relationship with alcohol or drugs.",
  },
  {
    id: "prison",
    title: "Prison Visiting & Family Support",
    summary:
      "Accompaniment for families with a loved one in custody, including prison visiting in Nairobi.",
  },
  {
    id: "orphans",
    title: "Orphans Counseling",
    summary:
      "Gentle guidance for children and young people who have lost parents, and for those who care for them.",
  },
  {
    id: "guidance",
    title: "Guidance and Counseling Services",
    summary:
      "General guidance for life decisions, family strain, and finding a clearer path forward.",
  },
];

export const FORMAT_IDS = ["in-person", "phone", "video"] as const;
export type FormatId = (typeof FORMAT_IDS)[number];

export const FORMATS: ReadonlyArray<{ id: FormatId; label: string }> = [
  { id: "in-person", label: "In person — Nairobi" },
  { id: "phone", label: "Phone call" },
  { id: "video", label: "Video call" },
];

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export function serviceTitle(id: string): string {
  return SERVICES.find((s) => s.id === id)?.title ?? id;
}

export function formatLabel(id: string): string {
  return FORMATS.find((f) => f.id === id)?.label ?? id;
}

export function formatTimeSlot(slot: string): string {
  const [h, m] = slot.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}:${m} ${suffix}`;
}
