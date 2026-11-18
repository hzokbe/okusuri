import { Schedule } from '@/shared/types/schedule';
import { Dose } from '@/shared/types/dose';

interface MedicationProps {
  id: string;
  name: string;
  description?: string;
  dose: Dose;
  schedule: Schedule;
}

export class Medication {
  readonly id: string;

  readonly name: string;

  readonly description?: string;

  readonly dose: Dose;

  readonly schedule: Schedule;

  private constructor(props: MedicationProps) {
    this.id = props.id;

    this.name = props.name;

    this.description = props.description;

    this.dose = props.dose;

    this.schedule = props.schedule;
  }

  static create(props: MedicationProps): Medication {
    const name = props.name.trim();

    if (name.length === 0) {
      throw new Error('Medication name is required');
    }

    return new Medication({ ...props, name });
  }
}
