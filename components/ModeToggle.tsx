"use client";

import * as React from "react";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <span className="cursor-pointer" onClick={() => setTheme("dark")}>
          <MoonIcon /> {/* Show Moon icon when in light mode */}
        </span>
      ) : (
        <span className="cursor-pointer" onClick={() => setTheme("light")}>
          <SunIcon /> {/* Show Sun icon when in dark mode */}
        </span>
      )}
    </>
  );
}
