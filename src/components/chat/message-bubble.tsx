"use client";

import { Bot, User } from "lucide-react";

import { useMood } from "@/components/mood/mood-provider";
import { MOOD_COLORS, MOODS } from "@/features/mood";
import { cn } from "@/lib/utils";

import { MarkdownContent } from "./markdown-content";

interface MessageBubbleProps {
  role: string;
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";
  const { userMood, aiMood } = useMood();
  const mood = isUser ? userMood : aiMood;
  const colors = MOOD_COLORS[mood];
  const moodInfo = MOODS[mood];

  return (
    <div className={cn("flex gap-3 px-4 py-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Bot className="size-4 text-white/80" />
        </div>
      )}
      <div
        className={cn("max-w-[80%] rounded-2xl px-4 py-2.5")}
        style={{
          backgroundColor: isUser ? `${colors.accent}dd` : "rgba(255,255,255,0.12)",
          color: "#fff",
          border: isUser ? `1px solid ${colors.accent}` : "1px solid rgba(255,255,255,0.15)",
          textShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
          {isUser ? `You ${moodInfo.emoji}` : `AI ${moodInfo.emoji}`}
        </div>
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        ) : (
          <MarkdownContent content={content} className="text-white" />
        )}
      </div>
      {isUser && (
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: `${colors.accent}`,
            boxShadow: `0 0 8px ${colors.accent}40`,
          }}
        >
          <User className="size-4 text-white" />
        </div>
      )}
    </div>
  );
}
