"use client";

import { MessageSquare } from "lucide-react";
import { useCallback, useState } from "react";

import { ChemistryGradientBackground } from "@/components/mood/chemistry-gradient";
import { MoodProvider, useMood } from "@/components/mood/mood-provider";
import { Skeleton } from "@/components/ui/skeleton";
import type { MoodType } from "@/features/mood";
import { useChat } from "@/hooks/use-chat";

import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatSidebar } from "./chat-sidebar";
import { MessageList } from "./message-list";

function ChatLayoutInner() {
  const { setBothMoods } = useMood();

  const handleMoodDetected = useCallback(
    (userMood: string, aiMood: string) => {
      setBothMoods(userMood as MoodType, aiMood as MoodType);
    },
    [setBothMoods],
  );

  const {
    conversations,
    activeConversationId,
    messages,
    isStreaming,
    isLoadingMessages,
    streamingContent,
    sendMessage,
    selectConversation,
    createNewChat,
    renameConversation,
    deleteConversation,
  } = useChat({ onMoodDetected: handleMoodDetected });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const activeTitle = conversations.find((c) => c.id === activeConversationId)?.title ?? null;

  const toggleSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const hasMessages = messages.length > 0 || isStreaming;

  return (
    <>
      <ChemistryGradientBackground />
      <div className="flex h-screen">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={selectConversation}
          onNewChat={createNewChat}
          onRenameConversation={renameConversation}
          onDeleteConversation={deleteConversation}
          isMobileOpen={isMobileOpen}
          onMobileClose={closeMobile}
        />

        <div className="flex flex-1 flex-col">
          <ChatHeader title={activeTitle} onToggleSidebar={toggleSidebar} />

          {isLoadingMessages && activeConversationId ? (
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl space-y-4 py-4">
                <div className="flex gap-3 px-4 py-3">
                  <Skeleton className="size-8 shrink-0 rounded-full" />
                  <Skeleton className="h-16 w-3/4 rounded-2xl" />
                </div>
                <div className="flex flex-row-reverse gap-3 px-4 py-3">
                  <Skeleton className="h-10 w-1/2 rounded-2xl" />
                </div>
                <div className="flex gap-3 px-4 py-3">
                  <Skeleton className="size-8 shrink-0 rounded-full" />
                  <Skeleton className="h-24 w-2/3 rounded-2xl" />
                </div>
                <div className="flex flex-row-reverse gap-3 px-4 py-3">
                  <Skeleton className="h-10 w-2/5 rounded-2xl" />
                </div>
              </div>
            </div>
          ) : hasMessages ? (
            <MessageList
              messages={messages}
              streamingContent={streamingContent}
              isStreaming={isStreaming}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
              <div
                className="flex size-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <MessageSquare className="size-8 text-white/80" />
              </div>
              <div className="text-center">
                <h2
                  className="text-xl font-semibold text-white"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  How can I help you today?
                </h2>
                <p
                  className="mt-1 text-sm text-white/70"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
                >
                  Start a conversation by typing a message below.
                </p>
              </div>
            </div>
          )}

          <ChatInput onSend={sendMessage} disabled={isStreaming} />
        </div>
      </div>
    </>
  );
}

export function ChatLayout() {
  return (
    <MoodProvider>
      <ChatLayoutInner />
    </MoodProvider>
  );
}
