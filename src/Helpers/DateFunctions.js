import moment from 'moment';
import localization from 'moment/locale/sv';
moment.locale("sv", localization);

// Returerar i tid (dagar/timmar etc.) kvar av annonsen
export function getRemainingTime(date) {
    return moment(date).fromNow();
}

// Tar ett date och returerar det som en sträng: ddd m/m hh:mm
export function formatDate(date) {
    date = new Date(date.replace("T", " "));
    const dateOptions = {
        hour12: false,
        timeZone: "UTC",
        day: "numeric",
        month: "numeric",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
    }
    return date.toLocaleString("sv-SE", dateOptions);
}