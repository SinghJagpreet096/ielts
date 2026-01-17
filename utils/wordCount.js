// Word counting utility
export function countWords(text) {
    if (!text || typeof text !== 'string') return 0;

    // Remove extra whitespace and trim
    const cleaned = text.trim().replace(/\s+/g, ' ');

    if (cleaned === '') return 0;

    // Split by spaces and filter out empty strings
    const words = cleaned.split(' ').filter(word => word.length > 0);

    return words.length;
}

// Word count status (for color coding)
export function getWordCountStatus(currentCount, minimumCount) {
    const percentage = (currentCount / minimumCount) * 100;

    if (percentage >= 100) return 'good'; // green
    if (percentage >= 80) return 'close'; // yellow
    return 'under'; // red
}

// Format word count display
export function formatWordCount(currentCount, minimumCount) {
    return `${currentCount} / ${minimumCount}`;
}
