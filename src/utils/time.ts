import { format, parseISO } from 'date-fns';

export function formatDateTime(datetime: string, formatString = 'HH:mm  dd-MM-yyyy') {
    return format(parseISO(datetime), formatString);
}

export function formatDate(date: Date, formatString = 'HH:mm  dd-MM-yyyy') {
    return format(date, formatString);
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
