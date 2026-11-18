import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

export interface BadgeProps {
  text: string;

  icon: LucideIcon;
}

export default function Badge({ text, icon }: BadgeProps) {
  const Icon = icon;

  return (
    <View style={styles.div}>
      <Icon size={12} color="#eeeeee" strokeWidth={3} />
      <Text style={styles.p}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    alignItems: 'center',
    borderColor: '#3a3a3a',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  p: {
    color: '#eeeeee',
    fontSize: 12,
    fontWeight: 500,
  },
});
