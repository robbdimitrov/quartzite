'use strict';

import { months, weekDays } from '../constants';
import { pluralize, difference, isSameWeek } from '../utils';

export function yearDateFormat(date) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function monthDateFormat(date) {
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

export function dayDateFormat(now, date) {
  const isCurrent = now.getFullYear() === date.getFullYear()
    && now.getMonth() === date.getMonth();

  if (isCurrent && now.getDate() === date.getDate()) {
    return 'Today';
  } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
    return 'Yesterday';
  } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
    return 'Tomorrow';
  } else if (isSameWeek(now, date)) {
    return `${weekDays[date.getDay()]}`;
  }

  return monthDateFormat(date);
}

export function timeDateFormat(now, date) {
  const { days, hours, minutes, seconds } = difference(now, date);

  if (seconds < 5) {
    return 'Just now';
  }

  let result = '';

  if (seconds < 60) {
    result = pluralize(seconds, 'second', 'seconds');
  } else if (minutes < 60) {
    result = pluralize(minutes, 'minute', 'minutes');
  } else if (hours < 24) {
    result = pluralize(hours, 'hour', 'hours');
  } else {
    result = pluralize(days, 'day', 'days');
  }

  if (now > date) {
    result = result + ' ago';
  } else if (now < date) {
    result = 'In ' + result;
  }
  return result;
}
