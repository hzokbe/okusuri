import LogCard from '@/shared/components/LogCard';
import { Log } from '@/shared/types/log';
import { format, isToday, isYesterday, startOfDay } from 'date-fns';
import { SectionList, StyleSheet, Text } from 'react-native';

interface HistoryLogsListProps {
  logs: Log[];
}

export interface LogSection {
  title: string;

  data: Log[];
}

function getSectionTitle(date: Date): string {
  if (isToday(date)) {
    return 'Today';
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'PPP');
}

export function groupLogsByDay(logs: Log[]): LogSection[] {
  const groups = new Map<number, Log[]>();

  for (const log of logs) {
    const key = startOfDay(log.scheduledAt).getTime();

    groups.set(key, [...(groups.get(key) ?? []), log]);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([key, data]) => ({
      title: getSectionTitle(new Date(key)),
      data: [...data].sort(
        (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime(),
      ),
    }))
    .filter((ls) => ls.title !== 'Today');
}

export default function HistoryLogsList({ logs }: HistoryLogsListProps) {
  const sections = groupLogsByDay(logs);

  return (
    <SectionList
      sections={sections}
      renderItem={({ item }) => <LogCard log={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={styles.h2}>{section.title}</Text>
      )}
      contentContainerStyle={{ gap: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  h2: {
    color: '#b4b4b4',
    fontSize: 16,
    fontWeight: 500,
  },
});
