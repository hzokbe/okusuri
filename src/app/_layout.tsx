import { View } from 'react-native';
import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationBar from '@/shared/components/NavigationBar';

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor: '#111111', flex: 1 }}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Slot />
      </View>
      <NavigationBar />
    </View>
  );
}
