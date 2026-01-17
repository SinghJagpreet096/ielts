export const IELTS_RUBRIC = {
    task1: {
        criteria: [
            {
                id: 'task_achievement',
                name: 'Task Achievement',
                description: 'How well the response addresses the requirements of the task, including reporting the main features and making comparisons.',
            },
            {
                id: 'coherence_cohesion',
                name: 'Coherence and Cohesion',
                description: 'The clarity and fluency of the message, including how the response organizes and links information, ideas, and language.',
            },
            {
                id: 'lexical_resource',
                name: 'Lexical Resource',
                description: 'The range of vocabulary used and the precision and appropriateness of that vocabulary.',
            },
            {
                id: 'grammatical_range',
                name: 'Grammatical Range and Accuracy',
                description: 'The range and accurate use of grammar at the sentence level.',
            },
        ],
    },
    task2: {
        criteria: [
            {
                id: 'task_response',
                name: 'Task Response',
                description: 'How well the response addresses the task, presents a clear position, and supports ideas.',
            },
            {
                id: 'coherence_cohesion',
                name: 'Coherence and Cohesion',
                description: 'The clarity and fluency of the message, including how the response organizes and links information, ideas, and language.',
            },
            {
                id: 'lexical_resource',
                name: 'Lexical Resource',
                description: 'The range of vocabulary used and the precision and appropriateness of that vocabulary.',
            },
            {
                id: 'grammatical_range',
                name: 'Grammatical Range and Accuracy',
                description: 'The range and accurate use of grammar at the sentence level.',
            },
        ],
    },
};

export const getSystemPrompt = (taskType, taskPrompt, userResponse) => {
    return `You are an expert IELTS examiner. Evaluate the following ${taskType === 'task1' ? 'Academic Writing Task 1' : 'Writing Task 2'} response based on official IELTS assessment criteria.

Task Prompt:
"""
${taskPrompt}
"""

User Response:
"""
${userResponse}
"""

Please provide a detailed evaluation in JSON format with the following structure:
{
  "overallBand": number (0-9),
  "scores": {
    "taskAchievement": { "band": number, "feedback": "string" },
    "coherenceCohesion": { "band": number, "feedback": "string" },
    "lexicalResource": { "band": number, "feedback": "string" },
    "grammaticalRange": { "band": number, "feedback": "string" }
  },
  "strengths": ["string"],
  "weaknesses": ["string"],
  "suggestions": ["string"],
  "improvedSentences": [
    { "original": "string", "improved": "string", "reason": "string" }
  ]
}

Ensure the feedback is constructive, professional, and strictly follows IELTS grading standards.`;
};
