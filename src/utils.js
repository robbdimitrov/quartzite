'use strict';

import { dateByAdding } from './index';

/**
 * Calculates the time difference between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {object} Object containing the difference in days,
 *  hours, minutes and seconds
 */
export function difference(date1, date2) {
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
export function isSameWeek(date1, date2) {
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
export function pluralize(number, singular, plural) {
  return `${number} ${number === 1 ? singular : plural}`;
}

/**
 * Prepends zero in front of a number if the number is less than 10
 */
export function numberFormat(number) {
  return ('0' + number).slice(-2);
}

/**
 * Checks if the current system locale time is in AM/PM format.
 * @returns {boolean}
 */
export function isAmPmFormat() {
  const regex = /[APap][mM]/;
  const string = new Date().toLocaleTimeString();
  return string.match(regex) !== null;
}
