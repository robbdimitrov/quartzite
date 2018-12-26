'use strict';

// Globals

const months = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'];

// Modifiers

//
// type can be: 'days', 'hours', 'minutes', 'seconds'
//

export function dateByAdding(type, date, value) {
    let nextDate = new Date(date);

    switch (type) {
    case 'days':
        nextDate.setDate(date.getDate() + value);
        break;
    case 'hours':
        nextDate.setHours(date.getHours() + value);
        break;
    case 'minutes':
        nextDate.setMinutes(date.getMinutes() + value);
        break;
    default:
        nextDate.setSeconds(date.getSeconds() + value);
    }

    return nextDate;
}

export function difference(date1, date2) {
    let seconds = Math.round(Math.abs(date1 - date2) / 1000);
    let minutes = Math.round(seconds / 60);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return {
        seconds,
        minutes,
        hours,
        days
    };
}

// Formats

function monthDateFormat(date, style) {
    if (style === 'short') {
        return `${monthsShort[date.getMonth()]} ${date.getDate()}`;
    }
    return `${months[date.getMonth()]} ${date.getDate()}`;
}

function yearDateFormat(date, style) {
    if (style === 'short') {
        return `${date.getDate()} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
    }
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Helpers

function isSameWeek(date1, date2) {
    let weekStart = dateByAdding('days', date1, -7);
    return (date2 >= weekStart && date2 <= date1);
}

function numberFormatter(number) {
    return `${number < 10 ? '0' : ''}${number}`;
}

function timeFormatter(date) {
    return `${numberFormatter(date.getHours())}:${numberFormatter(date.getMinutes())}`;
}

function pluralFormatter(number, singular, plural) {
    return `${number} ${number === 1 ? singular : plural}`;
}

// Time difference

export function timeDifference(now, date, style = 'normal') {
    let { seconds, minutes, hours, days } = difference(now, date);

    if (style === 'normal' && seconds < 5) {
        return 'Just now';
    }

    let result = '';

    if (style === 'short') {
        if (seconds < 60) {
            result = `${seconds}s`;
        } else if (minutes < 60) {
            result = `${minutes}m`;
        } else if (hours < 24) {
            result = `${hours}h`;
        } else {
            result = `${days}d`;
        }
    } else {
        if (seconds < 60) {
            result = pluralFormatter(seconds, 'second', 'seconds');
        } else if (minutes < 60) {
            result = pluralFormatter(minutes, 'minute', 'minutes');
        } else if (hours < 24) {
            result = pluralFormatter(hours, 'hour', 'hours');
        } else {
            result = pluralFormatter(days, 'day', 'days');
        }
    }

    return `${now < date ? 'In ' : ''}${result}${now > date ? ' ago' : ''}`;
}

export function dateDifference(now, date, style = 'normal') {
    let isCurrent = now.getFullYear() === date.getFullYear()
        && now.getMonth() === date.getMonth();

    if (style === 'short') {
        return `${monthsShort[date.getMonth()]} ${date.getDate()}`;
    }

    if (isCurrent && now.getDate() === date.getDate()) {
        return `Today at ${timeFormatter(date)}`;
    } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
        return `Yesterday at ${timeFormatter(date)}`;
    } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
        return `Tomorrow at ${timeFormatter(date)}`;
    } else if (isSameWeek(now, date)) {
        return `${weekDays[date.getDay()]} at ${timeFormatter(date)}`;
    }

    return date.toDateString();
}

// Relativity

//
// style options: 'normal', 'short'
//

export function formatDate(date, style = 'normal') {
    let now = new Date();
    let { days } = difference(now, date);

    if (days < 1) {
        return timeDifference(now, date, style);
    } else if (days < 7) {
        return dateDifference(now, date, style);
    } else if (now.getFullYear() === date.getFullYear()) {
        return monthDateFormat(date, style);
    }

    return yearDateFormat(date, style);
}
