import { Weekday, WEEKDAYS } from '@/shared/types/weekday';

export class WeekdaySet {
  private constructor(private readonly days: ReadonlySet<Weekday>) {}

  static of(...weekdays: Weekday[]): WeekdaySet {
    if (weekdays.length === 0) {
      throw new RangeError('At least one weekday is required');
    }

    return new WeekdaySet(new Set(weekdays));
  }

  static everyDay(): WeekdaySet {
    return new WeekdaySet(new Set(WEEKDAYS));
  }
}
