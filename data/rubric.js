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
    return `You are an expert IELTS examiner with 20 years of experience. Your task is to provide a rigorous, professional, and highly detailed evaluation of an ${taskType === 'task1' ? 'Academic Writing Task 1' : 'Writing Task 2'} response.

TASK CONTEXT:
Task Prompt:
"""
${taskPrompt}
"""

USER'S RESPONSE:
"""
${userResponse}
"""

EVALUATION REQUIREMENTS:
1. **Grading**: Be strict but fair according to official IELTS band descriptors.
2. **Corrected Version**: Provide a "Gold Standard" version of the user's response. This should be a natural, Band 9 level rewrite that preserves the user's original ideas but fixes all grammatical, lexical, and structural issues.
3. **Metrics**: 
   - Count the number of distinct grammatical/spelling errors found.
   - Count the number of vocabulary improvements made in the corrected version.
   - Estimate the reading time impact/complexity reduction in percentage.
4. **Categories**: Provide specific feedback points categorized into: Vocabulary, Grammar, Lexical Resource, or Task Response. Each point should have a 'severity' level: 'error', 'improvement', 'positive'.

OUTPUT FORMAT:
You MUST return a valid JSON object. Do not include any text before or after the JSON.
Structure:
{
  "overallBand": number (0-9, in 0.5 increments),
  "scores": {
    "taskAchievement": { "band": number, "feedback": "string" },
    "coherenceCohesion": { "band": number, "feedback": "string" },
    "lexicalResource": { "band": number, "feedback": "string" },
    "grammaticalRange": { "band": number, "feedback": "string" }
  },
  "metrics": {
    "errorsFound": number,
    "vocabularyImprovements": number,
    "readingTimeImpact": number (negative for improved efficiency)
  },
  "originalText": "string (the exact original user response)",
  "correctedText": "string (the Band 9 version)",
  "categories": [
    {
      "id": "unique-id",
      "type": "vocabulary" | "grammar" | "lexical" | "task",
      "label": "VOCABULARY" | "GRAMMAR" | "LEXICAL RESOURCE" | "TASK RESPONSE",
      "content": "string (specific feedback point)",
      "severity": "error" | "improvement" | "positive"
    }
  ],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "suggestions": ["string"],
  "improvedSentences": [
    { "original": "string", "improved": "string", "reason": "string" }
  ]
}

Ensure the 'categories' feedback points are high-quality and directly relate to differences between 'originalText' and 'correctedText'.`;
};
