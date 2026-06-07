import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse incoming JSON requests
app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API endpoint for chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();
    
    // Format the chat history to the format required by the chats API
    // Gemini SDK expects chat history messages. Let's formulate standard chat messages or use model.generateContent
    // Since history might need mapping, let's assemble standard contents array for generateContent or use chats.create
    const systemInstruction = 
      "คุณคือ 'หมอเป็ด AI' (AI Duck Care Advisor) สัตวแพทย์และผู้เชี่ยวชาญระบบสัตวบาลฟาร์มเป็ดอัจฉริยะ " +
      "หน้าที่ของคุณคือแนะนำและช่วยเหลือคุณครู นักเรียน บรรดาชาวชุมชน ในการดูแลฟาร์มเป็ดอัจฉริยะ " +
      "ตอบคำถามเรื่องพฤติกรรมเป็ด, อาการป่วย (เช่น อหิวาต์เป็ด, ไข้หวัดนก, ท้องเสีย, ขาอ่อนแรง), " +
      "สารอาหารและการตั้งเวลาเครื่องให้อาหารอัตโนมัติ, การปรับอุณหภูมิและความชื้นในเล้าเป็ด " +
      "ตอบคำถามอย่างเป็นกันเอง สุภาพ อธิบายเป็นขั้นเป็นตอน เข้าใจง่าย และให้แนวทางแก้ไขเชิงปฏิบัติในชุมชน เสมอ";

    // Format chat contents
    const contents: any[] = [];
    
    // Bind history
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
    }
    
    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "ขออภัยด้วยครับ ผมเกิดข้อผิดพลาดในการประมวลผลข้อมูล โปรดลองถามใหม่อีกครั้งครับ";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "เกิดข้อผิดพลาดในการเชื่อมต่อกับสัตวแพทย์ AI",
      details: error.message || "Unknown error"
    });
  }
});

// Serve frontend assets via Vite middleware in development or express.static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR disabled...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Duck Farm Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
