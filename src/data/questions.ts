// src/data/questions.ts

// 1. 這裡貼上你原本 HTML 裡的 258 題
const rawQuestions = [
  { q: "1. 多軸關節式機器人(機器手臂)的特點是高自由度與靈活性...", options: ["(A) 汽車板金噴漆", "(B) 食品自動化整列", "(C) 手機外殼去毛邊及拋光", "(D) 汽車底盤焊接"], ans: 1 },
  { q: "2. 下列何種感測器可以測距離？", options: ["(A) 超音波感測器", "(B) 紅外線感測器", "(C) 雷射光感測器", "(D) 以上皆是"], ans: 3 },
  // ... 請把剩下的題目都貼到這裡
];

// 2. 自動轉換邏輯 (Next.js 會在編譯時處理好)
export const MOCK_QUESTIONS = rawQuestions.map((item, index) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  // 清除題目開頭的數字序號 (e.g., "1. " -> "")
  const cleanText = item.q.replace(/^\d+\.\s*/, '');
  
  const options = item.options.map((opt, optIndex) => ({
    id: letters[optIndex],
    // 清除選項開頭的字母標籤 (e.g., "(A) " -> "")
    text: opt.replace(/^\([A-D]\)\s*/, '')
  }));

  // 簡單的關鍵字分類邏輯
  let topic = "General Robotics";
  if (cleanText.includes("感測") || cleanText.includes("視覺") || cleanText.includes("辨識")) topic = "Sensors & Vision";
  else if (cleanText.includes("馬達") || cleanText.includes("扭力") || cleanText.includes("伺服")) topic = "Actuators & Mechanics";
  else if (cleanText.includes("座標") || cleanText.includes("運動學") || cleanText.includes("自由度")) topic = "Kinematics";
  else if (cleanText.includes("安全") || cleanText.includes("ISO")) topic = "Robot Safety";

  return {
    id: `q_${index + 1}`,
    topic: topic,
    text: cleanText,
    options: options,
    correctOptionId: letters[item.ans],
    // 預設的引導提示
    aiHint: `這題的關鍵在於了解 ${topic} 的基本特性，試著回想一下在實機設定時的參數與物理限制。` 
  };
});
