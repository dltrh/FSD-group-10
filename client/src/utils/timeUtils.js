export function getRelativeTime(timestamp) {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMs = now - posted;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 1) return "just now";
    if (diffMinutes < 60)
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    if (diffHours < 24)
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    if (diffHours < 48) return "Yesterday";
    return posted.toLocaleDateString();
}

export const  formatDate = (dateString) => {
        const date = new Date(dateString.replace(' ', 'T'));
        if (isNaN(date)) return '';

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;

        return `${day}/${month}/${year}, ${hour12}:${minutes} ${ampm}`;
};

export const parseDateString = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString.replace(' ', 'T'));
};

export const calculateEventStatus = (event) => {
    if (!event.timeStart || !event.timeEnd) return "Unknown";

    const now = new Date();
    const startDate = parseDateString(event.timeStart);
    const endDate = parseDateString(event.timeEnd);

    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) {
        return "Unknown";
    }

    if (startDate > now) return "Upcoming";
    const nowMonth = now.getMonth();      // 0 = Jan, 11 = Dec
    const nowYear = now.getFullYear();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();

    // If event is happening this month and year
    if (startMonth === nowMonth && startYear === nowYear) {
        return "In Progress";
    }
    if (endDate < now) return "Completed";

    return "Unknown";
};