import { render } from '@testing-library/react-native';
import {
  CircleCheck,
  Clock,
  Droplet,
  Pill,
  Syringe,
} from 'lucide-react-native';
import Card from '@/shared/components/Card';
import LogCard from '@/shared/components/LogCard';
import { Dose } from '@/shared/types/dose';
import { Log } from '@/shared/types/log';
import { Medication } from '@/shared/types/medication';
import { Schedule } from '@/shared/types/schedule';
import { TimeOfDay } from '@/shared/types/time-of-day';
import { WeekdaySet } from '@/shared/types/weekday-set';

jest.mock('@/shared/components/Card', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const now = new Date(2026, 0, 5, 12, 0);

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

const syrup = Medication.create({
  id: '3c1f2f0e-6a4b-4f0b-9a57-0b6c6a9d1e11',
  name: 'Syrup',
  dose: Dose.of(5, 'mL'),
  schedule: Schedule.of(TimeOfDay.parse('10:00'), WeekdaySet.everyDay()),
});

function scheduleLog(id: string, medication: Medication) {
  return Log.schedule(id, medication, medication.schedule.time.atDate(now));
}

function getCardProps() {
  const mockedCard = Card as unknown as jest.Mock;

  return mockedCard.mock.calls[0][0];
}

describe('LogCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes the medication name as title', async () => {
    await render(
      <LogCard
        log={scheduleLog('08388659-094f-44c6-959e-d473853fe62c', ibuprofen)}
      />,
    );

    expect(getCardProps().title).toBe('Ibuprofen');
  });

  it.each([
    [ibuprofen, '08:00'],
    [insulin, '09:00'],
  ])('renders the scheduled time badge for %#', async (medication, time) => {
    await render(
      <LogCard
        log={scheduleLog('08388659-094f-44c6-959e-d473853fe62c', medication)}
      />,
    );

    expect(getCardProps().badges[0]).toEqual({
      icon: Clock,
      text: TimeOfDay.parse(time).toString(),
    });
  });

  it.each([
    [ibuprofen, Pill],
    [insulin, Syringe],
    [syrup, Droplet],
  ])('renders the dose badge for %#', async (medication, icon) => {
    await render(
      <LogCard
        log={scheduleLog('08388659-094f-44c6-959e-d473853fe62c', medication)}
      />,
    );

    expect(getCardProps().badges[1]).toEqual({
      icon,
      text: medication.dose.toString(),
    });
  });

  it('renders the pending status badge', async () => {
    await render(
      <LogCard
        log={scheduleLog('08388659-094f-44c6-959e-d473853fe62c', ibuprofen)}
      />,
    );

    expect(getCardProps().badges[2]).toEqual({
      icon: Clock,
      text: 'Pending',
    });
  });

  it('renders the taken status badge', async () => {
    await render(
      <LogCard
        log={scheduleLog(
          '08388659-094f-44c6-959e-d473853fe62c',
          ibuprofen,
        ).take(now)}
      />,
    );

    expect(getCardProps().badges[2]).toEqual({
      icon: CircleCheck,
      text: 'Taken',
    });
  });
});
