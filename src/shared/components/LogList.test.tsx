import { render, screen } from '@testing-library/react-native';
import LogList from '@/shared/components/LogList';
import { Dose } from '@/shared/types/dose';
import { Log } from '@/shared/types/log';
import { Medication } from '@/shared/types/medication';
import { Schedule } from '@/shared/types/schedule';
import { TimeOfDay } from '@/shared/types/time-of-day';
import { WeekdaySet } from '@/shared/types/weekday-set';

jest.mock('@/shared/components/LogCard', () => {
  const { Text } = require('react-native');

  return {
    __esModule: true,
    default: ({ log }: { log: Log }) => <Text>{log.medicationName}</Text>,
  };
});

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

const ibuprofenLog = Log.schedule(
  '08388659-094f-44c6-959e-d473853fe62c',
  ibuprofen,
  ibuprofen.schedule.time.atDate(now),
).take(now);

const insulinLog = Log.schedule(
  '02ff80ec-cc49-4cbf-8f46-cd73927c99d5',
  insulin,
  insulin.schedule.time.atDate(now),
);

describe('LogList', () => {
  it('renders a card for each log', async () => {
    await render(<LogList logs={[ibuprofenLog, insulinLog]} />);

    expect(screen.getByText('Ibuprofen')).toBeTruthy();

    expect(screen.getByText('Insulin')).toBeTruthy();
  });

  it('keeps the order of the logs', async () => {
    await render(<LogList logs={[insulinLog, ibuprofenLog]} />);

    const names = screen
      .getAllByText(/Ibuprofen|Insulin/)
      .map((node) => node.props.children);

    expect(names).toEqual(['Insulin', 'Ibuprofen']);
  });

  it('renders nothing when the list is empty', async () => {
    await render(<LogList logs={[]} />);

    expect(screen.queryByText(/Ibuprofen|Insulin/)).toBeNull();
  });
});
