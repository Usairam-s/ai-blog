"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

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
