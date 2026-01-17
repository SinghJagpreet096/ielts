'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Timer from '@/components/Timer';
import WordCounter from '@/components/WordCounter';
import TaskInstructions from '@/components/TaskInstructions';
import TextEditor from '@/components/TextEditor';
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
        if (!task) return;

        setIsSubmitting(true);

        const wordCount = countWords(content);
        const timeSpent = task.timeLimit * 60 - timeRemaining;

        // Save to history
        saveToHistory(task.id, task.type, content, wordCount, timeSpent);

        // Clear current session
        clearPracticeSession();

        // Redirect to dashboard with success message
        setTimeout(() => {
            router.push('/dashboard');
        }, 500);
    };

    if (!task) {
        return (
            <>
                <Sidebar />
                <div className={styles.loading}>Loading...</div>
            </>
        );
    }

    const wordCount = countWords(content);

    return (
        <>
            <Sidebar />
            <main className={styles.practice}>
                <header className={styles.header}>
                    <div className={styles.taskInfo}>
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
                        <button
                            className={styles.submitBtn}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit for Evaluation ➔'}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}
