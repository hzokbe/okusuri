import { Medication } from '@/shared/types/medication';
import { LogStatus } from '@/shared/types/log-status';
import { Dose } from '@/shared/types/dose';

interface LogProps {
  id: string;

  medicationId: string;

  medicationName: string;

  dose: Dose;

  scheduledAt: Date;

  status: LogStatus;

  resolvedAt?: Date;
}

export class Log {
  readonly id: string;

  readonly medicationId: string;

  readonly medicationName: string;

  readonly dose: Dose;

  readonly scheduledAt: Date;

  readonly status: LogStatus;

  readonly resolvedAt?: Date;

  private constructor(props: LogProps) {
    this.id = props.id;

    this.medicationId = props.medicationId;

    this.medicationName = props.medicationName;

    this.dose = props.dose;

    this.scheduledAt = props.scheduledAt;

    this.status = props.status;

    this.resolvedAt = props.resolvedAt;
  }

  get isPending(): boolean {
    return this.status === 'pending';
  }

  static schedule(id: string, medication: Medication, scheduledAt: Date): Log {
    return new Log({
      id,
      medicationId: medication.id,
      medicationName: medication.name,
      dose: medication.dose,
      scheduledAt,
      status: 'pending',
    });
  }

  take(at: Date): Log {
    return this.resolve('taken', at);
  }

  skip(at: Date): Log {
    return this.resolve('skipped', at);
  }

  isScheduledOn(date: Date): boolean {
    return (
      this.scheduledAt.getFullYear() === date.getFullYear() &&
      this.scheduledAt.getMonth() === date.getMonth() &&
      this.scheduledAt.getDate() === date.getDate()
    );
  }

  private resolve(status: Exclude<LogStatus, 'pending'>, at: Date): Log {
    if (!this.isPending) {
      throw new Error(`Log already resolved as ${this.status}`);
    }

    return new Log({ ...this, status, resolvedAt: at });
  }
}
