import { format, parseISO } from 'date-fns';

export function formatDateTime(datetime: string, formatString = 'dd-mm-yyyy HH:mm') {
    return format(parseISO(datetime), formatString);
}
