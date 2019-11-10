'use strict';

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

import {
  timeDifference, dateDifference, monthDateFormat, yearDateFormat
} from './formatter';
import { difference } from './utils';

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
