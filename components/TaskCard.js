import Link from 'next/link';
import styles from './TaskCard.module.css';

export default function TaskCard({ task }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div>
                    <div className={styles.badge}>{task.category}</div>
                    <h3 className={styles.title}>{task.title}</h3>
                </div>
                <button className={styles.bookmarkBtn} aria-label="Bookmark">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M5 2h10a1 1 0 011 1v16l-6-3-6 3V3a1 1 0 011-1z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <p className={styles.description}>{task.description}</p>

            {task.brainstorming && task.brainstorming.length > 0 && (
                <div className={styles.brainstorming}>
                    <div className={styles.brainstormingTitle}>SUGGESTED BRAINSTORMING</div>
                    <ul className={styles.brainstormingList}>
                        {task.brainstorming.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles.footer}>
                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {task.timeLimit} MINS
                    </span>
                    <span className={styles.metaItem}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M2 4h12M2 8h12M2 12h8"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        {task.wordCountMin} WORDS
                    </span>
                </div>
                <Link href={`/practice/${task.id}`} className={styles.startBtn}>
                    Start Practice
                </Link>
            </div>
        </div>
    );
}
