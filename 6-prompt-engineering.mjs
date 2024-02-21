import dotenv from "dotenv";
import OpenAI from "openai";

// Load OPENAI_API_KEY from .env var config
dotenv.config();

// Create OpenAI client
const openai = new OpenAI();

const knowledge = {
    "Tel Aviv": {
        stock: {
            "Nike shoes": {
                "size 10 quantity": 1,
                "size 11 quantity": 1, // No size-11 in stock
                "size 12 quantity": 3,
                "size 13 quantity": 1
            }
        }
    },
    Eilat: {
        stock: {
            "Nike": {
                "size 11 quantity": 2
            }
        }
    }
}

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    temperature: 0,
    messages: [
        {
            role: "system",
            content: `You are a shoes store seller, this is your entire knowledge: ${JSON.stringify(knowledge)}. 
            Nike shoes considered in stock only if exists in your knowledge and if its size quantity in your knowledge stock is greater than 0.
            Verify that shoes in your stock konwledge are available for sale.
            Printout the whole stock in every reply`
        },
        { role: "user", content: "I want to buy Nike shoes size 11, do you have it in stock in Tel Aviv?" }],
});

console.log(response.choices[0].message);
