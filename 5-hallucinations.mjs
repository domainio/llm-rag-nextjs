import dotenv from "dotenv";
import OpenAI from "openai";

// Load OPENAI_API_KEY from .env var config
dotenv.config();

// Create OpenAI client
const openai = new OpenAI();

const knowledge = {
    TelAviv: {
        stock: {
            "Nike": {
                "size 10": 1,
                "size 11": 0, // No size 11 in stock !!!
                "size 12": 3,
                "size 13": 1
            }
        }
    }
}

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    temperature: 0,
    messages: [
        // System prompt as knowledge
        { role: "system", content: `you are shoes store seller, this is your knowledge: ${knowledge}` },
        { role: "user", content: "I want to buy Nike shoes size 11, do you have it in stock in Tel-Aviv?" }],
});

console.log(response.choices[0].message);