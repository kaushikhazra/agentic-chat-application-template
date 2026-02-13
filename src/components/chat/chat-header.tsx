"use client";

import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  title: string | null;
  onToggleSidebar: () => void;
}

export function ChatHeader({ title, onToggleSidebar }: ChatHeaderProps) {
  return (
    <header
      className="flex h-14 items-center justify-between border-b px-4 backdrop-blur-xl"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:bg-white/10 hover:text-white md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
        <h1
          className="truncate text-lg font-semibold text-white"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
        >
          {title ?? "New Chat"}
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
