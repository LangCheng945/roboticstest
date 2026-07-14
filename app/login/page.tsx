"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Crosshair, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // 在 LoginPage 元件中修改 handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const email = (e.target as any)[0].value;
  const password = (e.target as any)[1].value;

  if (isLogin) {
    // 執行登入
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("登入失敗：" + error.message);
    else router.push("/");
  } else {
    // 執行註冊
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("註冊失敗：" + error.message);
    else alert("註冊成功！請檢查信箱驗證。");
  }
  
  setIsLoading(false);
};

  return (
    <div className="flex min-h-screen w-full bg-black text-white selection:bg-white/20">
      
      {/* ================= 左側：極簡黑灰視覺區 (Desktop 專屬) ================= */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-white/10 bg-[#050505] p-12 lg:flex">
        
        {/* 背景：工業風細緻網格 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />

        {/* 左上角 Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <Crosshair className="size-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-bold tracking-[0.2em]">AXIS ROBOTICS</span>
        </div>

        {/* 中央極簡圖形 */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative grid place-items-center"
          >
            {/* 外圈細線 */}
            <div className="absolute size-[28rem] rounded-full border border-white/[0.03]" />
            <div className="absolute size-[20rem] rounded-full border border-white/[0.05]" />
            {/* 核心十字標 */}
            <Crosshair className="size-32 text-white/10" strokeWidth={0.5} />
          </motion.div>
        </div>

        {/* 左下角文案 */}
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-white/40">
            全國中等學校工科技藝競賽
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white/90">
            即測即評備戰系統
          </h1>
          <p className="text-sm leading-relaxed text-white/40">
            登入以存取您的個人訓練數據、遺忘曲線分析與工業機器人專屬題庫。系統已採用離線優先架構，確保訓練不中斷。
          </p>
        </div>
      </div>

      {/* ================= 右側：黑白高對比表單區 ================= */}
      <div className="flex w-full flex-1 items-center justify-center bg-[#0A0A0A] p-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          {/* 狀態標籤 */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60">
            <span className="size-1.5 rounded-full bg-white/80" />
            系統連線正常
          </div>

          <h2 className="mb-2 text-2xl font-bold tracking-tight text-white/90">
            {isLogin ? "登入戰情中心" : "建立選手授權"}
          </h2>
          <p className="mb-8 text-sm text-white/40">
            請使用您的選手電子郵件繼續。
          </p>

          {/* 登入 / 註冊 頁籤切換 (Apple Style) */}
          <div className="mb-8 flex rounded-lg border border-white/10 bg-black p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-semibold transition-all duration-200",
                isLogin ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/80"
              )}
            >
              登入
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-semibold transition-all duration-200",
                !isLogin ? "bg-white text-black shadow-sm" : "text-white/40 hover:text-white/80"
              )}
            >
              註冊
            </button>
          </div>

          {/* 表單輸入區 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only">電子郵件</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 size-4 text-white/30" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 focus:border-white/30 focus:bg-white/5 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="sr-only">密碼</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 size-4 text-white/30" />
                <input
                  type="password"
                  placeholder="輸入存取密碼"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/20 focus:border-white/30 focus:bg-white/5 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="size-4 rounded-[4px] border border-white/20 bg-black transition-colors peer-checked:border-white peer-checked:bg-white" />
                  <Check className="absolute size-3 text-black opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-white/50 group-hover:text-white/80 transition-colors">
                  保持登入
                </span>
              </label>
              
              <button type="button" className="text-xs font-medium text-white/50 hover:text-white transition-colors">
                忘記密碼？
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-12 w-full rounded-xl bg-white text-sm font-bold text-black hover:bg-zinc-200 active:scale-[0.98] transition-all"
            >
              {isLoading ? (
                <div className="size-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
              ) : (
                <>
                  {isLogin ? "登入系統" : "建立帳號"}
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </form>

          {/* 底部免責聲明 */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-[11px] leading-relaxed text-white/40">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-white/30" />
            <p>
              此版本使用瀏覽器本機儲存空間紀錄您的學習進度。若是展示用途，不適合儲存真正的機密密碼。
            </p>
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
