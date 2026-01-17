// LocalStorage keys
const STORAGE_KEYS = {
    PRACTICE_SESSION: 'ielts_practice_session',
    PROGRESS: 'ielts_progress',
    SCORES: 'ielts_scores',
    HISTORY: 'ielts_history',
};

// Save practice session
export function savePracticeSession(taskId, content, timeRemaining) {
    if (typeof window === 'undefined') return;

    const session = {
        taskId,
        content,
        timeRemaining,
        lastSaved: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.PRACTICE_SESSION, JSON.stringify(session));
}

// Load practice session
export function loadPracticeSession(taskId) {
    if (typeof window === 'undefined') return null;

    const saved = localStorage.getItem(STORAGE_KEYS.PRACTICE_SESSION);
    if (!saved) return null;

    try {
        const session = JSON.parse(saved);
        if (session.taskId === taskId) {
            return session;
        }
    } catch (error) {
        console.error('Error loading practice session:', error);
    }

    return null;
}

// Clear practice session
export function clearPracticeSession() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PRACTICE_SESSION);
}

// Save completed practice to history
export function saveToHistory(taskId, taskType, content, wordCount, timeSpent) {
    if (typeof window === 'undefined') return;

    const history = getHistory();

    const entry = {
        id: Date.now().toString(),
        taskId,
        taskType,
        content,
        wordCount,
        timeSpent,
        completedAt: new Date().toISOString(),
    };

    history.unshift(entry);

    // Keep only last 50 entries
    const trimmed = history.slice(0, 50);

    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
}

// Get practice history
export function getHistory() {
    if (typeof window === 'undefined') return [];

    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error('Error loading history:', error);
        return [];
    }
}

// Save progress data
export function saveProgress(data) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
}

// Get progress data
export function getProgress() {
    if (typeof window === 'undefined') return null;

    const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error('Error loading progress:', error);
        return null;
    }
}

// Mock score data (for demo purposes)
export function getMockScores() {
    return {
        lexicalResource: 8.0,
        grammaticalRange: 7.0,
        overall: 7.8,
        weeklyGoal: {
            target: 5,
            completed: 3,
        },
        scoreTrend: [
            { date: 'Mon', score: 7.0 },
            { date: 'Tue', score: 7.2 },
            { date: 'Wed', score: 7.5 },
            { date: 'Thu', score: 7.3 },
            { date: 'Fri', score: 7.6 },
            { date: 'Sat', score: 7.8 },
            { date: 'Sun', score: 7.8 },
        ],
    };
}
