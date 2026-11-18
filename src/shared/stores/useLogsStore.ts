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

const amoxicillin = Medication.create({
  id: 'bcbe207a-06dc-4868-9559-60f2016e9a3b',
  name: 'Amoxicillin',
  dose: Dose.of(500, 'mg'),
  schedule: Schedule.of(TimeOfDay.parse('10:00'), WeekdaySet.of('monday')),
});

const metformin = Medication.create({
  id: '3d2c1a5e-9f4b-4e7a-8a61-2b7c5d9e0f11',
  name: 'Metformin',
  dose: Dose.of(850, 'mg'),
  schedule: Schedule.of(TimeOfDay.parse('12:00'), WeekdaySet.everyDay()),
});

const omeprazole = Medication.create({
  id: 'c91e4f27-6b3a-4d58-b0e2-7a1f8c3d4e92',
  name: 'Omeprazole',
  dose: Dose.of(20, 'mg'),
  schedule: Schedule.of(TimeOfDay.parse('07:00'), WeekdaySet.everyDay()),
});

const losartan = Medication.create({
  id: 'e5a7b3c9-1d2f-4a86-9c40-5f6e7d8a9b03',
  name: 'Losartan',
  dose: Dose.of(50, 'mg'),
  schedule: Schedule.of(TimeOfDay.parse('20:00'), WeekdaySet.everyDay()),
});

const dipyrone = Medication.create({
  id: '9b8c7d6e-5f4a-4b3c-a2d1-0e9f8a7b6c54',
  name: 'Dipyrone',
  description: 'Drops for pain and fever',
  dose: Dose.of(40, 'mL'),
  schedule: Schedule.of(
    TimeOfDay.parse('14:00'),
    WeekdaySet.of('tuesday', 'thursday'),
  ),
});

const vitaminD = Medication.create({
  id: '4f3e2d1c-0b9a-4c8d-b7e6-a5f4c3d2e1b0',
  name: 'Vitamin D',
  dose: Dose.of(2000, 'UI'),
  schedule: Schedule.of(TimeOfDay.parse('08:00'), WeekdaySet.of('sunday')),
});

function daysAgo(days: number, from: Date): Date {
  const date = new Date(from);

  date.setDate(date.getDate() - days);

  return date;
}

function createInitialLogs(): Log[] {
  const now = new Date();

  const yesterday = daysAgo(1, now);

  const twoDaysAgo = daysAgo(2, now);

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
    Log.schedule(
      '6a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d',
      omeprazole,
      omeprazole.schedule.time.atDate(now),
    ).take(now),
    Log.schedule(
      '7b2c3d4e-5f6a-4b7c-9d8e-0f1a2b3c4d5e',
      metformin,
      metformin.schedule.time.atDate(now),
    ),
    Log.schedule(
      '8c3d4e5f-6a7b-4c8d-ae9f-1a2b3c4d5e6f',
      losartan,
      losartan.schedule.time.atDate(now),
    ),
    Log.schedule(
      '1f88f390-9545-452b-93e3-a7fc11bce4a0',
      amoxicillin,
      amoxicillin.schedule.time.atDate(yesterday),
    ),
    Log.schedule(
      '9d4e5f6a-7b8c-4d9e-bf0a-2b3c4d5e6f7a',
      dipyrone,
      dipyrone.schedule.time.atDate(yesterday),
    ).skip(yesterday),
    Log.schedule(
      'ae5f6a7b-8c9d-4eaf-80b1-3c4d5e6f7a8b',
      insulin,
      insulin.schedule.time.atDate(yesterday),
    ).take(yesterday),
    Log.schedule(
      'bf6a7b8c-9d0e-4fb0-91c2-4d5e6f7a8b9c',
      vitaminD,
      vitaminD.schedule.time.atDate(twoDaysAgo),
    ).take(twoDaysAgo),
    Log.schedule(
      'c07b8c9d-0e1f-40c1-a2d3-5e6f7a8b9c0d',
      metformin,
      metformin.schedule.time.atDate(twoDaysAgo),
    ).take(twoDaysAgo),
  ];
}

interface LogsStore {
  logs: Log[];
}

export const useLogsStore = create<LogsStore>(() => ({
  logs: createInitialLogs(),
}));
