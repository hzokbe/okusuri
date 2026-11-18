import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Clock } from 'lucide-react-native';
import Badge from '@/shared/components/Badge';

describe('Badge', () => {
  it('renders the text', async () => {
    await render(<Badge text="12:00" icon={Clock} />);

    expect(screen.getByText('12:00')).toBeTruthy();
  });

  it('renders the icon with the expected props', async () => {
    const IconMock = jest.fn(() => <Text>icon</Text>);

    await render(<Badge text="12:00" icon={IconMock as any} />);

    expect(screen.getByText('icon')).toBeTruthy();

    expect(IconMock).toHaveBeenCalledTimes(1);

    expect((IconMock.mock.calls[0] as unknown[])[0]).toMatchObject({
      size: 12,
      color: '#eeeeee',
    });
  });
});
