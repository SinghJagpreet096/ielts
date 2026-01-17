'use client';

import { getMockScores } from '@/utils/storage';
import styles from './QuickInsights.module.css';

export default function QuickInsights() {
    const { lexicalResource, grammaticalRange } = getMockScores();

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Quick Insights</h3>

            <div className={styles.insights}>
                <div className={styles.insightItem}>
                    <div className={styles.insightHeader}>
                        <span className={styles.insightLabel}>LEXICAL RESOURCE</span>
                        <span className={styles.insightScore}>Band {lexicalResource}</span>
                    </div>
                    <div className={styles.insightBar}>
                        <div
                            className={styles.insightBarFill}
                            style={{
                                width: `${(lexicalResource / 9) * 100}%`,
                                background: 'linear-gradient(90deg, #0d9488, #14b8a6)'
                            }}
                        />
                    </div>
                    <div className={styles.insightStatus}>Excellent</div>
                </div>

                <div className={styles.insightItem}>
                    <div className={styles.insightHeader}>
                        <span className={styles.insightLabel}>GRAMMATICAL RANGE</span>
                        <span className={styles.insightScore}>Band {grammaticalRange}</span>
                    </div>
                    <div className={styles.insightBar}>
                        <div
                            className={styles.insightBarFill}
                            style={{
                                width: `${(grammaticalRange / 9) * 100}%`,
                                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                            }}
                        />
                    </div>
                    <div className={styles.insightStatus}>Needs focus</div>
                </div>
            </div>

            <button className={styles.feedbackBtn}>
                View AI Feedback
            </button>
        </div>
    );
}
