'use strict';

import {
  formatDate as formatterFormatDate,
  timeFormat as formatterTimeFormat
} from './formatter';
import { is12HourClock } from './utils';
import styles from './styles';

/**
 * Returns time string with format hh:mm {AM/PM}
 * @param {Date} date - The date to format
 * @returns {string}
 */
export function timeFormat(date) {
  return formatterTimeFormat(date, is12HourClock());
}

/**
 * Formats a date by comparing with the current date
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter.
 *  Allowed options are 'short', 'medium' and 'long'.
 *  'medium' is the default
 * @returns {string}
 */
export function formatDate(date, style = 'medium') {
  return formatterFormatDate(date, styles[style]);
}

export { dateByAdding } from './utils';
