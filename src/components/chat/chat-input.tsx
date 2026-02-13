"use client";

import { Send } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { useMood } from "@/components/mood/mood-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MOOD_COLORS } from "@/features/mood";
import { useLiveSentiment } from "@/hooks/use-live-sentiment";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setUserMood, userMood } = useMood();

  // Live sentiment analysis on typing
  const detectedMood = useLiveSentiment(value);

  // Update mood context when sentiment changes
  if (value.trim() && detectedMood !== userMood) {
    setUserMood(detectedMood, true);
  }

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) {
      return;
    }
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const accentColor = MOOD_COLORS[userMood].accent;

  return (
    <div
      className="border-t p-4 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="chat-input-glow mx-auto flex max-w-3xl items-end gap-2 rounded-xl p-2"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          className="max-h-32 min-h-10 resize-none border-0 bg-transparent text-white shadow-none placeholder:text-white/40 focus-visible:ring-0"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          size="icon"
          className="send-button-glow shrink-0"
          style={{
            backgroundColor: value.trim() ? accentColor : undefined,
            boxShadow: value.trim() ? `0 0 12px ${accentColor}40` : undefined,
          }}
          aria-label="Send message"
        >
          <Send className="size-4" />
        </Button>
      </div>
      <p className="mt-1.5 text-center text-xs text-white/40">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
