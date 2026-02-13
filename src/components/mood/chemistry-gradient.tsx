"use client";

import { useMemo } from "react";

import { blendColors, MOOD_COLORS } from "@/features/mood";

import { useMood } from "./mood-provider";

export function ChemistryGradientBackground() {
  const { userMood, aiMood } = useMood();

  const gradientStyle = useMemo(() => {
    const aiColors = MOOD_COLORS[aiMood];
    const userColors = MOOD_COLORS[userMood];
    const mid = blendColors(aiColors.accent, userColors.accent, 0.5);

    const aiColor1 = aiColors.gradients[0] as string;
    const aiColor2 = aiColors.gradients[2] as string;
    const userColor1 = userColors.gradients[1] as string;
    const userColor2 = userColors.gradients[3] as string;

    return {
      background: `linear-gradient(
        135deg,
        ${aiColor1} 0%,
        ${aiColor2} 15%,
        ${blendColors(aiColor2, mid, 0.5)} 30%,
        ${mid} 50%,
        ${blendColors(mid, userColor1, 0.5)} 70%,
        ${userColor1} 85%,
        ${userColor2} 100%
      )`,
      backgroundSize: "200% 200%",
      animation: "chemistry-drift 10s ease infinite",
      transition: "background 1.2s ease",
    };
  }, [userMood, aiMood]);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0" style={gradientStyle} />
    </div>
  );
}
