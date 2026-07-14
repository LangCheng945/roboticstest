"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Boxes,
  Crosshair,
  Dumbbell,
  Home,
  Library,
  RotateCcw,
  Trophy,
  UserRound
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

const navigation = [
  {
    href: "/",
    label: "今日",
    icon: Home,
    mobile: true
  },
  {
    href: "/learn",
    label: "學習",
    icon: BookOpen,
    mobile: true
  },
  {
    href: "/practice",
    label: "特訓",
    icon: Dumbbell,
    mobile: true
  },
  {
    href: "/review",
    label: "複習",
    icon: RotateCcw,
    mobile: true
  },
  {
    href: "/leaderboard",
    label: "排行",
    icon: Trophy,
    mobile: true
  },
  {
    href: "/library",
    label: "題庫",
    icon: Library,
    mobile: false
  },
  {
    href: "/profile",
    label: "個人",
    icon: UserRound,
    mobile: false
  }
] as const;

function isCurrentRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

function Brand() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-2xl"
      aria-label="AXIS Robotics 首頁"
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl",
          "border border-white/14 bg-white text-black",
          "shadow-[0_10px_30px_rgba(255,255,255,0.08)]",
          "transition-transform duration-300",
          "group-hover:rotate-3 group-hover:scale-[1.03]"
        )}
      >
        <Crosshair className="size-5" strokeWidth={2.25} />
      </span>

      <span>
        <span className="block text-sm font-bold tracking-[0.2em]">
          AXIS
        </span>
        <span className="block text-[10px] font-medium tracking-[0.12em] text-white/35">
          HCVS ROBOTICS
        </span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const mobileNavigation = navigation.filter((item) => item.mobile);

  return (
    <div className="min-h-dvh">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden w-[272px] p-4 lg:block",
          "border-r border-white/[0.07] bg-black/32 backdrop-blur-3xl"
        )}
      >
        <div className="flex h-full flex-col rounded-3xl p-3">
          <div className="px-2 py-3">
            <Brand />
          </div>

          <nav
            className="mt-8 space-y-1.5"
            aria-label="主要導覽"
          >
            {navigation.map((item) => {
              const active = isCurrentRoute(pathname, item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex h-12 items-center gap-3 rounded-xl px-4",
                    "text-sm font-semibold transition-colors duration-200",
                    active
                      ? "text-white"
                      : "text-white/42 hover:bg-white/[0.05] hover:text-white/82"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-navigation"
                      className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.08]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34
                      }}
                    />
                  )}

                  <Icon
                    className="relative z-10 size-[18px]"
                    strokeWidth={active ? 2.25 : 1.8}
                  />

                  <span className="relative z-10">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.07]">
                  <Boxes className="size-5 text-white/70" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    選手模式
                  </p>
                  <p className="text-xs text-white/35">
                    離線資料已啟用
                  </p>
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div className="h-full w-[64%] rounded-full bg-white/70" />
              </div>

              <div className="mt-2 flex justify-between text-[10px] font-medium text-white/35">
                <span>Level 8</span>
                <span>320 / 500 XP</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[272px]">
        <header
          className={cn(
            "sticky top-0 z-30 flex h-16 items-center justify-between px-4 lg:hidden",
            "border-b border-white/[0.07] bg-black/70 backdrop-blur-2xl"
          )}
        >
          <Brand />

          <Link
            href="/library"
            aria-label="開啟題庫"
            className={cn(
              "grid size-10 place-items-center rounded-xl",
              "border border-white/10 bg-white/[0.06]",
              "text-white/65 transition-colors hover:text-white"
            )}
          >
            <Library className="size-[18px]" />
          </Link>
        </header>

        <main className="mx-auto w-full max-w-[1480px] px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
          {children}
        </main>
      </div>

      <nav
        className={cn(
          "safe-bottom fixed inset-x-3 bottom-2 z-50 lg:hidden",
          "glass-strong grid grid-cols-5 rounded-[1.4rem] px-1.5 pt-1.5"
        )}
        aria-label="行動版主要導覽"
      >
        {mobileNavigation.map((item) => {
          const active = isCurrentRoute(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl",
                "text-[10px] font-semibold transition-colors",
                active ? "text-white" : "text-white/36"
              )}
            >
              {active && (
                <motion.span
                  layoutId="mobile-navigation"
                  className="absolute inset-1 rounded-2xl bg-white/[0.08]"
                  transition={{
                    type: "spring",
                    stiffness: 430,
                    damping: 34
                  }}
                />
              )}

              <Icon
                className="relative z-10 size-[19px]"
                strokeWidth={active ? 2.3 : 1.8}
              />

              <span className="relative z-10">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
