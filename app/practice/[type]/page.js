'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Timer from '@/components/Timer';
import WordCounter from '@/components/WordCounter';
import TaskInstructions from '@/components/TaskInstructions';
import TextEditor from '@/components/TextEditor';
import AdvancedFeedback from '@/components/AdvancedFeedback';
import { getTaskById } from '@/data/tasks';
import { savePracticeSession, loadPracticeSession, clearPracticeSession, saveToHistory } from '@/utils/storage';
import { countWords } from '@/utils/wordCount';
import { minutesToSeconds } from '@/utils/timer';
import styles from './practice.module.css';

export default function PracticePage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const router = useRouter();
    const [task, setTask] = useState(null);
    const [content, setContent] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const taskData = getTaskById(params.type);
        if (!taskData) {
            router.push('/dashboard');
            return;
        }

        setTask(taskData);

        // Try to load saved session
        const saved = loadPracticeSession(params.type);
        if (saved) {
            setContent(saved.content);
            setTimeRemaining(saved.timeRemaining);
        } else {
            setTimeRemaining(minutesToSeconds(taskData.timeLimit));
        }
    }, [params.type, router]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const handleTimeUpdate = (newTime) => {
        setTimeRemaining(newTime);
    };

    const handleSubmit = async () => {
        if (!task || !content.trim()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/evaluate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    taskType: task.type,
                    taskPrompt: task.prompt,
                    userResponse: content,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Evaluation failed');
            }

            const data = await response.json();
            setEvaluation(data);

            const wordCount = countWords(content);
            const timeSpent = task.timeLimit * 60 - timeRemaining;

            // Save to history
            saveToHistory(task.id, task.type, content, wordCount, timeSpent);

            // Clear current session
            clearPracticeSession();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!task) {
        return (
            <div className={styles.loading}>Loading task...</div>
        );
    }

    const wordCount = countWords(content);

    return (
        <main className={styles.practice}>
            <header className={styles.header}>
                <div className={styles.taskInfo}>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className={styles.backBtn}
                        title="Back to Dashboard"
                    >
                        ←
                    </button>
                    <span className={styles.taskBadge}>
                        {task.type === 'task1' ? 'Task 1' : 'Task 2'}
                    </span>
                    <h1 className={styles.taskTitle}>{task.title}</h1>
                </div>

                <div className={styles.headerStats}>
                    <WordCounter
                        currentCount={wordCount}
                        minimumCount={task.wordCountMin}
                    />
                    <Timer
                        initialTime={timeRemaining}
                        taskId={task.id}
                        onTimeUpdate={handleTimeUpdate}
                    />
                </div>
            </header>

            <div className={styles.content}>
                <TaskInstructions task={task} />
                <div className={styles.editorSection}>
                    <TextEditor
                        content={content}
                        onChange={handleContentChange}
                        taskId={task.id}
                        timeRemaining={timeRemaining}
                    />
                    {error && <div className={styles.error}>{error}</div>}
                    <button
                        className={styles.submitBtn}
                        onClick={handleSubmit}
                        disabled={isSubmitting || wordCount < 10}
                    >
                        {isSubmitting ? 'Evaluating...' : 'Submit for AI Evaluation ➔'}
                    </button>
                </div>
            </div>

            {isSubmitting && (
                <div className={styles.overlay}>
                    <div className={styles.loader}>
                        <div className={styles.spinner}></div>
                        <h2>Analyzing your response...</h2>
                        <p>Our AI is evaluating your writing against IELTS standards.</p>
                    </div>
                </div>
            )}

            {evaluation && (
                <div className={styles.modalOverlay}>
                    <AdvancedFeedback
                        evaluation={evaluation}
                        onBack={() => {
                            setEvaluation(null);
                            router.push('/dashboard');
                        }}
                    />
                </div>
            )}
        </main>
    );
}
