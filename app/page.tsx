import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Clock3,
  Crosshair,
  Flame,
  Gauge,
  LockKeyhole,
  Play,
  RotateCcw,
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

const metrics: Array<{
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
}> = [
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
  { name: "Robot Structure", value: 79 },
  { name: "Industrial Robot", value: 86 }
];

const tasks = [
  { label: "TCP", current: 5, total: 5, completed: true },
  { label: "Robot Safety", current: 5, total: 5, completed: true },
  { label: "Vision", current: 2, total: 5, completed: false }
];

function MetricCard({ label, value, caption, icon: Icon }: (typeof metrics)[number]) {
  return (
    <Card className="group hover:-translate-y-0.5 hover:border-white/15 hover:shadow-lift">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-white/42">{label}</p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.035em]">{value}</p>
          </div>
          <div
            className={cn(
              "grid size-10 place-items-center rounded-xl",
              "border border-white/10 bg-white/[0.06]",
              "text-white/65 transition-colors group-hover:bg-white/[0.1] group-hover:text-white"
            )}
          >
            <Icon className="size-[18px]" />
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-white/32">{caption}</p>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <MotionPage className="space-y-5 sm:space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge variant="outline">TODAY</Badge>
          <h1 className="mt-3 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
            準備好繼續訓練了嗎？
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            今天的複習已依照答題表現與遺忘曲線重新安排。
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/profile">
            查看學習報告
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </header>

      <Card
        className={cn(
          "relative overflow-hidden border-white/15",
          "bg-[radial-gradient(circle_at_top_right,rgba(126,231,135,0.12),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.025))]"
        )}
      >
        <div className="absolute -right-20 -top-24 size-72 rounded-full border border-white/[0.05]" />
        <div className="absolute -right-8 -top-12 size-44 rounded-full border border-white/[0.08]" />

        <CardContent className="relative p-5 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">
                  <ShieldCheck className="size-3" />
                  每日挑戰
                </Badge>
                <Badge variant="default">預計 8 分鐘</Badge>
              </div>
              <h2 className="mt-5 max-w-2xl text-2xl font-bold tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                Precision Sprint
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/48 sm:text-base">
                15 題混合訓練，優先安排 TCP、Coordinate 與最近答錯的觀念。
              </p>
              <div className="mt-6 max-w-xl">
                <div className="mb-2 flex items-center justify-between text-xs font-medium">
                  <span className="text-white/42">今日進度</span>
                  <span className="text-white/72">9 / 15</span>
                </div>
                <Progress value={60} indicatorClassName="bg-success" />
              </div>
            </div>
            <Button asChild size="lg" variant="success" className="w-full lg:w-auto">
              <Link href="/practice">
                <Play className="size-4 fill-current" />
                繼續訓練
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>能力值</CardTitle>
              <CardDescription>依正確率、答題速度與近期穩定度計算</CardDescription>
            </div>
            <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-white/55">
              <BrainCircuit className="size-[18px]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {abilities.map((ability) => (
              <div key={ability.name}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-white/72">{ability.name}</span>
                  <span className="text-xs font-bold tabular-nums text-white/52">{ability.value}</span>
                </div>
                <Progress
                  value={ability.value}
                  indicatorClassName={
                    ability.value >= 80 ? "bg-success" : ability.value < 65 ? "bg-warning" : "bg-white/78"
                  }
                />
              </div>
            ))}
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link href="/learn">
                查看完整能力分析
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>今日任務</CardTitle>
                <CardDescription>全部完成可獲得 XP、金幣與徽章進度</CardDescription>
              </div>
              <Badge variant="gold">2 / 3</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.label}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3.5",
                  task.completed ? "border-success/15 bg-success/[0.06]" : "border-white/[0.08] bg-white/[0.03]"
                )}
              >
                <div
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg border",
                    task.completed ? "border-success/20 bg-success/12 text-success" : "border-white/10 bg-white/[0.04] text-white/28"
                  )}
                >
                  {task.completed ? <Check className="size-4" strokeWidth={2.5} /> : <Crosshair className="size-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{task.label} {task.total} 題</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress
                      value={(task.current / task.total) * 100}
                      className="h-1.5"
                      indicatorClassName={task.completed ? "bg-success" : "bg-white/60"}
                    />
                    <span className="shrink-0 text-[10px] tabular-nums text-white/35">
                      {task.current}/{task.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 rounded-xl border border-dashed border-white/10 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-white/48">完成獎勵</p>
                  <p className="mt-1 text-sm font-bold">100 XP · 50 金幣</p>
                </div>
                <Trophy className="size-5 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>弱點與複習</CardTitle>
                <CardDescription>系統已重新安排今日複習內容</CardDescription>
              </div>
              <RotateCcw className="size-5 text-white/42" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <Clock3 className="size-4 text-white/42" />
                <p className="mt-3 text-xl font-bold">18.4s</p>
                <p className="mt-1 text-xs text-white/35">平均答題速度</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <Target className="size-4 text-warning" />
                <p className="mt-3 text-xl font-bold">8 題</p>
                <p className="mt-1 text-xs text-white/35">今日待複習</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-warning/15 bg-warning/[0.05] p-4">
              <p className="text-xs font-semibold text-warning">常錯章節</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="warning">TCP</Badge>
                <Badge variant="warning">Coordinate</Badge>
                <Badge variant="outline">Vision</Badge>
              </div>
            </div>
            <Button asChild variant="secondary" className="mt-4 w-full">
              <Link href="/review">
                開始今日複習
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "relative overflow-hidden lg:col-span-7",
            "border-white/15",
            "bg-[radial-gradient(circle_at_right_top,rgba(255,213,92,0.1),transparent_42%),rgba(255,255,255,0.045)]"
          )}
        >
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Badge variant="gold">BOSS CHALLENGE</Badge>
                <CardTitle className="mt-4 text-xl">FANUC Challenge</CardTitle>
                <CardDescription className="mt-1">完成 Industrial Robot 章節後解鎖</CardDescription>
              </div>
              <div className="grid size-12 place-items-center rounded-2xl border border-gold/20 bg-gold/10 text-gold">
                <LockKeyhole className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white/42">章節完成度</span>
                <span className="font-bold text-white/72">87%</span>
              </div>
              <Progress value={87} className="mt-3" indicatorClassName="bg-gold" />
              <p className="mt-3 text-xs leading-5 text-white/35">Boss 分數達 90 分以上，才能解鎖下一章。</p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="flex-1">
                <Link href="/learn">查看章節</Link>
              </Button>
              <Button disabled className="flex-1">尚未解鎖</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </MotionPage>
  );
}
