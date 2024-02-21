import dotenv from "dotenv";
import OpenAI from "openai";

// Load OPENAI_API_KEY from .env var config
dotenv.config();

// Create OpenAI client
const openai = new OpenAI();

// Interact with ChatGPT
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125", // https://openai.com/pricing
    temperature: 0, // creativity from 0 to 1
    messages: [
        { role: "user", content: "Tell me a funny joke" }
    ],
});

console.log(response);