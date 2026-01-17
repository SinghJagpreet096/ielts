'use client';

import { useState, useEffect, useRef } from 'react';
import { formatTime, isTimeLow } from '@/utils/timer';
import styles from './Timer.module.css';

export default function Timer({ initialTime, taskId, onTimeUpdate }) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeRemaining(initialTime);
    }, [initialTime]);

    useEffect(() => {
        // Start countdown
        intervalRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                const newTime = prev - 1;
                if (onTimeUpdate) {
                    onTimeUpdate(newTime);
                }
                return newTime;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [onTimeUpdate]);

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
