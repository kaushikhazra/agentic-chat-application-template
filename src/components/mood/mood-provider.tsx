"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { MoodType } from "@/features/mood";

interface MoodState {
  userMood: MoodType;
  aiMood: MoodType;
  isTypingPreview: boolean;
}

interface MoodContextValue extends MoodState {
  setUserMood: (mood: MoodType, isPreview: boolean) => void;
  setAiMood: (mood: MoodType) => void;
  setBothMoods: (userMood: MoodType, aiMood: MoodType) => void;
}

const MoodContext = createContext<MoodContextValue | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MoodState>({
    userMood: "neutral",
    aiMood: "neutral",
    isTypingPreview: false,
  });

  const setUserMood = useCallback((mood: MoodType, isPreview: boolean) => {
    setState((prev) => ({ ...prev, userMood: mood, isTypingPreview: isPreview }));
  }, []);

  const setAiMood = useCallback((mood: MoodType) => {
    setState((prev) => ({ ...prev, aiMood: mood }));
  }, []);

  const setBothMoods = useCallback((userMood: MoodType, aiMood: MoodType) => {
    setState({ userMood, aiMood, isTypingPreview: false });
  }, []);

  const value = useMemo(
    () => ({ ...state, setUserMood, setAiMood, setBothMoods }),
    [state, setUserMood, setAiMood, setBothMoods],
  );

  return <MoodContext value={value}>{children}</MoodContext>;
}

export function useMood(): MoodContextValue {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}
