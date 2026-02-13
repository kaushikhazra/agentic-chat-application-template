import type { ChemistryState, MoodType } from "./types";

const NEGATIVE_MOODS: MoodType[] = ["frustrated", "serious"];
const POSITIVE_MOODS: MoodType[] = ["happy", "excited"];
const SOOTHING_MOODS: MoodType[] = ["calm", "neutral"];

export function computeChemistry(userMood: MoodType, aiMood: MoodType): ChemistryState {
  if (userMood === aiMood) {
    return "harmony";
  }
  if (NEGATIVE_MOODS.includes(userMood) && SOOTHING_MOODS.includes(aiMood)) {
    return "calm-anchor";
  }
  if (NEGATIVE_MOODS.includes(userMood) && POSITIVE_MOODS.includes(aiMood)) {
    return "uplift";
  }
  if (NEGATIVE_MOODS.includes(userMood) && !NEGATIVE_MOODS.includes(aiMood)) {
    return "empathy";
  }
  if (POSITIVE_MOODS.includes(userMood) && NEGATIVE_MOODS.includes(aiMood)) {
    return "tension";
  }
  if (SOOTHING_MOODS.includes(userMood) && POSITIVE_MOODS.includes(aiMood)) {
    return "uplift";
  }
  return "harmony";
}

export function blendColors(color1: string, color2: string, ratio: number = 0.5): string {
  const hex = (c: string) => Number.parseInt(c, 16);
  const r1 = hex(color1.slice(1, 3));
  const g1 = hex(color1.slice(3, 5));
  const b1 = hex(color1.slice(5, 7));
  const r2 = hex(color2.slice(1, 3));
  const g2 = hex(color2.slice(3, 5));
  const b2 = hex(color2.slice(5, 7));
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
