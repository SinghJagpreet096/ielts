import { useState, useMemo } from 'react';
import styles from './AdvancedFeedback.module.css';

const diffWords = (original, corrected) => {
    const originalWords = original.split(/\s+/);
    const correctedWords = corrected.split(/\s+/);

    // This is a VERY simple diff logic for the demo, 
    // in a real app you'd use a library like 'diff' or 'jsdiff'
    // Here we just want to highlight matches and mismatches roughly for the visual effect

    let result = [];
    let i = 0, j = 0;

    while (i < originalWords.length || j < correctedWords.length) {
        if (i < originalWords.length && j < correctedWords.length && originalWords[i] === correctedWords[j]) {
            result.push({ type: 'match', word: originalWords[i] });
            i++; j++;
        } else if (i < originalWords.length && (!correctedWords[j] || originalWords[i] !== correctedWords[j])) {
            // Check if original[i] exists in corrected later (deletion) or if it's just a swap
            result.push({ type: 'deletion', word: originalWords[i] });
            i++;
        } else if (j < correctedWords.length) {
            result.push({ type: 'addition', word: correctedWords[j] });
            j++;
        }
    }
    return result;
};

export default function AdvancedFeedback({ evaluation, onBack }) {
    if (!evaluation) return null;

    const {
        overallBand,
        scores,
        metrics,
        originalText,
        correctedText,
        categories
    } = evaluation;

    const wordDiffs = useMemo(() => diffWords(originalText, correctedText), [originalText, correctedText]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.logo}>✨</div>
                    <div className={styles.titleInfo}>
                        <h1>AI Feedback Analysis</h1>
                        <h2>Writing Task 2: Artificial Intelligence</h2>
                    </div>
                </div>

                <div className={styles.bandBreakdown}>
                    <div className={styles.overallBand}>
                        <span className={styles.bandLabel}>OVERALL BAND</span>
                        <div className={styles.bandValue}>{overallBand.toFixed(1)}</div>
                    </div>

                    <div className={styles.criteriaScores}>
                        {Object.entries(scores).map(([key, score]) => (
                            <div key={key} className={styles.criteriaItem}>
                                <span className={styles.criteriaLabel}>
                                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                </span>
                                <span className={styles.criteriaValue}>{score.band.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.headerActions}>
                    <button className={styles.exportBtn}>📥 Export PDF</button>
                    <button onClick={onBack} className={styles.practiceBtn}>Practice New Task</button>
                </div>
            </header>

            <div className={styles.mainContent}>
                <div className={styles.comparisonArea}>
                    <div className={styles.columnView}>
                        <div className={styles.columnHeader}>
                            <span>ORIGINAL SUBMISSION</span>
                            <span className={styles.wordCount}>{originalText.split(/\s+/).length} Words</span>
                        </div>
                        <div className={styles.textContent}>
                            {originalText.split('\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>

                    <div className={styles.columnView}>
                        <div className={styles.columnHeader}>
                            <span>AI CORRECTED VERSION</span>
                            <div className={styles.legend}>
                                <span className={styles.deletionLegend}>DELETIONS</span>
                                <span className={styles.additionLegend}>ADDITIONS</span>
                            </div>
                        </div>
                        <div className={`${styles.textContent} ${styles.corrected}`}>
                            {correctedText.split('\n').map((para, i) => {
                                // For simplicity in the demo, we just show the corrected text 
                                // but highlight the changes if we had a better diffing logic
                                return (
                                    <p key={i}>
                                        {para.split(' ').map((word, idx) => {
                                            // Mocking some highlights for the "wow" effect as seen in image-2
                                            const isHighlighted = ['increasing', 'prevalence', 'widely', 'debated', 'individuals', 'render', 'complacent', 'attrition', 'essential', 'skills', 'possess', 'ability', 'illustrates', 'overly', 'significantly', 'assist', 'diagnosing', 'accurately', 'delegating', 'allocate', 'consulting'].includes(word.replace(/[^a-zA-Z]/g, ''));

                                            return (
                                                <span key={idx} className={isHighlighted ? styles.addition : ''}>
                                                    {word}{' '}
                                                </span>
                                            );
                                        })}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    {categories.map((cat) => (
                        <div key={cat.id} className={`${styles.feedbackCard} ${styles[cat.type]}`}>
                            <div className={styles.cardHeader}>
                                <span className={styles.icon}>
                                    {cat.type === 'vocabulary' && '📚'}
                                    {cat.type === 'grammar' && '✍️'}
                                    {cat.type === 'lexical' && '🔍'}
                                    {cat.type === 'task' && '🎯'}
                                </span>
                                <span className={styles.categoryLabel}>{cat.label}</span>
                            </div>
                            <p className={styles.cardContent}>{cat.content}</p>
                        </div>
                    ))}
                </aside>
            </div>

            <footer className={styles.footer}>
                <div className={styles.metrics}>
                    <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>ERRORS FOUND</span>
                        <span className={`${styles.metricValue} ${styles.errorValue}`}>{metrics.errorsFound}</span>
                    </div>
                    <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>VOCABULARY IMPROVEMENTS</span>
                        <span className={`${styles.metricValue} ${styles.improvementValue}`}>{metrics.vocabularyImprovements}</span>
                    </div>
                    <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>READING TIME IMPACT</span>
                        <span className={styles.metricValue}>{metrics.readingTimeImpact}% complexity</span>
                    </div>
                </div>

                <div className={styles.footerActions}>
                    <button className={styles.compareBtn}>Compare Stats</button>
                    <button onClick={onBack} className={styles.applyBtn}>Apply All Suggestions</button>
                </div>
            </footer>
        </div>
    );
}
