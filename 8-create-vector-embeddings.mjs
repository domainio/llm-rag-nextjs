import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";
import pdf from "@cyber2024/pdf-parse-fixed";
import { serviceContextFromDefaults, Document, VectorStoreIndex } from "llamaindex";

dotenv.config();

const openai = new OpenAI();

// Load the PDF file
const buffer = fs.readFileSync("./Next.js_v14_Documentation.pdf");
const parsedPdf = await pdf(buffer);
console.log(parsedPdf.text);

// Create a new LlamaIndex context
// const serviceContext = serviceContextFromDefaults();

// A document object that LlamaIndex can work with
// const document = new Document({ text: parsedPdf.text });
// console.log(document);

// Create a vector store index from the document
// const index = await VectorStoreIndex.fromDocuments([document]);
// console.log(index);