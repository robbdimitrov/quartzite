type TypeKey = 'days' | 'hours' | 'minutes' | 'seconds';
type DateStyle = 'short' | 'medium' | 'long';
type TimeFormat = '12h' | '24h';

export as namespace quartzite;

export function dateByAdding(type: TypeKey, date: Date, value?: number): Date;

export function dateString(date: Date, style?: DateStyle): string;

export function timeString(date: Date, style?: TimeFormat): string;
