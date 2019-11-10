'use strict';

import { numberFormat, is12HourClock } from './utils';
import { difference } from './utils';

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
 * Formats a date by comparing with the current date
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter
 *  Allowed options are 'normal' and 'short'. 'normal' is the default.
 * @returns {string}
 */
export function formatDate(date, style = 'medium') {
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
