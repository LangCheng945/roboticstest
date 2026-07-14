"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 模擬登入行為並跳轉
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // 在此處可加入寫入 Token 的邏輯，讓 middleware 放行
      router.push("/");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#050505] text-white selection:bg-indigo-500/30">
      
      {/* ================= 左側：品牌視覺區 (Desktop 專屬) ================= */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-white/[0.03] bg-[#0A0D14] p-12 lg:flex">
        
        {/* 背景環境光暈 */}
        <div className="absolute -left-1/4 top-0 size-[800px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute -bottom-1/4 right-0 size-[600px] rounded-full bg-blue-500/10 blur-[100px]" />

        {/* 左上角 Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] shadow-lg shadow-indigo-500/20">
            <Bot className="size-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">Robot Academy</span>
        </div>

        {/* 中央巨型漸層 Icon */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* 圖示背後的強烈發光層 */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-[80px]" />
            
            <Bot
              className="relative z-10 size-80 drop-shadow-[0_0_50px_rgba(99,102,241,0.3)]"
              strokeWidth={1.2}
              style={{ stroke: "url(#blue-purple-gradient)" }}
            />
            
            {/* 隱藏的 SVG 定義，用來渲染上方 Icon 的紫藍漸層邊線 */}
            <svg width="0" height="0">
              <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#A78BFA" offset="0%" />
                <stop stopColor="#60A5FA" offset="100%" />
              </linearGradient>
            </svg>
          </motion.div>
        </div>

        {/* 左下角文案 */}
        <div className="relative z-10 max-w-xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white/95">
            從零開始，探索機器人世界
          </h1>
          <p className="text-[17px] leading-relaxed text-white/40">
            學習機器人基礎、感測器、程式設計與人工智慧，按照自己的速度完成每一堂課。
          </p>
        </div>
      </div>

      {/* ================= 右側：登入與註冊表單區 ================= */}
      <div className="flex w-full flex-1 items-center justify-center bg-[#07090E] p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[440px]"
        >
          {/* 表單卡片主體 */}
          <div className="rounded-[2rem] border border-white/5 bg-[#12151E] p-8 shadow-2xl sm:p-10">
            
            {/* 頂部狀態標籤 */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              學習平台已準備就緒
            </div>

            <h2 className="mb-2 text-3xl font-bold tracking-tight">歡迎回來</h2>
            <p className="mb-8 text-sm leading-relaxed text-white/40">
              登入帳號以繼續你的學習進度，或建立新的本機帳號。
            </p>

            {/* 登入 / 註冊 頁籤切換 */}
            <div className="mb-8 flex rounded-xl border border-white/5 bg-[#090B10] p-1.5">
              <button
                onClick={() => setIsLogin(true)}
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300",
                  isLogin ? "bg-[#5B43EA] text-white shadow-lg" : "text-white/40 hover:text-white/80"
                )}
              >
                登入
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300",
                  !isLogin ? "bg-[#5B43EA] text-white shadow-lg" : "text-white/40 hover:text-white/80"
                )}
              >
                建立帳號
              </button>
            </div>

            {/* 表單輸入區 */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold tracking-wider text-white/60">
                    電子郵件
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 size-4 text-white/30" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="w-full rounded-xl border border-white/5 bg-[#090B10] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 focus:border-[#5B43EA] focus:bg-[#0E111A] focus:outline-none focus:ring-1 focus:ring-[#5B43EA] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold tracking-wider text-white/60">
                    密碼
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 size-4 text-white/30" />
                    <input
                      type="password"
                      placeholder="輸入你的密碼"
                      required
                      className="w-full rounded-xl border border-white/5 bg-[#090B10] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 focus:border-[#5B43EA] focus:bg-[#0E111A] focus:outline-none focus:ring-1 focus:ring-[#5B43EA] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 記住我 & 忘記密碼 */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="size-4 rounded-[4px] border border-white/20 bg-[#090B10] transition-colors peer-checked:border-[#5B43EA] peer-checked:bg-[#5B43EA]" />
                    <Check className="absolute size-3 text-white opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors">
                    記住登入狀態
                  </span>
                </label>
                
                <button type="button" className="text-xs font-medium text-[#7C3AED] hover:text-[#9355EA] transition-colors">
                  忘記密碼？
                </button>
              </div>

              {/* 提交按鈕 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-4 h-[52px] w-full rounded-xl bg-[#5B43EA] text-[15px] font-semibold text-white hover:bg-[#4F39D1] active:bg-[#4531B5] shadow-[0_0_30px_rgba(91,67,234,0.25)] transition-all"
              >
                {isLoading ? (
                  <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    {isLogin ? "登入 Robot Academy" : "建立帳號並開始"}
                    <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </form>

            {/* 底部免責聲明 */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4 text-[11px] leading-[1.7] text-emerald-100/50">
              <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-emerald-500/70" />
              <p>
                此版本使用瀏覽器本機儲存空間紀錄您的學習進度，不會將資料回傳至任何外部伺服器。若是展示用途，不適合儲存真正的密碼。
              </p>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
