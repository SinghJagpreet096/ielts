import { NextResponse } from 'next/server';
import { getSystemPrompt } from '@/data/rubric';
import { evaluateWithGemini } from '@/utils/gemini';

const getMockEvaluation = (userResponse) => ({
    overallBand: 7.5,
    scores: {
        taskAchievement: { band: 8.0, feedback: "Excellent task coverage. (MOCK)" },
        coherenceCohesion: { band: 7.0, feedback: "Para transitions could be smoother. (MOCK)" },
        lexicalResource: { band: 7.5, feedback: "Good range of vocabulary. (MOCK)" },
        grammaticalRange: { band: 7.5, feedback: "Accurate complex sentences. (MOCK)" }
    },
    metrics: { errorsFound: 4, vocabularyImprovements: 8, readingTimeImpact: -12 },
    originalText: userResponse,
    correctedText: userResponse + "\n\n(AI Corrected Version would go here in real mode. This is a mock evaluation to save API costs.)",
    categories: [
        { id: 'm1', type: 'vocabulary', label: 'VOCABULARY', content: "Use 'significant' instead of 'big'.", severity: 'improvement' }
    ],
    strengths: ["Clear structure", "Good logical flow"],
    weaknesses: ["Repetitive verbs"],
    suggestions: ["Vary your sentence starters"],
    improvedSentences: [{ original: "It is good.", improved: "It is remarkably effective.", reason: "More academic tone." }]
});

export async function POST(request) {
    try {
        const { taskType, taskPrompt, userResponse } = await request.json();

        if (!userResponse || userResponse.length < 10) {
            return NextResponse.json(
                { error: 'Response is too short to evaluate.' },
                { status: 400 }
            );
        }

        // --- MOCK MODE (Default for now) ---
        // To use real AI, set NEXT_PUBLIC_USE_MOCK_AI=false and provide GEMINI_API_KEY
        if (process.env.NEXT_PUBLIC_USE_MOCK_AI !== 'false') {
            console.log("Using Mock Evaluation (Default/Development Mode)");
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json(getMockEvaluation(userResponse));
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                {
                    error: 'Gemini API Key is missing.',
                    details: 'Real AI is disabled. Set NEXT_PUBLIC_USE_MOCK_AI=false and add GEMINI_API_KEY to enable it.'
                },
                { status: 501 }
            );
        }

        // Truncate response to prevent excessive tokens
        const wordLimit = taskType === 'task1' ? 180 : 300;
        const words = userResponse.trim().split(/\s+/);
        let processedResponse = userResponse;

        if (words.length > wordLimit) {
            processedResponse = words.slice(0, wordLimit).join(' ') + '... [Truncated]';
        }

        const systemPrompt = getSystemPrompt(taskType, taskPrompt, processedResponse);
        const evaluation = await evaluateWithGemini(systemPrompt);

        return NextResponse.json(evaluation);

    } catch (error) {
        console.error('Evaluation Error Details:', error);
        return NextResponse.json(
            {
                error: 'Failed to evaluate response.',
                message: error.message,
                details: error.stack
            },
            { status: 500 }
        );
    }
}
