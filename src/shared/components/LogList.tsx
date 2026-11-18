import { FlatList } from 'react-native';
import LogCard from '@/shared/components/LogCard';
import { Log } from '@/shared/types/log';

interface LogListProps {
  logs: Log[];
}

export default function LogList({ logs }: LogListProps) {
  return (
    <FlatList
      data={logs}
      renderItem={({ item }) => <LogCard log={item} />}
      contentContainerStyle={{ gap: 8 }}
    />
  );
}
