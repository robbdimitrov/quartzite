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

/**
 * Returns a date, which is the passed date with added time value
 * @param {string} type - The type of value to add to the passed date.
 *  Allowed options are 'days', 'hours', 'minutes' and 'seconds'.
 *  'seconds' is the default.
 * @param {Date} date - The reference date used to construct the resulting date
 * @param {number} value - The number of days/hours/seconds to add to the date
 * @returns {Date} A new date
 */
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

// Formatters

/**
 * Returns date string with month and day
 */
function monthDateFormat(date, style) {
    if (style === 'short') {
        return `${monthsShort[date.getMonth()]} ${date.getDate()}`;
    }
    return `${months[date.getMonth()]} ${date.getDate()}`;
}

/**
 * Returns date string with year
 */
function yearDateFormat(date, style) {
    if (style === 'short') {
        return `${date.getDate()} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
    }
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Returns time string with format hh:mm
 */
function timeFormat(date) {
    return `${numberFormat(date.getHours())}:${numberFormat(date.getMinutes())}`;
}

/**
 * Prepends zero in front of a number if the number is less than 10
 */
function numberFormat(number) {
    return `${number < 10 ? '0' : ''}${number}`;
}

// Helpers

/**
 * Calculates the time difference between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {object} Object containing the difference in days,
 *  hours, minutes and seconds
 */
function difference(date1, date2) {
    let seconds = Math.round(Math.abs(date1 - date2) / 1000);
    let minutes = Math.round(seconds / 60);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return {
        days,
        hours,
        minutes,
        seconds
    };
}

/**
 * Compares two dates to determines if they belong to the same week
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {boolean}
 */
function isSameWeek(date1, date2) {
    let weekStart = dateByAdding('days', date1, -date1.getDay());
    weekStart.setHours(0, 0, 0);
    let weekEnd = dateByAdding('days', date1, 6 - date1.getDay());
    weekEnd.setHours(23, 59, 59);
    return (date2 >= weekStart && date2 <= weekEnd);
}

/**
 * Returns singular or plural version of a string
 * @param {number} number - The number used to determine which
 *  version of the string to return
 * @param {string} singular - The singular string
 * @param {string} plural - The plural string
 * @returns {string}
 */
function pluralize(number, singular, plural) {
    return `${number} ${number === 1 ? singular : plural}`;
}

// Relativity

/**
 * Formats a date by making a time comparison
 * @param {Date} now - The relative date used for comprison
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter
 *  Allowed options are 'normal' and 'short'. 'normal' is the default.
 * @returns {string}
 */
export function timeDifference(now, date, style = 'normal') {
    let { days, hours, minutes, seconds } = difference(now, date);

    if (seconds < 5) {
        return style === 'normal' ? 'Just now' : 'now';
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
            result = pluralize(seconds, 'second', 'seconds');
        } else if (minutes < 60) {
            result = pluralize(minutes, 'minute', 'minutes');
        } else if (hours < 24) {
            result = pluralize(hours, 'hour', 'hours');
        } else {
            result = pluralize(days, 'day', 'days');
        }
    }

    result = `${now < date ? 'In ' : ''}${result}`;
    if (style === 'normal' && now > date) {
        result = result + ' ago';
    }
    return result;
}

/**
 * Formats a date by making a day comparison
 * @param {Date} now - The relative date used for comprison
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter
 *  Allowed options are 'normal' and 'short'. 'normal' is the default.
 * @returns {string}
 */
export function dateDifference(now, date, style = 'normal') {
    let isCurrent = now.getFullYear() === date.getFullYear()
        && now.getMonth() === date.getMonth();

    if (style === 'short') {
        return `${monthsShort[date.getMonth()]} ${date.getDate()}`;
    }

    if (isCurrent && now.getDate() === date.getDate()) {
        return `Today at ${timeFormat(date)}`;
    } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
        return `Yesterday at ${timeFormat(date)}`;
    } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
        return `Tomorrow at ${timeFormat(date)}`;
    } else if (isSameWeek(now, date)) {
        return `${weekDays[date.getDay()]} at ${timeFormat(date)}`;
    }

    return yearDateFormat(date, style);
}

/**
 * Formats a date by comparing with the current date
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter
 *  Allowed options are 'normal' and 'short'. 'normal' is the default.
 * @returns {string}
 */
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
