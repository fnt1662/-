import React, { useState, useRef, useEffect } from "react";
import { MessageSquareText, Send, Sparkles, AlertCircle, RefreshCw, Feather } from "lucide-react";
import { Message } from "../types";

export const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      role: "model",
      content: "สวัสดีครับ! ผมคือ **หมอเป็ด AI** (AI Duck Advisor) ผู้ดูแลทางด้านสัตวบาลประจำระบบฟาร์มเป็ดอัจฉริยะของคุณ 🌱\n\nมีคำถามเกี่ยวกับพฤติกรรมเป็ด, สูตรอาหารอัตโนมัติ, โรคระบาดอหิวาต์เป็ด, หรือต้องการถามวิธีรักษาเป็ดป่วยตัวอื่น ๆ สอบถามมาได้เลยครับ!",
      timestamp: "เมื่อสักครู่"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMessage: Message = {
      id: `m-u-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น."
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          // Extract only role and content for history
          history: messages.slice(-10).map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error("ล้มเหลวในการเชื่อมต่อกับเซิร์ฟเวอร์หมอเป็ด AI");
      }

      const data = await response.json();
      
      const modelMessage: Message = {
        id: `m-m-${Date.now()}`,
        role: "model",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) + " น."
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูลจาก AI หมอเป็ด");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const quickQuestions = [
    "เป็ดตัวร้อนแยกฝูงซึม มีอาการคอตกสั่น ควรปฐมพยาบาลเบื้องต้นอย่างไร?",
    "สูตรอาหารเป็ดไข่ที่เหมาะสมที่สุดควรมีคุณค่าโภชนาการอย่างไร?",
    "สภาพอุณหภูมิและความชื้นสัมพัทธ์ในดล้าเป็ดที่เหมาะสมที่สุดคือเท่าไหร่?",
    "มีวิธีการคัดกรองโรคไข้หวัดนก และการจัดการสุขอนามัยชุมชนอย่างไรบ้าง?"
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-8 space-y-8" id="ai-doctor-chat-view">
      <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-xl shadow-emerald-200/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Gemini 3.5 Flash Powered
          </div>
          <h2 className="text-2xl font-extrabold font-sans">
            สัตวแพทย์และผู้เชี่ยวชาญเป็ด AI ประจำบ้าน
          </h2>
          <p className="text-sm text-emerald-100 font-sans leading-relaxed max-w-xl">
            สอบถามข้อมูลได้ทันทีเพื่อดูแลรักษาฝูงเป็ด ปรับแต่งอัตราปริมาณการจ่ายอาหารและวิเคราะห์ระบบตรวจจับความผิดปกติ ช่วยเกษตรกรและนักเรียนไขปริศนาสรีระและวิธีป้องกันโรค
          </p>
        </div>
        <div className="bg-emerald-500 p-4 rounded-2xl shrink-0 text-white border border-emerald-400">
          <Feather className="w-12 h-12 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Quick Questions suggestion panel (1 column) */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">คำถามยอดนิยม</h3>
          <div className="flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 select-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-left text-xs bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-100 hover:border-emerald-200/50 p-3.5 rounded-2xl shadow-xs transition-all shrink-0 w-64 lg:w-full leading-normal"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area (3 columns) */}
        <div className="lg:col-span-3 bg-white border border-emerald-100 rounded-3xl shadow-xl flex flex-col h-[520px] overflow-hidden">
          
          {/* Box Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h4 className="text-sm font-bold text-gray-800">สนทนาแบบสด</h4>
            </div>
            <button 
              onClick={() => {
                setMessages([
                  {
                    id: "m-welcome",
                    role: "model",
                    content: "สวัสดีครับ! ผมคือ **หมอเป็ด AI** (AI Duck Advisor) ผู้ดูแลทางด้านสัตวบาลประจำระบบฟาร์มเป็ดอัจฉริยะของคุณ 🌱\n\nมีคำถามเกี่ยวกับพฤทีพฤติกรรมเป็ด, สูตรอาหารอัตโนมัติ, โรคระบาดอหิวาต์เป็ด, หรือต้องการถามวิธีรักษาเป็ดป่วยตัวอื่น ๆ สอบถามมาได้เลยครับ!",
                    timestamp: "เมื่อสักครู่"
                  }
                ]);
                setErrorStatus(null);
              }}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 bg-white hover:bg-gray-100 border border-gray-200/60 px-2.5 py-1 rounded-lg"
            >
              <RefreshCw className="w-3 h-3" /> ล้างหน้าแชท
            </button>
          </div>

          {/* Chat bubbles container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`p-4 rounded-2xl leading-relaxed text-sm shadow-xs ${
                  m.role === "user" 
                    ? "bg-emerald-600 text-white rounded-br-none" 
                    : "bg-gray-100 text-gray-800 rounded-bl-none whitespace-pre-line"
                }`}>
                  <p className="font-sans font-medium">{m.content}</p>
                  <span className="block mt-1.5 text-[9px] text-right opacity-60">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="bg-gray-100 text-gray-600 p-4 rounded-2xl rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs font-medium text-gray-500 font-sans">หมอเป็ด AI กำลังพิมพ์วิเคราะห์อาการ...</span>
                  </div>
                </div>
              </div>
            )}

            {errorStatus && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-2.5 text-red-900 mt-2">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-xs">{errorStatus}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-100 bg-gray-50/50 flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="สอบถามเกี่ยวกับความปลอดภัย การรักษา หรือสูตรอาหารเป็ด..."
              className="flex-1 bg-white border border-gray-200 focus:border-emerald-500 focus:outline-none rounded-xl px-4 py-3.5 text-sm transition-colors shadow-inner"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 text-white p-3.5 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
