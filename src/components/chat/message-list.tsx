"use client";

import { Bot } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { useAutoScroll } from "@/hooks/use-auto-scroll";

import { MessageBubble } from "./message-bubble";

interface Message {
  id: string;
  role: string;
  content: string;
}

interface MessageListProps {
  messages: Message[];
  streamingContent: string;
  isStreaming: boolean;
}

const MOOD_TAG_REGEX = /\[MOOD:user=\w+,ai=\w+\]/;

export function MessageList({ messages, streamingContent, isStreaming }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollToBottom, isScrolledToBottom } = useAutoScroll(containerRef);
  const prevMessageCountRef = useRef(messages.length);

  // Strip mood tag from streaming content so it doesn't flash
  const displayStreamingContent = useMemo(
    () => streamingContent.replace(MOOD_TAG_REGEX, "").trim(),
    [streamingContent],
  );

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (messages.length > prevMessageCountRef.current) {
      scrollToBottom();
    }
    prevMessageCountRef.current = messages.length;
  }, [messages.length, scrollToBottom]);

  // Auto-scroll during streaming when user hasn't scrolled up
  useEffect(() => {
    if (isScrolledToBottom()) {
      const el = containerRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }
  });

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl py-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} content={message.content} />
        ))}
        {isStreaming && displayStreamingContent && (
          <div className="flex gap-3 px-4 py-3">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Bot className="size-4 text-white/80" />
            </div>
            <div
              className="max-w-[80%] rounded-2xl px-4 py-2.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.15)",
                textShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              <p className="text-sm whitespace-pre-wrap">
                {displayStreamingContent}
                <span className="streaming-cursor ml-0.5 inline-block h-4 w-1.5 align-middle" />
              </p>
            </div>
          </div>
        )}
        {isStreaming && !displayStreamingContent && (
          <div className="flex gap-3 px-4 py-3">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Bot className="size-4 text-white/80" />
            </div>
            <div
              className="max-w-[80%] rounded-2xl px-4 py-2.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="flex items-center gap-1">
                <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:0ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-white/60 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
