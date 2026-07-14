// 把 robotics.html 裡面的 questionBank 陣列完整複製貼到這裡
const rawQuestions = [
  { q: "1. 多軸關節式機器人(機器手臂)的特點是高自由度與靈活性...", options: ["(A) 汽車板金噴漆", "(B) 食品自動化整列", "(C) 手機外殼去毛邊及拋光", "(D) 汽車底盤焊接"], ans: 1 },
  { q: "2. 下列何種感測器可以測距離？", options: ["(A) 超音波感測器", "(B) 紅外線感測器", "(C) 雷射光感測器", "(D) 以上皆是"], ans: 3 },
  // ... 貼上所有的題目 ...
];

// 自動清洗與格式化資料，供給前端 UI 使用
export const MOCK_QUESTIONS = rawQuestions.map((item, index) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  return {
    id: `q_${index + 1}`,
    // 清除題目開頭的數字序號
    text: item.q.replace(/^\d+\.\s*/, ''),
    options: item.options.map((opt, optIndex) => ({
      id: letters[optIndex],
      // 清除選項開頭的括號與字母
      text: opt.replace(/^\([A-D]\)\s*/, '')
    })),
    correctOptionId: letters[item.ans],
  };
});
