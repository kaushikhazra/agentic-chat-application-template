export const MOODS = {
  neutral: { emoji: "\u{1F4AC}", label: "Neutral" },
  happy: { emoji: "\u{2600}\u{FE0F}", label: "Happy" },
  calm: { emoji: "\u{1F30A}", label: "Calm" },
  excited: { emoji: "\u{26A1}", label: "Excited" },
  thoughtful: { emoji: "\u{1F914}", label: "Thoughtful" },
  serious: { emoji: "\u{1F3AF}", label: "Serious" },
  frustrated: { emoji: "\u{1F525}", label: "Frustrated" },
} as const;

export type MoodType = keyof typeof MOODS;

export const VALID_MOODS: MoodType[] = [
  "neutral",
  "happy",
  "calm",
  "excited",
  "thoughtful",
  "serious",
  "frustrated",
];

export type ChemistryState = "harmony" | "empathy" | "uplift" | "tension" | "calm-anchor";

export interface MoodColors {
  accent: string;
  gradients: string[];
}
