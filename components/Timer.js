'use client';

import { useState, useEffect, useRef } from 'react';
import { formatTime, isTimeLow } from '@/utils/timer';
import styles from './Timer.module.css';

export default function Timer({ initialTime, taskId, onTimeUpdate }) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const intervalRef = useRef(null);

    useEffect(() => {
        // We only want to set the internal state when the taskId changes (new session)
        // or if it's the very first render.
        setTimeRemaining(initialTime);
    }, [taskId]); // Depend on taskId instead of initialTime to break the loop

    useEffect(() => {
        // Start countdown
        intervalRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []); // Only run once on mount

    // Separate effect to notify parent when internal time changes
    useEffect(() => {
        if (onTimeUpdate) {
            onTimeUpdate(timeRemaining);
        }
    }, [timeRemaining, onTimeUpdate]);

    const isLow = isTimeLow(timeRemaining);

    return (
        <div className={`${styles.timer} ${isLow ? styles.low : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.icon}>
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M10 5v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className={styles.time}>{formatTime(timeRemaining)}</span>
            <span className={styles.label}>mins</span>
        </div>
    );
}
