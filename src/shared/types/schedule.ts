import { TimeOfDay } from '@/shared/types/time-of-day';

export class Schedule {
  private constructor(readonly time: TimeOfDay) {}

  static of(time: TimeOfDay): Schedule {
    return new Schedule(time);
  }
}
