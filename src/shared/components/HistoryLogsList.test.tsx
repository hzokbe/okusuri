import { render, screen } from '@testing-library/react-native';
import { format } from 'date-fns';
import HistoryLogsList, {
  groupLogsByDay,
} from '@/shared/components/HistoryLogsList';
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

const now = new Date(2026, 0, 7, 12, 0);

function daysAgo(days: number) {
  const date = new Date(now);

  date.setDate(date.getDate() - days);

  return date;
}

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

function scheduleLog(id: string, medication: Medication, date: Date) {
  return Log.schedule(id, medication, medication.schedule.time.atDate(date));
}

beforeEach(() => {
  jest.useFakeTimers({
    now,
    doNotFake: [
      'nextTick',
      'queueMicrotask',
      'setImmediate',
      'clearImmediate',
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
    ],
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('groupLogsByDay', () => {
  it('returns an empty list when there are no logs', () => {
    expect(groupLogsByDay([])).toEqual([]);
  });

  it('excludes the logs from today', () => {
    const logs = [
      scheduleLog('1', ibuprofen, now),
      scheduleLog('2', insulin, daysAgo(1)),
    ];

    const sections = groupLogsByDay(logs);

    expect(sections).toHaveLength(1);

    expect(sections[0].title).toBe('Yesterday');
  });

  it('uses "Yesterday" as the title for the previous day', () => {
    const sections = groupLogsByDay([scheduleLog('1', insulin, daysAgo(1))]);

    expect(sections[0].title).toBe('Yesterday');
  });

  it('uses the formatted date as the title for older days', () => {
    const date = daysAgo(3);

    const sections = groupLogsByDay([scheduleLog('1', insulin, date)]);

    expect(sections[0].title).toBe(format(date, 'PPP'));
  });

  it('groups the logs from the same day in one section', () => {
    const first = scheduleLog('1', ibuprofen, daysAgo(1));

    const second = scheduleLog('2', insulin, daysAgo(1));

    const sections = groupLogsByDay([first, second]);

    expect(sections).toHaveLength(1);

    expect(sections[0].data).toHaveLength(2);
  });

  it('orders the sections from the most recent to the oldest', () => {
    const logs = [
      scheduleLog('1', ibuprofen, daysAgo(3)),
      scheduleLog('2', insulin, daysAgo(1)),
      scheduleLog('3', amoxicillin, daysAgo(2)),
    ];

    const titles = groupLogsByDay(logs).map((section) => section.title);

    expect(titles).toEqual([
      'Yesterday',
      format(daysAgo(2), 'PPP'),
      format(daysAgo(3), 'PPP'),
    ]);
  });

  it('orders the logs of a section by scheduled time', () => {
    const late = scheduleLog('1', amoxicillin, daysAgo(1));

    const early = scheduleLog('2', ibuprofen, daysAgo(1));

    const middle = scheduleLog('3', insulin, daysAgo(1));

    const [section] = groupLogsByDay([late, early, middle]);

    expect(section.data.map((log) => log.medicationName)).toEqual([
      'Ibuprofen',
      'Insulin',
      'Amoxicillin',
    ]);
  });

  it('does not mutate the received list', () => {
    const logs = [
      scheduleLog('1', amoxicillin, daysAgo(1)),
      scheduleLog('2', ibuprofen, daysAgo(1)),
    ];

    const snapshot = [...logs];

    groupLogsByDay(logs);

    expect(logs).toEqual(snapshot);
  });
});

describe('HistoryLogsList', () => {
  it('renders the section titles', async () => {
    const logs = [
      scheduleLog('1', ibuprofen, daysAgo(1)),
      scheduleLog('2', insulin, daysAgo(3)),
    ];

    await render(<HistoryLogsList logs={logs} />);

    expect(screen.getByText('Yesterday')).toBeTruthy();

    expect(screen.getByText(format(daysAgo(3), 'PPP'))).toBeTruthy();
  });

  it('renders a card for each past log', async () => {
    const logs = [
      scheduleLog('1', ibuprofen, daysAgo(1)),
      scheduleLog('2', insulin, daysAgo(2)),
    ];

    await render(<HistoryLogsList logs={logs} />);

    expect(screen.getByText('Ibuprofen')).toBeTruthy();

    expect(screen.getByText('Insulin')).toBeTruthy();
  });

  it('does not render the logs from today', async () => {
    const logs = [
      scheduleLog('1', ibuprofen, now),
      scheduleLog('2', insulin, daysAgo(1)),
    ];

    await render(<HistoryLogsList logs={logs} />);

    expect(screen.queryByText('Ibuprofen')).toBeNull();

    expect(screen.queryByText('Today')).toBeNull();

    expect(screen.getByText('Insulin')).toBeTruthy();
  });

  it('renders nothing when the list is empty', async () => {
    await render(<HistoryLogsList logs={[]} />);

    expect(screen.queryByText('Yesterday')).toBeNull();
  });
});
