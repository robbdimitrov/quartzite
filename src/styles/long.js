'use strict';

import { months, weekDays } from '../constants';
import { timeFormat } from '../formatter';
import { getSuffix, isSameWeek } from '../utils';

export function yearDateFormat(date) {
  const day = date.getDate();
  const suffix = getSuffix(day);
  return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
}

export function monthDateFormat(date) {
  const day = date.getDate();
  const suffix = getSuffix(day);
  return `${weekDays[date.getDay()]}, ${months[date.getMonth()]} ${day}${suffix}`;
}

export function dayDateFormat(now, date) {
  let isCurrent = now.getFullYear() === date.getFullYear()
    && now.getMonth() === date.getMonth();

  if (isCurrent && now.getDate() === date.getDate()) {
    return `Today, ${timeFormat(date)}`;
  } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
    return `Yesterday, ${timeFormat(date)}`;
  } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
    return `Tomorrow, ${timeFormat(date)}`;
  } else if (isSameWeek(now, date)) {
    return `${weekDays[date.getDay()]}, ${timeFormat(date)}`;
  }

  return monthDateFormat(date);
}

export function timeDateFormat(now, date) {
  return dayDateFormat(now, date);
}
