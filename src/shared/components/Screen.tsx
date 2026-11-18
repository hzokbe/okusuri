import { StyleSheet, Text, View } from 'react-native';

interface ScreeProps {
  title: string;

  description?: string;
}

export default function Screen({ title, description }: ScreeProps) {
  return (
    <View style={styles.div}>
      <Text style={styles.h1}>{title}</Text>
      {description && <Text style={styles.h2}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    backgroundColor: '#111111',
    flex: 1,
    gap: 8,
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
  },
});
