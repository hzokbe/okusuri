import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react-native';
import { usePathname } from 'expo-router';
import NavigationBar from './NavigationBar';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 20, left: 0, right: 0 }),
}));

const mockedUsePathname = usePathname as jest.Mock;

describe('NavigationBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUsePathname.mockReturnValue('/');
  });

  it('renders all tabs', async () => {
    await render(<NavigationBar />);

    expect(screen.getByTestId('tab-home')).toBeTruthy();

    expect(screen.getByTestId('tab-history')).toBeTruthy();

    expect(screen.getByTestId('tab-medications')).toBeTruthy();
  });

  it('applies the bottom safe area inset as padding', async () => {
    await render(<NavigationBar />);

    expect(screen.root).toHaveStyle({ paddingBottom: 20 });
  });

  it.each([
    ['/', 'home'],
    ['/history', 'history'],
    ['/medications', 'medications'],
  ])(
    'shows the indicator only on the focused tab when pathname is %s',
    async (pathname, focusedKey) => {
      mockedUsePathname.mockReturnValue(pathname);

      await render(<NavigationBar />);

      expect(screen.getAllByTestId('active-indicator')).toHaveLength(1);

      ['home', 'history', 'medications'].forEach((key) => {
        const indicator = within(
          screen.getByTestId(`tab-${key}`),
        ).queryByTestId('active-indicator');

        if (key === focusedKey) {
          expect(indicator).toBeTruthy();
        } else {
          expect(indicator).toBeNull();
        }
      });
    },
  );

  it('renders no indicator when pathname matches no tab', async () => {
    mockedUsePathname.mockReturnValue('/settings');

    await render(<NavigationBar />);

    expect(screen.queryByTestId('active-indicator')).toBeNull();
  });

  it.each([
    ['home', '/'],
    ['history', '/history'],
    ['medications', '/medications'],
  ])('navigates with replace when %s is pressed', async (key, path) => {
    await render(<NavigationBar />);

    await fireEvent.press(screen.getByTestId(`tab-${key}`));

    expect(mockReplace).toHaveBeenCalledTimes(1);

    expect(mockReplace).toHaveBeenCalledWith(path);
  });
});
