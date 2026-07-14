"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}

      <Toaster
        theme="dark"
        position="top-center"
        closeButton
        richColors
        toastOptions={{
          className:
            "glass-strong !rounded-2xl !border-white/10 !text-white"
        }}
      />
    </MotionConfig>
  );
}
