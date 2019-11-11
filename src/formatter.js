'use strict';

import { numberFormat } from './utils';
import { difference, is12HourClock } from './utils';

/**
 * Returns time string with format hh:mm {AM/PM}
 * @param {Date} date - The date to format
 * @returns {string}
 */
export function timeString(date) {
  const hours = date.getHours();
  const minutes = numberFormat(date.getMinutes());

  if (is12HourClock(date)) {
    const period = hours < 12 ? 'AM' : 'PM';
    return `${hours % 12 || 12}:${minutes} ${period}`;
  }

  return `${numberFormat(hours)}:${minutes}`;
}

/**
 * Formats a date by comparing with the current date
 * @param {Date} date - The date to format
 * @param {object} style - The style of the formatter
 * @returns {string}
 */
export function dateString(date, style) {
  const now = new Date();
  const { days } = difference(now, date);

  if (days < 1) {
    return style.timeDateFormat(now, date);
  } else if (days < 7) {
    return style.dayDateFormat(now, date);
  } else if (now.getFullYear() === date.getFullYear()) {
    return style.monthDateFormat(date);
  }

  return style.yearDateFormat(date);
}
