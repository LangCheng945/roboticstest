import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Crosshair,
  Flame,
  Gauge,
  Play,
  ShieldCheck,
  Target,
  Trophy
} from "lucide-react";

import { MotionPage } from "@/components/motion-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// --- 模擬資料區 (後續可替換為真實 Store 資料) ---
const metrics = [
  { label: "Day Streak", value: "12 天", caption: "距離個人紀錄還有 3 天", icon: Flame },
  { label: "今日任務", value: "2 / 3", caption: "完成後獲得 100 XP", icon: Trophy },
  { label: "今日 XP", value: "90 XP", caption: "今日目標 150 XP", icon: Target },
  { label: "目前等級", value: "Level 8", caption: "距離 Level 9 還有 180 XP", icon: Gauge }
];

const abilities = [
  { name: "Robot Safety", value: 82 },
  { name: "TCP", value: 68 },
  { name: "Vision", value: 74 },
  { name: "PLC", value: 61 },
  { name: "Coordinate", value: 57 },
];

const tasks = [
  { label: "TCP", current: 5, total: 5, completed: true },
  { label: "Robot Safety", current: 5, total: 5, completed: true },
  { label: "Vision", current: 2, total: 5, completed: false }
];

export default function HomePage() {
  return (
    <MotionPage className="space-y-6">
      
      {/* 頂部 Header：融入競賽名稱 */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge variant="outline" className="mb-2 border-white/20 text-white/60">
            全國中等學校工科技藝競賽 / 機器手臂 (機器人學)
          </Badge>
          <h1 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
            即測即評備戰平台
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
            今天的複習已依照答題表現與遺忘曲線重新安排。準備好繼續訓練了嗎？
          </p>
        </div>

        <Button asChild variant="secondary" className="shrink-0">
          <Link href="/profile">
            查看學習報告
            <ChevronRight className="size-4 ml-1" />
          </Link>
        </Button>
      </header>

      {/* Hero 區塊：每日挑戰 */}
      <Card
        className={cn(
          "relative overflow-hidden border-success/20",
          "bg-[radial-gradient(circle_at_top_right,rgba(126,231,135,0.15),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]"
        )}
      >
        <CardContent className="relative p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success" className="bg-success/20 text-success border-success/30">
                  <ShieldCheck className="size-3 mr-1" />
                  每日挑戰
                </Badge>
                <Badge variant="default" className="bg-white/10 text-white/70 border-none">
                  預計 8 分鐘
                </Badge>
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Precision Sprint
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/60 max-w-lg">
                15 題混合訓練，優先安排 TCP、Coordinate 與最近答錯的觀念。
              </p>

              <div className="mt-6 max-w-md">
                <div className="mb-2 flex items-center justify-between text-xs font-medium">
                  <span className="text-white/50">今日進度</span>
                  <span className="text-white/80">9 / 15</span>
                </div>
                <Progress value={60} indicatorClassName="bg-success" />
              </div>
            </div>

            <Button asChild size="lg" variant="success" className="w-full lg:w-auto shadow-[0_0_20px_rgba(126,231,135,0.3)]">
              <Link href="/practice">
                <Play className="size-4 mr-2 fill-current" />
                繼續訓練
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 四大數據指標 */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="group hover:border-white/20 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-white/50">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-white">{metric.value}</p>
                  </div>
                  <div className="grid size-10 place-items-center rounded-xl bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white transition-colors">
                    <Icon className="size-5" />
                  </div>
                </div>
                <p className="mt-4 text-xs text-white/40">{metric.caption}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* 底部雙欄：能力值與今日任務 */}
      <section className="grid gap-6 lg:grid-cols-12">
        
        {/* 左側：能力值面板 */}
        <Card className="lg:col-span-7 border-white/10 bg-black/20">
          <CardHeader className="flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-lg">能力值</CardTitle>
              <CardDescription className="text-white/50 mt-1">依正確率、答題速度與近期穩定度計算</CardDescription>
            </div>
            <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/50">
              <BrainCircuit className="size-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {abilities.map((ability) => (
              <div key={ability.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">{ability.name}</span>
                  <span className="text-xs font-bold tabular-nums text-white/60">{ability.value}</span>
                </div>
                <Progress
                  value={ability.value}
                  indicatorClassName={
                    ability.value >= 80 ? "bg-success" : ability.value < 65 ? "bg-warning" : "bg-white/80"
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 右側：今日任務清單 */}
        <Card className="lg:col-span-5 border-white/10 bg-black/20">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">今日任務</CardTitle>
                <CardDescription className="text-white/50 mt-1">全部完成可獲得 XP、金幣與徽章進度</CardDescription>
              </div>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/70">2 / 3</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {tasks.map((task) => (
              <div
                key={task.label}
                className={cn(
                  "flex items-center gap-4 rounded-xl border p-4 transition-colors",
                  task.completed ? "border-success/20 bg-success/5" : "border-white/10 bg-white/5"
                )}
              >
                <div
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border",
                    task.completed ? "border-success/30 bg-success/20 text-success" : "border-white/10 bg-white/5 text-white/30"
                  )}
                >
                  {task.completed ? <Check className="size-4" strokeWidth={3} /> : <Crosshair className="size-4" />}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white/90">
                    {task.label} {task.total} 題
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress
                      value={(task.current / task.total) * 100}
                      className="h-1.5"
                      indicatorClassName={task.completed ? "bg-success" : "bg-white/60"}
                    />
                    <span className="shrink-0 text-xs tabular-nums text-white/40">
                      {task.current}/{task.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </section>
    </MotionPage>
  );
}
