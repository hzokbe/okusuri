const PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class TimeOfDay {
  private constructor(
    readonly hours: number,
    readonly minutes: number,
  ) {}

  static of(hours: number, minutes: number): TimeOfDay {
    if (hours < 0 || hours > 23) {
      throw new RangeError(`Invalid hours: ${hours}`);
    }

    if (minutes < 0 || minutes > 59) {
      throw new RangeError(`Invalid minutes: ${minutes}`);
    }

    return new TimeOfDay(hours, minutes);
  }

  static parse(value: string): TimeOfDay {
    const match = PATTERN.exec(value);

    if (!match) {
      throw new RangeError(`Invalid time: ${value}`);
    }

    return new TimeOfDay(Number(match[1]), Number(match[2]));
  }

  atDate(date: Date): Date {
    const result = new Date(date);

    result.setHours(this.hours, this.minutes, 0, 0);

    return result;
  }

  toString(): string {
    return `${String(this.hours).padStart(2, '0')}:${String(this.minutes).padStart(2, '0')}`;
  }
}
