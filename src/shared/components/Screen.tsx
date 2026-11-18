import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreeProps {
  title: string;

  description?: string;
}

export default function Screen({ title, description }: ScreeProps) {
  return (
    <SafeAreaView style={styles.div}>
      <Text style={styles.h1}>{title}</Text>
      {description && <Text style={styles.h2}>{description}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  div: {
    alignItems: 'center',
    backgroundColor: '#111111',
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    padding: 24,
  },
  h1: {
    color: '#eeeeee',
    fontSize: 32,
    fontWeight: 600,
  },
  h2: {
    color: '#b4b4b4',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
  },
});
