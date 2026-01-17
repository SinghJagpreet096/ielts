import Sidebar from '@/components/Sidebar';
import TaskCard from '@/components/TaskCard';
import ScoreTrends from '@/components/ScoreTrends';
import QuickInsights from '@/components/QuickInsights';
import { writingTasks } from '@/data/tasks';
import styles from './dashboard.module.css';

export const metadata = {
    title: 'Dashboard - IELTS Master',
    description: 'Track your IELTS writing practice progress',
};

export default function Dashboard() {
    // Get first task of each type for display
    const task1Sample = writingTasks.task1[0];
    const task2Sample = writingTasks.task2[0];

    return (
        <>
            <Sidebar />
            <main className={styles.dashboard}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Welcome back, John!</h1>
                        <p className={styles.subtitle}>
                            You&apos;re on track for your Band 8.5 target. Ready for today&apos;s task?
                        </p>
                    </div>
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>7.8</div>
                            <div className={styles.statLabel}>AVG SCORE</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>12</div>
                            <div className={styles.statLabel}>Days</div>
                        </div>
                    </div>
                </header>

                <div className={styles.content}>
                    <div className={styles.mainColumn}>
                        <div className={styles.tasksGrid}>
                            <TaskCard task={task1Sample} />
                            <TaskCard task={task2Sample} />
                        </div>

                        <ScoreTrends />
                    </div>

                    <div className={styles.sideColumn}>
                        <QuickInsights />
                    </div>
                </div>
            </main>
        </>
    );
}
