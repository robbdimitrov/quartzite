'use strict';

import { months, weekDays } from '../constants';
import { timeString } from '../formatter';
import { getSuffix, isSameWeek, is12HourClock } from '../utils';

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

  const timeFormat = is12HourClock(date) ? '12h' : '24h';

  if (isCurrent && now.getDate() === date.getDate()) {
    return `Today, ${timeString(date, timeFormat)}`;
  } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
    return `Yesterday, ${timeString(date, timeFormat)}`;
  } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
    return `Tomorrow, ${timeString(date, timeFormat)}`;
  } else if (isSameWeek(now, date)) {
    return `${weekDays[date.getDay()]}, ${timeString(date, timeFormat)}`;
  }

  return monthDateFormat(date);
}

export function timeDateFormat(now, date) {
  return dayDateFormat(now, date);
}
