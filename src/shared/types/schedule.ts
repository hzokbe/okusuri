import { TimeOfDay } from '@/shared/types/time-of-day';
import { WeekdaySet } from '@/shared/types/weekday-set';
import { weekdayFromDate } from '@/shared/types/weekday';

export class Schedule {
  private constructor(
    readonly time: TimeOfDay,
    readonly weekdays: WeekdaySet,
  ) {}

  static of(time: TimeOfDay, weekdays: WeekdaySet): Schedule {
    return new Schedule(time, weekdays);
  }

  occursOn(date: Date): boolean {
    return this.weekdays.has(weekdayFromDate(date));
  }
}
