
import { GoogleGenerativeAI } from "@google/generative-ai";

// Mocking process.env for standalone execution if not provided by --env-file
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in environment.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function dryRun() {
    console.log("🚀 Starting Gemini API Dry Run...");
    console.log(`Using model: gemini-2.5-flash`);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = "Please respond with exactly one word: 'SUCCESS'. This is a test connection.";

        console.log("📡 Sending test request...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("✅ API Response:", text);

        if (text.includes("SUCCESS")) {
            console.log("\n✨ DRY RUN SUCCESSFUL! Your API key and model selection are working correctly.");
        } else {
            console.log("\n⚠️ Response received but didn't match expected output. Check model behavior.");
        }
    } catch (error) {
        console.error("\n❌ DRY RUN FAILED!");
        console.error("Error Details:", error.message);
        if (error.message.includes("404")) {
            console.error("💡 Tip: 'gemini-2.0-flash-lite' might not be a valid model name. Try 'gemini-1.5-flash' or 'gemini-1.5-pro'.");
        }
    }
}

dryRun();
