import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import Card from '@/shared/components/Card';
import Badge from '@/shared/components/Badge';
import { Clock, Pill } from 'lucide-react-native';

jest.mock('@/shared/components/Badge', () => {
  const { Text } = require('react-native');

  return {
    __esModule: true,
    default: jest.fn(({ text }: { text: string }) => <Text>{text}</Text>),
  };
});

describe('Card', () => {
  const title = 'Lorem ipsum';

  const description = 'Lorem ipsum dolor sit amet';

  const badges = [
    { icon: Clock, text: '12:00' },
    { icon: Pill, text: '500 mg' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title', async () => {
    await render(<Card title={title} badges={[]} />);

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('renders the description when provided', async () => {
    await render(<Card title={title} description={description} badges={[]} />);

    expect(screen.getByText(description)).toBeTruthy();
  });

  it('does not render the description when omitted', async () => {
    await render(<Card title={title} badges={[]} />);

    expect(screen.queryByText(description)).toBeNull();
  });

  it('renders children when provided', async () => {
    await render(
      <Card title={title} badges={[]}>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </Card>,
    );

    expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeTruthy();
  });

  it('does not render children when omitted', async () => {
    await render(<Card title={title} badges={[]} />);

    expect(screen.queryByText('Lorem ipsum dolor sit amet.')).toBeNull();
  });

  it('renders all badges', async () => {
    await render(<Card title={title} badges={badges} />);

    expect(screen.getByText('12:00')).toBeTruthy();

    expect(screen.getByText('500 mg')).toBeTruthy();
  });

  it('renders no badges when the list is empty', async () => {
    await render(<Card title={title} badges={[]} />);

    expect(screen.queryByText('12:00')).toBeNull();
  });

  it('passes text and icon props to each Badge', async () => {
    await render(<Card title={title} badges={[badges[0]]} />);

    const mockedBadge = Badge as unknown as jest.Mock;

    expect(mockedBadge).toHaveBeenCalledTimes(1);

    expect(mockedBadge.mock.calls[0][0]).toMatchObject({
      text: '12:00',
      icon: Clock,
    });
  });
});
