'use client';

import { getWordCountStatus, formatWordCount } from '@/utils/wordCount';
import styles from './WordCounter.module.css';

export default function WordCounter({ currentCount, minimumCount }) {
    const status = getWordCountStatus(currentCount, minimumCount);

    return (
        <div className={`${styles.counter} ${styles[status]}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.icon}>
                <path
                    d="M3 5h14M3 10h14M3 15h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
            <span className={styles.count}>{formatWordCount(currentCount, minimumCount)}</span>
            <span className={styles.label}>words</span>
        </div>
    );
}
