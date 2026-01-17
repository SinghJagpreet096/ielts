'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMockScores } from '@/utils/storage';
import styles from './ScoreTrends.module.css';

export default function ScoreTrends() {
    const { scoreTrend, weeklyGoal } = getMockScores();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>Score Trends</h3>
                    <p className={styles.subtitle}>Last 30 Days</p>
                </div>
                <div className={styles.goalBadge}>
                    <span className={styles.goalLabel}>WEEKLY GOAL</span>
                    <span className={styles.goalValue}>
                        {weeklyGoal.completed}/{weeklyGoal.target} Essays written
                    </span>
                    <div className={styles.goalProgress}>
                        <div
                            className={styles.goalProgressFill}
                            style={{ width: `${(weeklyGoal.completed / weeklyGoal.target) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={scoreTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            style={{ fontSize: '0.75rem' }}
                        />
                        <YAxis
                            domain={[0, 10]}
                            stroke="#94a3b8"
                            style={{ fontSize: '0.75rem' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#0d9488"
                            strokeWidth={3}
                            dot={{ fill: '#0d9488', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
