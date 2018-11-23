import { relativeDate } from '../dist/relative-date';

const date = new Date();

document.querySelector('.date').innerHTML = date;
document.querySelector('.relative-date').innerHTML = relativeDate(date);
