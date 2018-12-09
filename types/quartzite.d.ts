type StyleKey = 'normal' | 'short';

export as namespace quartzite;

export function dateByAdding(type: string, date: Date, value?: number): Date;

export function timeDifference(now: Date, date: Date, style?: StyleKey): string;

export function dateDifference(ow: Date, date: Date, style?: StyleKey): string;

export function formatDate(date: Date, style?: StyleKey): string;
