import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';
import Badge, { BadgeProps } from '@/shared/components/Badge';

interface CardProps {
  title: string;

  description?: string;

  children?: ReactNode;

  badges: BadgeProps[];
}

export default function Card({
  title,
  description,
  children,
  badges,
}: CardProps) {
  return (
    <View style={styles.div}>
      <View>
        <Text style={styles.h3}>{title}</Text>
        {description && <Text style={styles.p}>{description}</Text>}
      </View>
      {children && <View>{children}</View>}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {badges.map((badge, index) => (
          <Badge key={index} text={badge.text} icon={badge.icon} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    backgroundColor: '#191919',
    borderColor: '#3a3a3a',
    borderRadius: 4,
    borderWidth: 1,
    gap: 8,
    padding: 24,
  },
  h3: {
    color: '#eeeeee',
    fontWeight: 600,
  },
  p: {
    color: '#b4b4b4',
    fontSize: 12,
  },
});
