import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 15 flashcards about ${topic} in JSON format: [{front: string, back: string}]`,
    });

    const candidate = result.candidates?.[0];
    const content = candidate?.content;
    const parts = content?.parts;
    let text = parts?.[0]?.text || "";
    text = text.replace(/```json\n?/g, '');
    text = text.replace(/```\n?/g, '');
    text = text.trim();
    const flashcards = JSON.parse(text);

    return NextResponse.json({ data: flashcards });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
  }
}