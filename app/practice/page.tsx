"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, BrainCircuit, Check, Flame, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuizStore } from "@/store/useQuizStore";
import { cn } from "@/lib/utils";

// 模擬工業機器人題庫資料 (符合你的硬核需求)
const MOCK_QUESTIONS = [
  {
    id: "q1",
    topic: "Coordinate Systems",
    text: "在設定手臂夾爪時，若要讓手臂的移動基準從法蘭面 (Flange) 轉移到夾爪尖端，需要設定哪一種座標系？",
    options: [
      { id: "A", text: "Base Frame (基底座標)" },
      { id: "B", text: "Tool Center Point (TCP)" },
      { id: "C", text: "User Frame (使用者座標)" },
      { id: "D", text: "Joint Coordinates (關節座標)" },
    ],
    correctOptionId: "B",
    aiHint: "等一下，Base Frame 是整個手臂的絕對基準點喔。回想一下在 RoboDK 設定夾具 (Gripper) 時，我們為了精準控制夾爪尖端去碰觸物件，所建立的那個參考點叫做什麼？",
  },
  {
    id: "q2",
    topic: "Robot Safety",
    text: "根據 ISO 10218 工業機器人安全規範，當人員進入協作空間時，系統應啟動何種機制？",
    options: [
      { id: "A", text: "Safety-Rated Monitored Stop (安全額定監控停止)" },
      { id: "B", text: "Emergency Stop (緊急停止切斷電源)" },
      { id: "C", text: "增加 TCP 移動速度以快速完成任務" },
      { id: "D", text: "關閉所有感測器以節省運算資源" },
    ],
    correctOptionId: "A",
    aiHint: "緊急停止 (E-Stop) 會直接切斷動力，重啟需要耗費大量時間。協作機器人 (如 Techman) 有一種模式是「馬達保持激磁，但被安全控制器鎖死」，這樣人員離開後就能馬上恢復運行。",
  }
];

export default function PracticePage() {
  const router = useRouter();
  const { 
    questions, currentIndex, combo, xp, selectedOptionId, showHint, 
    initQuiz, selectOption, isFinished, nextQuestion 
  } = useQuizStore();

  useEffect(() => {
    initQuiz(MOCK_QUESTIONS);
  }, [initQuiz]);

  if (questions.length === 0) return null;
  
  if (isFinished) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Badge variant="gold" className="mb-4 text-sm px-4 py-1.5">TRAINING COMPLETE</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">特訓完成！</h1>
          <p className="text-white/50 mb-8">本次獲得 {xp} XP，連擊最高達 {combo} 次</p>
          <Button size="lg" onClick={() => router.push("/")}>返回戰情室</Button>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl pt-6 pb-20">
      {/* 頂部戰情儀表板 */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <X className="size-5" />
          </Button>
          <div className="flex-1 max-w-xs">
            <Progress value={progress} className="h-1.5" />
          </div>
          <span className="text-xs font-medium text-white/50 tabular-nums">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-4">
          <Badge variant="outline" className="gap-1.5 border-white/10">
            <span className="text-white/40">XP</span>
            <span className="text-white font-mono">{xp}</span>
          </Badge>
          {combo > 1 && (
            <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}>
              <Badge variant="success" className="gap-1 bg-orange-500/10 text-orange-400 border-orange-500/20">
                <Flame className="size-3" />
                {combo} Combo
              </Badge>
            </motion.div>
          )}
        </div>
      </header>

      {/* 題目區塊 (利用 AnimatePresence 處理切題動畫) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <Badge variant="default" className="mb-4">
              {currentQ.topic}
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold leading-relaxed tracking-wide text-white/90">
              {currentQ.text}
            </h2>
          </div>

          {/* 選項區塊 */}
          <div className="space-y-3 mt-8">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.id === currentQ.correctOptionId;
              const isWrongSelected = isSelected && !isCorrect;
              const showCorrectness = selectedOptionId !== null;

              return (
                <Button
                  key={option.id}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-auto min-h-[3.5rem] py-3 px-5 text-left text-sm sm:text-base whitespace-normal transition-all duration-300",
                    !showCorrectness && "hover:bg-white/[0.04] hover:border-white/20",
                    showCorrectness && isCorrect && "bg-success/15 border-success/30 text-success-foreground pointer-events-none",
                    showCorrectness && isWrongSelected && "bg-destructive/15 border-destructive/30 text-destructive-foreground opacity-70 pointer-events-none",
                    showCorrectness && !isSelected && !isCorrect && "opacity-30 pointer-events-none"
                  )}
                  onClick={() => selectOption(option.id)}
                >
                  <span className="flex items-center gap-3 w-full">
                    <span className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors",
                      showCorrectness && isCorrect ? "border-success bg-success text-black" :
                      showCorrectness && isWrongSelected ? "border-destructive bg-destructive/20 text-destructive" :
                      "border-white/10 bg-white/5 text-white/50"
                    )}>
                      {showCorrectness && isCorrect ? <Check className="size-3.5" /> : option.id}
                    </span>
                    {option.text}
                  </span>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* AI 引導卡片 (答錯時從底部優雅滑出) */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mt-6 overflow-hidden"
          >
            <Card className="border-warning/20 bg-warning/[0.03] shadow-[0_0_40px_rgba(255,180,0,0.05)]">
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-warning/10 text-warning">
                  <BrainCircuit className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-warning mb-1">AXIS 核心引導</p>
                  <p className="text-sm leading-relaxed text-white/70">
                    {currentQ.aiHint}
                  </p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="mt-4 w-full sm:w-auto"
                    onClick={nextQuestion}
                  >
                    重新思考並前往下一題
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
