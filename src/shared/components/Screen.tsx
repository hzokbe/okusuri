import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';

interface ScreeProps {
  title: string;

  description?: string;

  children?: ReactNode;
}

export default function Screen({ title, description, children }: ScreeProps) {
  return (
    <View style={[styles.div, { flex: 1, gap: 2 }]}>
      <View style={[styles.div, { gap: 2 }]}>
        <Text style={styles.h1}>{title}</Text>
        {description && <Text style={styles.h2}>{description}</Text>}
      </View>
      {children && <View style={[styles.div, { flex: 1 }]}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    backgroundColor: '#111111',
    padding: 16,
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
