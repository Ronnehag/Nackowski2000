import moment from 'moment';
import localization from 'moment/locale/sv';
moment.updateLocale("sv", localization);

// Returerar i tid (dagar/timmar etc.) kvar av annonsen
export function getRemainingTime(date) {
    return moment(date).fromNow();
}

// Tar ett date och returerar det som en sträng: ddd m/m hh:mm
export function formatDate(date) {
    date = new Date(date.replace("T", " "));
    return moment(date).utcOffset("+02:00").format("lll");
}