import Screen from '@/shared/components/Screen';
import { useLogsStore } from '@/shared/stores/useLogsStore';
import HistoryLogsList from '@/shared/components/HistoryLogsList';

export default function HistoryScreen() {
  const logs = useLogsStore((state) => state.logs);

  return (
    <Screen
      title="History"
      description="See what you took, and what you missed."
    >
      <HistoryLogsList logs={logs} />
    </Screen>
  );
}
