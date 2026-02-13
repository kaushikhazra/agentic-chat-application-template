"use client";

import { useEffect, useRef, useState } from "react";
import Sentiment from "sentiment";

import type { MoodType } from "@/features/mood";
import { scoreToMood } from "@/features/mood";

const sentiment = new Sentiment();

/**
 * Debounced client-side sentiment analysis on text input.
 * Returns a mood based on AFINN-165 word scoring.
 */
export function useLiveSentiment(text: string, debounceMs: number = 300): MoodType {
  const [mood, setMood] = useState<MoodType>("neutral");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!text.trim()) {
      setMood("neutral");
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const result = sentiment.analyze(text);
      setMood(scoreToMood(result.comparative));
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, debounceMs]);

  return mood;
}
