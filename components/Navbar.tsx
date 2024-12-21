import React from "react";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-normal">
        <span className="font-bold underline">AI</span> Blog
      </h1>
      <ModeToggle />
    </div>
  );
}
