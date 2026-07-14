"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Crosshair, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 模擬登入行為
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 這裡未來可以替換成真實的 Supabase 登入邏輯
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* 背景科技光影特效 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(126,231,135,0.15),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_50%)]" />
      
      {/* 動態光環 */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[40vh] -left-[20vw] size-[80vh] rounded-full border border-white/[0.02] bg-white/[0.01]" 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-5"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 grid size-16 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <Crosshair className="size-8 text-white/90" strokeWidth={2} />
          </div>
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-white/50">
            全國中等學校工科技藝競賽
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            系統存取授權
          </h1>
        </div>

        <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">登入戰情中心</CardTitle>
            <CardDescription className="text-white/50">
              請輸入選手憑證以載入您的個人訓練數據
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 size-4 text-white/40" />
                  <input
                    type="email"
                    placeholder="選手信箱 (Email)"
                    required
                    className={cn(
                      "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white transition-colors",
                      "placeholder:text-white/30 focus:border-success/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-success/50"
                    )}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 size-4 text-white/40" />
                  <input
                    type="password"
                    placeholder="存取密碼 (Password)"
                    required
                    className={cn(
                      "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white transition-colors",
                      "placeholder:text-white/30 focus:border-success/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-success/50"
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="success"
                size="lg"
                disabled={isLoading}
                className="mt-6 w-full shadow-[0_0_20px_rgba(126,231,135,0.2)]"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="size-5 rounded-full border-2 border-black/30 border-t-black"
                  />
                ) : (
                  <>
                    驗證並登入
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-white/30">
          尚未取得憑證？請向指導教練申請選手帳號。
        </p>
      </motion.div>
    </div>
  );
}
