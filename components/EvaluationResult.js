import styles from './EvaluationResult.module.css';

export default function EvaluationResult({ evaluation, onBack }) {
    if (!evaluation) return null;

    const { overallBand, scores, strengths, weaknesses, suggestions, improvedSentences } = evaluation;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.overallSection}>
                    <div className={styles.overallLabel}>OVERALL BAND</div>
                    <div className={styles.overallValue}>{overallBand.toFixed(1)}</div>
                </div>
                <div className={styles.summaryText}>
                    <h2>Excellent work!</h2>
                    <p>You have demonstrated a strong command of the required skills for this task.</p>
                </div>
                <button onClick={onBack} className={styles.closeBtn}>×</button>
            </header>

            <div className={styles.scoresGrid}>
                {Object.entries(scores).map(([key, score]) => (
                    <div key={key} className={styles.scoreCard}>
                        <div className={styles.scoreHeader}>
                            <h4>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</h4>
                            <span className={styles.scoreValue}>Band {score.band.toFixed(1)}</span>
                        </div>
                        <div className={styles.scoreBar}>
                            <div
                                className={styles.scoreProgress}
                                style={{ width: `${(score.band / 9) * 100}%` }}
                            />
                        </div>
                        <p className={styles.scoreFeedback}>{score.feedback}</p>
                    </div>
                ))}
            </div>

            <div className={styles.detailsGrid}>
                <div className={styles.detailsSection}>
                    <h3>Strengths</h3>
                    <ul className={styles.strengthsList}>
                        {strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
                <div className={styles.detailsSection}>
                    <h3>Areas for Improvement</h3>
                    <ul className={styles.weaknessList}>
                        {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
            </div>

            <div className={styles.suggestionsSection}>
                <h3>Key Suggestions</h3>
                <div className={styles.suggestionsGrid}>
                    {suggestions.map((s, i) => (
                        <div key={i} className={styles.suggestionCard}>{s}</div>
                    ))}
                </div>
            </div>

            <div className={styles.improvedSection}>
                <h3>Sentence Improvements</h3>
                <div className={styles.improvedGrid}>
                    {improvedSentences.map((item, i) => (
                        <div key={i} className={styles.improvedCard}>
                            <div className={styles.original}>
                                <span className={styles.label}>Original:</span>
                                <p>{item.original}</p>
                            </div>
                            <div className={styles.improved}>
                                <span className={styles.label}>Improved:</span>
                                <p>{item.improved}</p>
                            </div>
                            <div className={styles.reason}>
                                <strong>Tip:</strong> {item.reason}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <button onClick={onBack} className={styles.doneBtn}>Done & Save Results</button>
            </div>
        </div>
    );
}
