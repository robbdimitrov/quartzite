'use strict';

import { months, monthsShort, weekDays } from './constants';
import {
  pluralize, difference, isSameWeek, numberFormat, is12HourClock
} from './utils';

/**
 * Returns time string with format hh:mm {AM/PM}
 * @returns {string}
 */
export function timeFormat(date) {
  const hours = date.getHours();
  const minutes = numberFormat(date.getMinutes());

  if (is12HourClock()) {
    const period = hours < 12 ? 'AM' : 'PM';
    return `${hours % 12 || 12}:${minutes} ${period}`;
  }

  return `${numberFormat(hours)}:${minutes}`;
}

/**
 * Returns date string with month and day
 * @returns {string}
 */
export function monthDateFormat(date, style) {
  if (style === 'short') {
    return `${monthsShort[date.getMonth()]} ${date.getDate()}`;
  }
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

/**
 * Returns date string with year
 * @returns {string}
 */
export function yearDateFormat(date, style) {
  if (style === 'short') {
    return `${date.getDate()} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
  }
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
 *  Allowed options are 'normal' and 'short'. 'normal' is the default
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