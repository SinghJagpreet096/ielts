'use client';

import { useEffect, useRef } from 'react';
import { savePracticeSession } from '@/utils/storage';
import styles from './TextEditor.module.css';

export default function TextEditor({ content, onChange, taskId, timeRemaining }) {
    const textareaRef = useRef(null);

    // Auto-resize textarea (if needed, though we use flex-grow)
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    // Auto-save logic
    useEffect(() => {
        const autoSaveInterval = setInterval(() => {
            savePracticeSession(taskId, content, timeRemaining);
        }, 30000); // Save every 30 seconds

        return () => clearInterval(autoSaveInterval);
    }, [content, taskId, timeRemaining]);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={styles.container}>
            <textarea
                ref={textareaRef}
                className={styles.textarea}
                value={content}
                onChange={handleChange}
                placeholder="Start typing your response here... (Minimum words recommended)"
                spellCheck="false" // IELTS actual test has no spellcheck
            />
            <div className={styles.footer}>
                <div className={styles.saveIndicator}>
                    <span className={styles.dot}></span>
                    AUTO-SAVE ACTIVE
                </div>
                <div className={styles.timestamp}>
                    Draft saved at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}
