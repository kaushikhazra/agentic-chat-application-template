import type { MoodType } from "./types";
import { VALID_MOODS } from "./types";

const MOOD_TAG_REGEX = /\[MOOD:user=(\w+),ai=(\w+)\]/;

export interface ParsedMoodTag {
  userMood: MoodType;
  aiMood: MoodType;
}

/**
 * Parse [MOOD:user=X,ai=Y] tag from AI response text.
 * Returns the parsed moods and the cleaned text with the tag stripped.
 */
export function parseMoodTag(text: string): { moods: ParsedMoodTag | null; cleanText: string } {
  const match = MOOD_TAG_REGEX.exec(text);
  if (!match) {
    return { moods: null, cleanText: text };
  }

  const userMood = match[1] as string;
  const aiMood = match[2] as string;

  const isValidUser = VALID_MOODS.includes(userMood as MoodType);
  const isValidAi = VALID_MOODS.includes(aiMood as MoodType);

  const cleanText = text.replace(MOOD_TAG_REGEX, "").trim();

  if (isValidUser && isValidAi) {
    return {
      moods: { userMood: userMood as MoodType, aiMood: aiMood as MoodType },
      cleanText,
    };
  }

  return { moods: null, cleanText };
}
