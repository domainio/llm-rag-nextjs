import dotenv from "dotenv";
import OpenAI from "openai";

// Load OPENAI_API_KEY from .env var config
dotenv.config();

// Create OpenAI client
const openai = new OpenAI();

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    temperature: 0,    
    max_tokens: 5000, // https://platform.openai.com/tokenizer
    messages: [
        { role: "user", content: "Tell me a funny joke" }
    ],
});

console.log(response);