'use strict';

// Globals

const months = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'];

// Modifiers

function dateByAdding(type, date, value) {
  let nextDate = new Date(date);

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
  case 'seconds':
    nextDate.setSeconds(date.getSeconds() + value);
    break;
  default:
    nextDate.setSeconds(date.getSeconds() + value);
  }

  return nextDate;
}

// Helpers

function isSameWeek(date1, date2) {
  let weekStart = dateByAdding('days', date1, -7);
  return (date2 >= weekStart && date2 <= date1);
}

function numberFormatter(number) {
  return `${number < 10 ? '0' : ''}${number}`;
}

function timeFormatter(date) {
  return `${numberFormatter(date.getHours())}:${numberFormatter(date.getMinutes())}`;
}

function pluralFormatter(number, singular, plural) {
  return `${number} ${number === 1 ? singular : plural} ago`;
}

// Time difference

function timeDifference(now, date) {
  let seconds = Math.round((now - date) / 1000);
  let minutes = Math.round(seconds / 60);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);

  if (seconds < 5) {
    return 'Just now';
  } else if (seconds < 60) {
    return pluralFormatter(seconds, 'second', 'seconds');
  } else if (minutes < 60) {
    return pluralFormatter(minutes, 'minute', 'minutes');
  } else if (hours < 24) {
    return pluralFormatter(hours, 'hour', 'hours');
  } else {
    return pluralFormatter(days, 'day', 'days');
  }
}

function dateDifference(now, date) {
  let isCurrent = now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth();

  if (isCurrent && now.getDate() === date.getDate()) {
    return `Today at ${timeFormatter(date)}`;
  } else if (isCurrent && (now.getDate() - 1) === date.getDate()) {
    return `Yesterday at ${timeFormatter(date)}`;
  } else if (isCurrent && (now.getDate() + 1) === date.getDate()) {
    return `Tomorrow at ${timeFormatter(date)}`;
  } else if (isSameWeek(now, date)) {
    return `${weekDays[date.getDay()]} at ${timeFormatter(date)}`;
  }

  return date.toDateString();
}

// Relativity

export default function relativeDate(date) {
  let now = new Date();

  if (now < dateByAdding('days', date, 1)) {
    return timeDifference(now, date);
  } else if (now < dateByAdding('days', date, 7)) {
    return dateDifference(now, date);
  } else if (now.getFullYear === date.getFullYear) {
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
