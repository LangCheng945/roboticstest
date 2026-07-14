import { create } from "zustand";

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

interface QuizState {
  questions: Question[];
  currentIndex: number;
  selectedOptionId: string | null;
  isFinished: boolean;
  score: number;
  
  initQuiz: (questions: Question[]) => void;
  selectOption: (optionId: string) => void;
  nextQuestion: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  selectedOptionId: null,
  isFinished: false,
  score: 0,

  initQuiz: (questions) => set({ 
    questions, currentIndex: 0, selectedOptionId: null, isFinished: false, score: 0 
  }),

  selectOption: (optionId) => {
    const state = get();
    if (state.selectedOptionId) return; // 鎖定作答，防止重複點擊

    const isCorrect = optionId === state.questions[state.currentIndex].correctOptionId;
    
    set({ selectedOptionId: optionId });

    if (isCorrect) {
      set({ score: state.score + 10 }); // 答對加分
      setTimeout(() => get().nextQuestion(), 1000); // 答對 1 秒後自動跳下一題
    }
  },

  nextQuestion: () => {
    const state = get();
    if (state.currentIndex >= state.questions.length - 1) {
      set({ isFinished: true });
    } else {
      set({ currentIndex: state.currentIndex + 1, selectedOptionId: null });
    }
  },
}));
