export const LOG_STATUSES = ['pending', 'taken', 'skipped', 'missed'] as const;

export type LogStatus = (typeof LOG_STATUSES)[number];
