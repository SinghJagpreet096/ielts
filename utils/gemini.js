import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Sends a prompt to Gemini and returns the JSON response.
 * @param {string} prompt - The system prompt including task instructions and user response.
 * @returns {Promise<Object>} - The parsed JSON evaluation result.
 */
export async function evaluateWithGemini(prompt) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === "your_key_here" || apiKey.trim() === "") {
            throw new Error("GEMINI_API_KEY is missing or contains the default placeholder. Please add a valid key to your .env.local file.");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response (in case the model adds markdown formatting)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("No JSON found in response. Raw text:", text);
            throw new Error("Could not find JSON in Gemini response.");
        }

        try {
            return JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            console.error("JSON Parse Error. Cleaned text:", jsonMatch[0]);
            throw parseError;
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}
