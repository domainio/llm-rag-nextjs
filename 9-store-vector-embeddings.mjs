import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import pdf from "@cyber2024/pdf-parse-fixed";
import { serviceContextFromDefaults, Document, VectorStoreIndex, storageContextFromDefaults } from "llamaindex";

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
console.log(index);