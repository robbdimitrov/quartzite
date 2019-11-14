'use strict';

import { dateString as formatterDateString } from './formatter';
import styles from './styles';

/**
 * Formats a date by comparing with the current date
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter.
 *  Allowed options are 'short', 'medium' and 'long'.
 *  'medium' is the default
 * @returns {string}
 */
export function dateString(date, style = 'medium') {
  return formatterDateString(date, styles[style]);
}

export { dateByAdding } from './utils';
export { timeString } from './formatter';
