export const writingTasks = {
    task1: [
        {
            id: 'task1-1',
            type: 'task1',
            category: 'Academic',
            title: 'Global Energy Consumption 2023',
            description: 'The chart below shows global energy consumption by source from 2000 to 2023. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
            timeLimit: 20, // minutes
            wordCountMin: 150,
            prompt: `You should spend about 20 minutes on this task.

The chart below shows global energy consumption by source from 2000 to 2023.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
            requirements: [
                'Clear reasons for your answer and include any relevant examples from your own knowledge or experience',
                'Write at least 150 words',
            ],
            brainstorming: [
                'Personalized learning vs Human empathy',
                'Efficiency and data processing',
                'The role of social development in schools',
            ],
        },
        {
            id: 'task1-2',
            type: 'task1',
            category: 'Academic',
            title: 'City Development Process',
            description: 'The diagrams below show the development of a coastal city between 1950 and 2023. Summarize the information by selecting and reporting the main features.',
            timeLimit: 20,
            wordCountMin: 150,
            prompt: `You should spend about 20 minutes on this task.

The diagrams below show the development of a coastal city between 1950 and 2023.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
            requirements: [
                'Describe the main changes',
                'Make relevant comparisons',
                'Write at least 150 words',
            ],
            brainstorming: [
                'Urban expansion',
                'Infrastructure development',
                'Environmental changes',
            ],
        },
    ],
    task2: [
        {
            id: 'task2-1',
            type: 'task2',
            category: 'Essay',
            title: 'The Impact of AI on Education',
            description: 'Some people believe that artificial intelligence will eventually replace teachers in classrooms. To what extent do you agree or disagree?',
            timeLimit: 40, // minutes
            wordCountMin: 250,
            prompt: `You should spend about 40 minutes on this task.

Write about the following topic:

The growing use of artificial intelligence in everyday life.

Some people believe that the increasing reliance on artificial intelligence (AI) will lead to a loss of essential human skills. Others, however, argue that AI will free humans from mundane tasks, allowing them to focus on more creative and complex endeavors.

Discuss both views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
            requirements: [
                'Give clear reasons for your answer and include any relevant examples from your own knowledge or experience',
                'Write at least 250 words',
            ],
            brainstorming: [
                'Personalized learning vs Human empathy',
                'Efficiency and data processing',
                'The role of social development in schools',
            ],
        },
        {
            id: 'task2-2',
            type: 'task2',
            category: 'Essay',
            title: 'Environmental Responsibility',
            description: 'Some people think that environmental problems should be solved on a global scale while others believe it is better to deal with them nationally. Discuss both views.',
            timeLimit: 40,
            wordCountMin: 250,
            prompt: `You should spend about 40 minutes on this task.

Write about the following topic:

Some people think that environmental problems should be solved on a global scale while others believe it is better to deal with them nationally.

Discuss both views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
            requirements: [
                'Discuss both viewpoints',
                'Provide your own opinion',
                'Write at least 250 words',
            ],
            brainstorming: [
                'Global cooperation vs national sovereignty',
                'Climate change requires international action',
                'Local solutions for local problems',
            ],
        },
        {
            id: 'task2-3',
            type: 'task2',
            category: 'Essay',
            title: 'Work-Life Balance',
            description: 'In many countries, people are working longer hours. What are the reasons for this? What effects does this have on individuals and society?',
            timeLimit: 40,
            wordCountMin: 250,
            prompt: `You should spend about 40 minutes on this task.

Write about the following topic:

In many countries, people are working longer hours.

What are the reasons for this? What effects does this have on individuals and society?

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
            requirements: [
                'Explain the reasons',
                'Discuss the effects',
                'Write at least 250 words',
            ],
            brainstorming: [
                'Economic pressures and competition',
                'Technology blurring work-life boundaries',
                'Health and family impacts',
            ],
        },
    ],
};

export function getTaskById(taskId) {
    const allTasks = [...writingTasks.task1, ...writingTasks.task2];
    return allTasks.find(task => task.id === taskId);
}

export function getTasksByType(type) {
    return writingTasks[type] || [];
}
