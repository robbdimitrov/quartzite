'use strict';

import { numberFormat } from './utils';
import { difference } from './utils';

/**
 * Returns time string with format hh:mm {AM/PM}
 * @param {Date} date - The date to format
 * @param {string} format - The time format.
 *  Can be '12h' or '24h'. '24h' is the default
 * @returns {string}
 */
export function timeString(date, format = '24h') {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let suffix = '';

  if (format === '12h') {
    suffix = ' ' + (hours < 12 ? 'AM' : 'PM');
    hours = hours % 12 || 12;
  }

  return `${numberFormat(hours)}:${numberFormat(minutes)}${suffix}`;
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
