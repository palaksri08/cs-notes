import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);

const testGemini = async () => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

  const result = await model.generateContent("Explain binary trees in short.");
  const response = await result.response;
  const text = await response.text();

  console.log(text);
};

testGemini();
