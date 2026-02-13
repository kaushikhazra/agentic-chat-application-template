import type { MoodColors, MoodType } from "./types";

export const MOOD_COLORS: Record<MoodType, MoodColors> = {
  neutral: { accent: "#6366f1", gradients: ["#e2e8f0", "#c7d2fe", "#e0e7ff", "#f1f5f9"] },
  happy: { accent: "#f59e0b", gradients: ["#fde68a", "#fdba74", "#fbbf24", "#fb923c"] },
  calm: { accent: "#14b8a6", gradients: ["#99f6e4", "#a5f3fc", "#67e8f9", "#5eead4"] },
  excited: { accent: "#ec4899", gradients: ["#f9a8d4", "#c084fc", "#e879f9", "#fb7185"] },
  thoughtful: { accent: "#7c3aed", gradients: ["#c4b5fd", "#818cf8", "#a78bfa", "#ddd6fe"] },
  serious: { accent: "#475569", gradients: ["#94a3b8", "#64748b", "#9ca3af", "#cbd5e1"] },
  frustrated: { accent: "#ef4444", gradients: ["#fca5a5", "#f87171", "#fb923c", "#fda4af"] },
};

export function scoreToMood(comparative: number): MoodType {
  if (comparative >= 0.5) {
    return "excited";
  }
  if (comparative >= 0.2) {
    return "happy";
  }
  if (comparative <= -0.5) {
    return "frustrated";
  }
  if (comparative <= -0.2) {
    return "serious";
  }
  if (comparative > -0.05 && comparative < 0.05) {
    return "neutral";
  }
  return "thoughtful";
}
