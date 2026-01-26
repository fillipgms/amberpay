export default function getRelativeTime(dateTime: string): string {
    const now = new Date();
    const past = new Date(dateTime);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
        return "agora mesmo";
    }

    if (diffInMinutes < 60) {
        return `há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`;
    }

    if (diffInHours < 24 && now.getDate() === past.getDate()) {
        return `há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (
        past.getDate() === yesterday.getDate() &&
        past.getMonth() === yesterday.getMonth() &&
        past.getFullYear() === yesterday.getFullYear()
    ) {
        const hours = past.getHours().toString().padStart(2, "0");
        const minutes = past.getMinutes().toString().padStart(2, "0");
        return `ontem às ${hours}:${minutes}`;
    }

    if (diffInDays < 7) {
        return `há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`;
    }

    const day = past.getDate().toString().padStart(2, "0");
    const month = (past.getMonth() + 1).toString().padStart(2, "0");
    const year = past.getFullYear();
    const hours = past.getHours().toString().padStart(2, "0");
    const minutes = past.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
