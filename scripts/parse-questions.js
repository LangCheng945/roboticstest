// scripts/parse-questions.js
const fs = require('fs');

// 將你 HTML 裡的 questionBank 陣列貼到這裡
const rawQuestions = [
    { q: "1. 多軸關節式機器人(機器手臂)的特點是高自由度與靈活性，常應用於物件的搬運，如取放與堆疊或複雜的加工、零組件的組裝或是工件去毛邊；並聯式機器人(Delta Robot)的特點是工作範圍僅限於手臂末端附近的圓柱狀區域與運作速度快，精度高且累積誤差小，工業上常搭配視覺系統來運作。試問下列何者適合以並聯式機器人來開發？", options: ["(A) 汽車板金噴漆", "(B) 食品自動化整列", "(C) 手機外殼去毛邊及拋光", "(D) 汽車底盤焊接"], ans: 1 },
    { q: "2. 下列何種感測器可以測距離？", options: ["(A) 超音波感測器", "(B) 紅外線感測器", "(C) 雷射光感測器", "(D) 以上皆是"], ans: 3 },
    { q: "3. 下列何種通訊方式不屬於無線傳輸？", options: ["(A) Wi-Fi", "(B) Bluetooth 藍芽", "(C) ZigBee", "(D) RS232"], ans: 3 },
    // ... 可以把全部 258 題都貼進來
];

function transformQuestions(data) {
    const letters = ['A', 'B', 'C', 'D'];
    
    return data.map((item, index) => {
        // 清除題目開頭的數字序號 (e.g., "1. " -> "")
        const cleanText = item.q.replace(/^\d+\.\s*/, '');
        
        const options = item.options.map((opt, optIndex) => ({
            id: letters[optIndex],
            // 清除選項開頭的字母標籤 (e.g., "(A) " -> "")
            text: opt.replace(/^\([A-D]\)\s*/, '')
        }));

        // 這裡可以依據關鍵字進行簡單的分類 (Topic)
        let topic = "General Robotics";
        if (cleanText.includes("感測器") || cleanText.includes("視覺") || cleanText.includes("紅外線")) topic = "Sensors & Vision";
        else if (cleanText.includes("馬達") || cleanText.includes("扭力") || cleanText.includes("減速機")) topic = "Actuators & Mechanics";
        else if (cleanText.includes("座標") || cleanText.includes("運動學") || cleanText.includes("自由度")) topic = "Kinematics";

        return {
            id: `q_${index + 1}`,
            topic: topic,
            text: cleanText,
            options: options,
            correctOptionId: letters[item.ans],
            // 先給個預設的提示，之後可以串接 AI API 批次生成更詳細的解釋
            aiHint: `這題的關鍵在於了解 ${topic} 的基本特性，試著回想一下相關的實務操作經驗。` 
        };
    });
}

const formattedData = transformQuestions(rawQuestions);

fs.writeFileSync('./src/data/question-bank.json', JSON.stringify(formattedData, null, 2));
console.log('✅ 題庫轉換完成！檔案已儲存至 src/data/question-bank.json');
