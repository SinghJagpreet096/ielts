'use client';

import { useState } from 'react';
import styles from './TaskInstructions.module.css';

export default function TaskInstructions({ task }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ''}`}>
            <button
                className={styles.collapseBtn}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? 'Expand instructions' : 'Collapse instructions'}
            >
                {isCollapsed ? '▶' : '◀'}
            </button>

            {!isCollapsed && (
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Instructions</h2>
                        <div className={styles.badge}>
                            {task.type === 'task1' ? 'Writing Task 1' : 'Writing Task 2'}
                        </div>
                    </div>

                    <div className={styles.prompt}>
                        {task.prompt.split('\n').map((line, index) => (
                            <p key={index} className={line.trim() === '' ? styles.spacer : ''}>
                                {line}
                            </p>
                        ))}
                    </div>

                    {task.requirements && task.requirements.length > 0 && (
                        <div className={styles.requirements}>
                            <h3 className={styles.requirementsTitle}>Requirements</h3>
                            <ul className={styles.requirementsList}>
                                {task.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.autoSave}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M8 1v6M5 4l3-3 3 3M2 10v3a2 2 0 002 2h8a2 2 0 002-2v-3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        AUTO-SAVE ACTIVE
                    </div>
                </div>
            )}
        </div>
    );
}
