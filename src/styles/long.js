'use strict';

import { months, weekDays } from '../constants';
import { timeString } from '../formatter';
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
  const isCurrent = now.getFullYear() === date.getFullYear()
    && now.getMonth() === date.getMonth();

  if (isCurrent && now.getDate() === date.getDate()) {
    return `Today, ${timeString(date)}`;
  } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
    return `Yesterday, ${timeString(date)}`;
  } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
    return `Tomorrow, ${timeString(date)}`;
  } else if (isSameWeek(now, date)) {
    return `${weekDays[date.getDay()]}, ${timeString(date)}`;
  }

  return monthDateFormat(date);
}

export function timeDateFormat(now, date) {
  return dayDateFormat(now, date);
}
