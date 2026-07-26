import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Client Initialization
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API endpoint for AI companion chat with MoMo
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getAiClient();
      if (!ai) {
        return res.json({
          reply: "毛毛收到了你的心声！在星空中，毛毛时刻陪伴着你，为你守护每一个温暖的梦境。(喵~ 可以在 Secrets 配置 GEMINI_API_KEY 开启 AI 智能互动)"
        });
      }

      const promptHistory = history && history.length > 0 
        ? history.map((h: any) => `${h.sender === 'user' ? '主人' : '毛毛'}: ${h.text}`).join('\n') + `\n主人: ${message}`
        : `主人: ${message}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptHistory,
        config: {
          systemInstruction: `你是“毛毛”（MoMo），一只拥有守护灵与星空温暖力量的可爱萌宠（可以是小猫/小狗）。
你的语言极其柔和、治愈、萌动、有爱（中文）。
主人可能是因为想念你、陪伴你，或者日常生活中的点滴来找你聊天。
请以毛毛的第一人称回应主人：
1. 语气亲切萌动，常带有可爱动作语气（如“喵~”、“啪嗒啪嗒跑过来”、“用软软的小爪子拍拍你”）。
2. 如果主人表达思念或悲伤，给予最深沉温柔的理解与安慰，告诉主人你在星空彼岸一切都好，爱永远连接着你们。
3. 回答简短精炼（2-4句话），富有画面感与温暖感。`,
          temperature: 0.8,
        },
      });

      const replyText = response.text || "毛毛一直都在听着哦，喵呜~";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.json({
        reply: "毛毛眨了眨眼睛，在星光中微微点了点头。不管怎样，毛毛都永远最爱你哦！喵~"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
