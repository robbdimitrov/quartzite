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
  const nextDate = new Date(date);

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

/**
 * Calculates the time difference between two dates
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {object} Object containing the difference in days,
 *  hours, minutes and seconds
 */
export function difference(date1, date2) {
  const seconds = Math.round(Math.abs(date1 - date2) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

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
  const weekStart = dateByAdding('days', date1, -date1.getDay());
  weekStart.setHours(0, 0, 0);
  const weekEnd = dateByAdding('days', date1, 6 - date1.getDay());
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
 * Checks if the current system locale time is in 24-hour clock format
 * @returns {boolean}
 */
export function is12HourClock(date) {
  const regex = /[APap][mM]/;
  const string = date.toLocaleTimeString();
  return string.match(regex) !== null;
}

/**
 * Gets order suffix from a given number
 * @returns {string}
 */
export function getSuffix(number) {
  const last = number % 10;
  let suffix = '';
  switch (last) {
  case 1:
    suffix = 'st';
    break;
  case 2:
    suffix = 'nd';
    break;
  case 3:
    suffix = 'rd';
    break;
  default:
    suffix = 'th';
  }
  return suffix;
}
