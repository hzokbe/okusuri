import {
  CircleCheck,
  CircleX,
  Clock,
  Droplet,
  LucideIcon,
  Pill,
  SkipForward,
  Syringe,
} from 'lucide-react-native';
import Card from '@/shared/components/Card';
import { Log } from '@/shared/types/log';
import { LogStatus } from '@/shared/types/log-status';
import { DoseUnit } from '@/shared/types/dose';
import { TimeOfDay } from '@/shared/types/time-of-day';

const STATUS_ICONS: Record<LogStatus, LucideIcon> = {
  pending: Clock,
  taken: CircleCheck,
  skipped: SkipForward,
  missed: CircleX,
};

const DOSE_UNIT_ICONS: Record<DoseUnit, LucideIcon> = {
  mg: Pill,
  mL: Droplet,
  UI: Syringe,
};

function capitalize(str: string) {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface LogCardProps {
  log: Log;
}

export default function LogCard({ log }: LogCardProps) {
  return (
    <Card
      title={log.medicationName}
      badges={[
        {
          icon: Clock,
          text: TimeOfDay.of(
            log.scheduledAt.getHours(),
            log.scheduledAt.getMinutes(),
          ).toString(),
        },
        {
          icon: DOSE_UNIT_ICONS[log.dose.unit],
          text: log.dose.toString(),
        },
        {
          icon: STATUS_ICONS[log.status],
          text: capitalize(log.status),
        },
      ]}
    />
  );
}
