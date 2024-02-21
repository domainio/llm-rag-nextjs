


import dotenv from "dotenv";
import OpenAI from "openai";

// Load OPENAI_API_KEY from .env var config
dotenv.config();

// Create OpenAI client
const openai = new OpenAI();

// Interact with ChatGPT
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    temperature: 0,
    messages: [      
        // System prompt to dictate the "assistant" behviour  
        { role: "system", content: "You are a very rude chatbot, reply with rudeness to the user" },
        { role: "user", content: "Hi how are you today?" }
    ],
});

console.log(response.choices[0].message);