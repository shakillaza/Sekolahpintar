import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google Gemini AI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({
    status: "online",
    system: "Smart AI School Management System",
    version: "1.0.0-phase1",
    timestamp: new Date().toISOString(),
  });
});

// AI Assistant endpoint for Smart School AI features
app.post("/api/ai/assistant", async (req, res) => {
  try {
    const { prompt, context, role, schoolType } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt parameter is required." });
    }

    const systemInstruction = `Anda adalah Asisten AI Utama untuk Smart AI School Management System. 
Anda membantu stakeholder sekolah di Indonesia (Role: ${role || "Stakeholder"}, Tipe Sekolah: ${schoolType || "Umum"}).
Berikan jawaban yang profesional, solutif, ringkas, dan relevan dengan regulasi serta praktik terbaik tata kelola sekolah di Indonesia (Kurikulum Merdeka, Manajemen Keuangan Sekolah, Administrasi Akademik, dsb).
Formatlah output menggunakan Markdown yang rapi dengan poin-poin yang mudah dibaca.
Konteks aplikasi saat ini: ${context || "Umum"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Maaf, sistem AI sedang tidak dapat memproses tanggapan saat ini.";
    return res.json({ reply, timestamp: new Date().toISOString() });
  } catch (error: any) {
    console.error("AI Assistant API Error:", error);
    return res.status(500).json({
      error: "Gagal memproses rekomendasi AI.",
      details: error.message || "Unknown error",
    });
  }
});

// AI School Report Insights Generator
app.post("/api/ai/generate-insights", async (req, res) => {
  try {
    const { role, stats } = req.body;

    const systemInstruction = `Anda adalah AI School Analytics Specialist. 
Analisis data statistik sekolah berikut dan hasilkan 3 ringkasan insight strategis serta 2 rekomendasi prioritas untuk ${role || "Kepala Sekolah"}.
Gunakan Bahasa Indonesia formal & profesional. Kembalikan dalam format JSON.`;

    const promptText = `Data Statistik Sekolah saat ini: ${JSON.stringify(stats || {})}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    return res.json({
      insights: response.text,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("AI Insights API Error:", error);
    return res.status(500).json({
      error: "Gagal membuat insight AI.",
      details: error.message || "Unknown error",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Smart School OS] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
