import Screen from '@/shared/components/Screen';
import { useLogsStore } from '@/shared/stores/useLogsStore';
import LogsList from '@/shared/components/LogList';

export default function TodayScreen() {
  const logs = useLogsStore((state) => state.logs);

  const today = new Date();

  const todayLogs = logs
    .filter((log) => log.isScheduledOn(today))
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  return (
    <Screen title="Today" description="Your medications scheduled for today.">
      <LogsList logs={todayLogs} />
    </Screen>
  );
}
