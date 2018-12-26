type StyleKey = 'normal' | 'short';
type TypeKey = 'days' | 'hours' | 'minutes' | 'seconds';

export as namespace quartzite;

export function dateByAdding(type: TypeKey, date: Date, value?: number): Date;

export function timeDifference(now: Date, date: Date, style?: StyleKey): string;

export function dateDifference(now: Date, date: Date, style?: StyleKey): string;

export function formatDate(date: Date, style?: StyleKey): string;
