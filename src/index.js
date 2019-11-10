'use strict';

import {
  formatDate as formatterFormatDate
} from './formatter';
import styles from './styles';

/**
 * Formats a date by comparing with the current date
 * @param {Date} date - The date to format
 * @param {string} style - The style of the formatter
 *  Allowed options are 'normal' and 'short'. 'normal' is the default.
 * @returns {string}
 */
export function formatDate(date, style = 'medium') {
  return formatterFormatDate(date, styles[style]);
}

export { dateByAdding } from './utils';
export { timeFormat } from './formatter';
