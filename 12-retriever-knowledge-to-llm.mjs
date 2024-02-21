import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import pdf from "@cyber2024/pdf-parse-fixed";
import { serviceContextFromDefaults, Document, VectorStoreIndex, storageContextFromDefaults, TextNode } from "llamaindex";

dotenv.config();

const openai = new OpenAI();

// Load the PDF file
const buffer = fs.readFileSync("./Next.js_v14_Documentation.pdf");
const parsedPdf = await pdf(buffer);

// Create a new LlamaIndex context
const serviceContext = serviceContextFromDefaults({
    chunkSize: 4000,
    chunkOverlap: 100,
});

// A document object that LlamaIndex can work with
const document = new Document({ text: parsedPdf.text });

// Create a Storage for the indexed embeddings
const storageContext = await storageContextFromDefaults({
    persistDir: "./storage"
})

// Create a vector store index from the document
const index = await VectorStoreIndex.fromDocuments([document], {
    serviceContext,
    storageContext
});

const query = "What are the new featurs in next.js version 14 that are not exists in previous versions?"

const retriever = index.asRetriever();

const matchingNodes = await retriever.retrieve(query);

const knowledge = matchingNodes.map(node => {
    const textNode = new TextNode(node.node);
    return textNode.text;
}).join("\n\n");

const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    temperature: 0,
    messages: [
        {
            role: "system",
            content: `You are a NextJS expert here is your knowledge of nextjs 14 version: ${knowledge}, based you answers on that knowledge`
        },
        { role: "user", content: query }
    ],
})
console.log(response.choices[0].message.content);