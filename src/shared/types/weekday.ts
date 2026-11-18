export const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export function weekdayFromDate(date: Date): Weekday {
  return WEEKDAYS[date.getDay()];
}
