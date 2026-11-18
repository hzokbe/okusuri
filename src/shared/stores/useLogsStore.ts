import { create } from 'zustand';
import { Dose } from '@/shared/types/dose';
import { Log } from '@/shared/types/log';
import { Medication } from '@/shared/types/medication';
import { Schedule } from '@/shared/types/schedule';
import { TimeOfDay } from '@/shared/types/time-of-day';
import { WeekdaySet } from '@/shared/types/weekday-set';

const ibuprofen = Medication.create({
  id: 'aef59e45-e5bc-4cd5-b877-64e075b57f73',
  name: 'Ibuprofen',
  dose: Dose.of(400, 'mg'),
  schedule: Schedule.of(
    TimeOfDay.parse('08:00'),
    WeekdaySet.of('monday', 'wednesday', 'friday'),
  ),
});

const insulin = Medication.create({
  id: '7aec875c-b8f7-43dc-97db-5ee29adf86bc',
  name: 'Insulin',
  dose: Dose.of(20, 'UI'),
  schedule: Schedule.of(TimeOfDay.parse('09:00'), WeekdaySet.everyDay()),
});

function createInitialLogs(): Log[] {
  const now = new Date();

  return [
    Log.schedule(
      '08388659-094f-44c6-959e-d473853fe62c',
      ibuprofen,
      ibuprofen.schedule.time.atDate(now),
    ).take(now),
    Log.schedule(
      '02ff80ec-cc49-4cbf-8f46-cd73927c99d5',
      insulin,
      insulin.schedule.time.atDate(now),
    ),
  ];
}

interface LogsStore {
  logs: Log[];
}

export const useLogsStore = create<LogsStore>((set) => ({
  logs: createInitialLogs(),
}));
