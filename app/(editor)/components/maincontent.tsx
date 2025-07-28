"use client"
import { AnimatePresence } from "motion/react";
export default function Maincontent({children}: Readonly<{ children: React.ReactNode }>) {
  return (
      <div 
      className="relative min-h-[80vh] isolate"
      >
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-3 pb-8 sm:pb-0 will-change-transform content-visibility-auto contain-strict">
              <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </div>
  );
}
