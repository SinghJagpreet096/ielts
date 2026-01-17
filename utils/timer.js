// Format time in MM:SS format
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Check if time is running low (less than 5 minutes)
export function isTimeLow(seconds) {
    return seconds < 300; // 5 minutes
}

// Convert minutes to seconds
export function minutesToSeconds(minutes) {
    return minutes * 60;
}
