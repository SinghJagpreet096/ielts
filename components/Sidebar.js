'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Practice Tests', path: '/practice', icon: '✍️' },
    { name: 'AI Evaluator', path: '/evaluator', icon: '🤖' },
    { name: 'Vocabulary Bank', path: '/vocabulary', icon: '📚' },
    { name: 'History', path: '/history', icon: '📜' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>📝</div>
                <div className={styles.logoText}>
                    <div className={styles.logoTitle}>IELTS Master</div>
                    <div className={styles.logoSubtitle}>Band 9.0 Awaits</div>
                </div>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navText}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <div className={styles.upgradeCard}>
                    <div className={styles.upgradeIcon}>⚡</div>
                    <div className={styles.upgradeText}>Upgrade to Pro</div>
                    <div className={styles.upgradeSubtext}>Unlock AI feedback</div>
                </div>
            </div>
        </aside>
    );
}
