export const DOSE_UNITS = ['mg', 'mL', 'UI'] as const;

export type DoseUnit = (typeof DOSE_UNITS)[number];

export class Dose {
  private constructor(
    readonly amount: number,
    readonly unit: DoseUnit,
  ) {}

  static of(amount: number, unit: DoseUnit): Dose {
    if (amount <= 0) {
      throw new RangeError(`Invalid dose amount: ${amount}`);
    }

    return new Dose(amount, unit);
  }

  toString(): string {
    return `${this.amount} ${this.unit}`;
  }
}
