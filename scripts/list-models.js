
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in environment.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("📡 Fetching available models...");
        // This is a bit tricky with the SDK, we'll try to use the fetch API directly or see if there's a simpler way
        // Actually, let's just try the common ones one by one or check the documentation.
        // The error said "models/gemini-1.5-flash is not found for API version v1beta"
        // Let's try 'gemini-1.5-flash-latest' or just check if the model name needs a prefix in the SDK

        const models = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-8b",
            "gemini-1.5-pro",
            "gemini-2.0-flash-exp"
        ];

        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("test");
                console.log(`✅ ${modelName} is available.`);
            } catch (e) {
                console.log(`❌ ${modelName} failed: ${e.message.split('\n')[0]}`);
            }
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
