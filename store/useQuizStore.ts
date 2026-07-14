import { create } from "zustand";

export interface Question {
  id: string;
  topic: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  aiHint: string; // 答錯時的 AI 引導
}

interface QuizState {
  questions: Question[];
  currentIndex: number;
  combo: number;
  maxCombo: number;
  xp: number;
  isFinished: boolean;
  selectedOptionId: string | null;
  showHint: boolean;
  
  // Actions
  initQuiz: (questions: Question[]) => void;
  selectOption: (optionId: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  combo: 0,
  maxCombo: 0,
  xp: 0,
  isFinished: false,
  selectedOptionId: null,
  showHint: false,

  initQuiz: (questions) => set({ 
    questions, currentIndex: 0, combo: 0, maxCombo: 0, xp: 0, isFinished: false, selectedOptionId: null, showHint: false 
  }),

  selectOption: (optionId) => {
    const state = get();
    if (state.selectedOptionId) return; // 鎖定作答

    const currentQ = state.questions[state.currentIndex];
    const isCorrect = optionId === currentQ.correctOptionId;

    if (isCorrect) {
      const newCombo = state.combo + 1;
      set({
        selectedOptionId: optionId,
        combo: newCombo,
        maxCombo: Math.max(state.maxCombo, newCombo),
        xp: state.xp + 15 + (newCombo > 2 ? 5 : 0), // Combo 獎勵加成
        showHint: false,
      });
      
      // 答對後自動延遲進入下一題 (配合 UI 動畫)
      setTimeout(() => get().nextQuestion(), 1200);
    } else {
      set({
        selectedOptionId: optionId,
        combo: 0, // 斷 Combo
        showHint: true, // 觸發 AI 引導卡片
      });
    }
  },

  nextQuestion: () => {
    const state = get();
    if (state.currentIndex >= state.questions.length - 1) {
      set({ isFinished: true });
    } else {
      set({
        currentIndex: state.currentIndex + 1,
        selectedOptionId: null,
        showHint: false,
      });
    }
  },

  resetQuiz: () => set({ 
    currentIndex: 0, combo: 0, maxCombo: 0, xp: 0, isFinished: false, selectedOptionId: null, showHint: false 
  }),
}));
