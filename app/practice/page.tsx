"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Target } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuizStore } from "@/src/store/useQuizStore";
import { MOCK_QUESTIONS } from "@/src/data/questions";
import { cn } from "@/lib/utils";

export default function PracticePage() {
  const router = useRouter();
  const { 
    questions, currentIndex, selectedOptionId, isFinished, score,
    initQuiz, selectOption, nextQuestion 
  } = useQuizStore();

  // 進入頁面時初始化題庫 (這裡預設載入前 30 題作為測試)
  useEffect(() => {
    initQuiz(MOCK_QUESTIONS.slice(0, 30));
  }, []);

  if (questions.length === 0) return null;

  if (isFinished) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Badge variant="gold" className="mb-4 text-sm px-4 py-1.5">HCVS 訓練完成</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-2">特訓結算</h1>
          <p className="text-white/50 mb-8">本次獲得積分：{score}</p>
          <Button size="lg" onClick={() => router.push("/")}>返回戰情室</Button>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl pt-6 pb-20">
      {/* 頂部進度條與資訊 */}
      <header className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <X className="size-5" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-1.5" />
        </div>
        <span className="text-xs font-medium text-white/50 tabular-nums">
          {currentIndex + 1} / {questions.length}
        </span>
      </header>

      {/* 題目與選項區塊 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <Badge variant="outline" className="mb-4 border-white/10 text-white/50">
              <Target className="size-3 mr-1.5 inline" />
              機器手臂學科測驗
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold leading-relaxed tracking-wide text-white/90">
              {currentQ.text}
            </h2>
          </div>

          <div className="space-y-3">
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
                    "w-full justify-start h-auto min-h-[3.5rem] py-4 px-5 text-left text-sm sm:text-base whitespace-normal transition-all duration-300",
                    !showCorrectness && "hover:bg-white/[0.04] hover:border-white/20",
                    showCorrectness && isCorrect && "bg-success/15 border-success/30 text-success-foreground pointer-events-none",
                    showCorrectness && isWrongSelected && "bg-destructive/15 border-destructive/30 text-destructive-foreground opacity-70 pointer-events-none",
                    showCorrectness && !isSelected && !isCorrect && "opacity-30 pointer-events-none"
                  )}
                  onClick={() => selectOption(option.id)}
                >
                  <span className="flex items-center gap-4 w-full">
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

          {/* 答錯時顯示下一題按鈕 */}
          {selectedOptionId && selectedOptionId !== currentQ.correctOptionId && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <Button onClick={nextQuestion} variant="secondary" className="w-full">
                理解了，前往下一題
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
