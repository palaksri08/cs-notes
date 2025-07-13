// utils/gemini.js
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("KEY FROM ENV:", process.env.OPENAI_API_KEY); // should now print actual key
console.log("KEY FROM ENV:", process.env.GEM_API_KEY); // should now print actual key
const genAI = new GoogleGenerativeAI(process.env.GEM_API_KEY);
// console.log(genAI)
// const models = await genAI.listModels();
// models.forEach((model) => {
//   console.log(model.name);
// });

export default genAI;
