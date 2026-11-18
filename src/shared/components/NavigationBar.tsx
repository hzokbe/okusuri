import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Href, usePathname, useRouter } from 'expo-router';
import {
  AlarmClock,
  History,
  LucideIcon,
  PillBottle,
} from 'lucide-react-native';

interface TabItem {
  key: string;

  path: Href;

  icon: LucideIcon;
}

const items: TabItem[] = [
  { key: 'home', path: '/', icon: AlarmClock },
  { key: 'history', path: '/history', icon: History },
  { key: 'medications', path: '/medications', icon: PillBottle },
];

export default function NavigationBar() {
  const pathname = usePathname();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: '#191919',
        flexDirection: 'row',
        paddingBottom: insets.bottom,
      }}
    >
      {items.map((item) => {
        const focused = pathname === item.path;

        const Icon = item.icon;

        return (
          <Pressable
            key={item.key}
            onPress={() => router.replace(item.path)}
            style={{
              alignItems: 'center',
              flex: 1,
              height: 64,
              justifyContent: 'center',
            }}
            testID={`tab-${item.key}`}
          >
            {focused && (
              <View
                style={{
                  backgroundColor: '#eeeeee',
                  height: 2,
                  position: 'absolute',
                  top: 0,
                  width: 32,
                }}
                testID="active-indicator"
              />
            )}
            <Icon size={24} color={focused ? '#eeeeee' : '#7b7b7b'} />
          </Pressable>
        );
      })}
    </View>
  );
}
