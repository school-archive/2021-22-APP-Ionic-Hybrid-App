import { format, parseISO } from 'date-fns';

export function formatDateTime(datetime: string, formatString = 'dd-mm-yyyy HH:mm') {
    return format(parseISO(datetime), formatString);
}

export function toDate(datetime: string): Date {
    return parseISO(datetime);
}

export function getHours(date: Date) {
    return Number.parseInt(format(date, 'HH'));
}

export function getMinutes(date: Date) {
    return Number.parseInt(format(date, 'mm'));
}
