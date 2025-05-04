import { GoogleGenAI } from "@google/genai";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getApiKey() {
  const API_KEY: string | null | undefined =
    process.env.EXPO_PUBLIC_GEMINI_API_KEY ??
    (await AsyncStorage.getItem("API_KEY"));
  if (!API_KEY) throw new Error("Нет API ключа для ассистента");
  return API_KEY
}

export const fetchAnswer = async ({query}: {query: string}) => {
  const API_KEY = await getApiKey();

  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const goal = await AsyncStorage.getItem("GOAL");
  const systemPrompt = `Ты личный ассистент на пути к цели: ${goal}. Твое имя Надзиратель.
    Твоя задача давать ответы, которые помогут пользователю прийти к цели, даже если его запрос ей противоречит.
    Если спрашивают что-то о тебе, то назови в первую очередь имя.
  `;

  const impovedQuery = query + ` При ответе учти, что моя цель: ${goal}.`

  const response = await ai.models.generateContent({
    model: process.env.AI_MODEL ?? "gemini-2.0-flash",
    contents: impovedQuery,
    config: {
      systemInstruction: systemPrompt,
    },
  });
  const data = response.text;

  console.log("Question:", impovedQuery);
  console.log("Answer:", data);

  return data;
}