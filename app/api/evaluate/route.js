import { NextResponse } from 'next/server';
import { getSystemPrompt } from '@/data/rubric';

export async function POST(request) {
    try {
        const { taskType, taskPrompt, userResponse } = await request.json();

        if (!userResponse || userResponse.length < 10) {
            return NextResponse.json(
                { error: 'Response is too short to evaluate.' },
                { status: 400 }
            );
        }

        // Prepare the prompt
        const systemPrompt = getSystemPrompt(taskType, taskPrompt, userResponse);

        // MOCK RESPONSE FOR DEMO
        // In a real application, you would call an LLM API here
        // e.g., const response = await callLLM(systemPrompt);

        // Simulating a network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const mockEvaluation = {
            overallBand: 7.5,
            scores: {
                taskAchievement: {
                    band: 8.0,
                    feedback: "You addressed all parts of the task. The main trends are clearly highlighted."
                },
                coherenceCohesion: {
                    band: 7.0,
                    feedback: "Good use of cohesive devices, though some paragraph transitions could be smoother."
                },
                lexicalResource: {
                    band: 7.5,
                    feedback: "Good range of vocabulary. Some less common items used correctly."
                },
                grammaticalRange: {
                    band: 7.5,
                    feedback: "Mostly accurate with a good mix of complex sentences."
                }
            },
            metrics: {
                errorsFound: 14,
                vocabularyImprovements: 22,
                readingTimeImpact: -15
            },
            originalText: userResponse,
            correctedText: `The increasing prevalence of artificial intelligence in everyday life has become a widely debated topic. Some individuals contend that AI will render humans complacent and lead to the attrition of essential skills.

Firstly, there is a concern that humans will stop thinking for themselves. For example, many people rely on GPS for navigation and they no longer possess the ability to read maps. If the technology were to fail, they would be lost. This illustrates that we are becoming overly dependent on machines.

On the other hand, AI can process information much significantly faster than humans. In the medical field, AI can assist doctors in diagnosing diseases more accurately. This saves time and lives. By delegating the data analysis to AI, doctors can allocate more time to consulting their patients.

In conclusion, I believe that AI is a benefit for society if we use it wisely. We should not let it replace our basic skills, but we can use it to improve our efficiency.`,
            categories: [
                {
                    id: 'vocab-1',
                    type: 'vocabulary',
                    label: 'VOCABULARY',
                    content: "'increasing prevalence' is more academic than 'growing use' for a Band 7+ score.",
                    severity: 'improvement'
                },
                {
                    id: 'gram-1',
                    type: 'grammar',
                    label: 'GRAMMAR',
                    content: "Gerund vs Infinitive: 'Stop thinking' means to cease the action, which fits the context better.",
                    severity: 'error'
                },
                {
                    id: 'lr-1',
                    type: 'lexical',
                    label: 'LEXICAL RESOURCE',
                    content: "Changed 'accurate' (adj) to 'accurately' (adv) to correctly modify the verb 'diagnose'.",
                    severity: 'improvement'
                },
                {
                    id: 'tr-1',
                    type: 'task',
                    label: 'TASK RESPONSE',
                    content: "'Allocate' and 'Consulting' demonstrate higher-level lexical resource suitable for Task 2.",
                    severity: 'positive'
                }
            ],
            strengths: [
                "Strong introduction and clear overview",
                "Accurate data representation",
                "Clear use of comparative language"
            ],
            weaknesses: [
                "Repetitive use of 'shows' and 'illustrates'",
                "Minor punctuation errors in complex sentences"
            ],
            suggestions: [
                "Vary your vocabulary for reporting data",
                "Practice using a wider range of subordinating conjunctions"
            ],
            improvedSentences: [
                {
                    original: "The chart shows that energy goes up every year.",
                    improved: "The chart illustrates a consistent annual increase in energy consumption.",
                    reason: "Using 'illustrates' and 'consistent annual increase' is more academic than 'shows' and 'goes up'."
                }
            ]
        };

        return NextResponse.json(mockEvaluation);

    } catch (error) {
        console.error('Evaluation Error:', error);
        return NextResponse.json(
            { error: 'Failed to evaluate response. Please try again later.' },
            { status: 500 }
        );
    }
}
