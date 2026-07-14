"use client";

import type { ComponentProps } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionPageProps = ComponentProps<typeof motion.div>;

export function MotionPage({
  children,
  className,
  ...props
}: MotionPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
