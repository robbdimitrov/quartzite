'use strict';

import { monthsShort } from '../constants';
import { difference } from '../utils';

export function monthDateFormat(date) {
  return `${monthsShort[date.getMonth()]} ${date.getDate()}`;
}

export function yearDateFormat(date) {
  return `${monthsShort[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function timeDateFormat(now, date) {
  const { days, hours, minutes, seconds } = difference(now, date);

  if (seconds < 5) {
    return 'now';
  }

  let result = '';

  if (seconds < 60) {
    result = `${seconds}s`;
  } else if (minutes < 60) {
    result = `${minutes}m`;
  } else if (hours < 24) {
    result = `${hours}h`;
  } else {
    result = `${days}d`;
  }

  if (now < date) {
    result = 'In ' + result;
  }
  return result;
}

export function dayDateFormat(_now, date) {
  return monthDateFormat(date);
}
