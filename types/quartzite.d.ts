type StyleKey = 'short' | 'medium' | 'long';
type TypeKey = 'days' | 'hours' | 'minutes' | 'seconds';

export as namespace quartzite;

export function dateByAdding(type: TypeKey, date: Date, value?: number): Date;

export function dateString(date: Date, style?: StyleKey): string;

export function timeString(date: Date): string;
