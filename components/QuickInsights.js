'use client';

import { useEffect, useState } from 'react';
import { getMockScores } from '@/utils/storage';
import styles from './QuickInsights.module.css';

export default function QuickInsights() {
    const [lexicalResource, setLexicalResource] = useState(0);
    const [grammaticalRange, setGrammaticalRange] = useState(0);

    useEffect(() => {
        // In a real application, you would load user history here
        // and calculate the actual insights based on that data.
        // For this example, we'll simulate falling back to mock scores.

        const { lexicalResource: mockLR, grammaticalRange: mockGR } = getMockScores();

        // Simulate loading real insights. If real insights were available,
        // you would set them here. For now, we'll just use the mock scores
        // as the fallback, as if real insights aren't yet computed or available.
        const realLexicalResource = null; // Placeholder for actual calculated score
        const realGrammaticalRange = null; // Placeholder for actual calculated score

        if (realLexicalResource !== null && realGrammaticalRange !== null) {
            setLexicalResource(realLexicalResource);
            setGrammaticalRange(realGrammaticalRange);
        } else {
            // Fallback to mock scores if real insights are not available
            setLexicalResource(mockLR);
            setGrammaticalRange(mockGR);
        }
    }, []); // Empty dependency array means this effect runs once after the initial render

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
