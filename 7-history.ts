import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import pdf from "@cyber2024/pdf-parse-fixed";
import readline from "readline";

dotenv.config();

const openai = new OpenAI();

const knowledge = {
    "Tel Aviv": {
        stock: {
            "Nike shoes": {
                "size 10 quantity": 1,
                "size 11 quantity": 0, // No size-11 in stock
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

const history: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [{
    role: "system",
    content: `You are a shoes store seller, this is your entire knowledge: ${JSON.stringify(knowledge)}. 
    Nike shoes considered in stock only if exists in your knowledge and if its stock size quantity is greater than 0`
}];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        temperature: 0,
        messages: history
    })
    console.log("\x1b[32m", `[${response.choices[0].message.role}]: ${response.choices[0].message.content}`);
    console.log("\x1b[33m", "[user]: ");

}

rl.on("line", async (input) => {
    history.push({ role: "user", content: input });
    await main();
})

console.log("\x1b[33m", "[user]: ");

setInterval(() => { }, 1000);