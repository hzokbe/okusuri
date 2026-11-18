import { render, screen } from '@testing-library/react-native';
import Screen from '@/shared/components/Screen';

describe('Screen', () => {
  it('renders title and description', async () => {
    await render(
      <Screen title="Lorem ipsum" description="Lorem ipsum dolor sit amet." />,
    );

    expect(screen.getByText('Lorem ipsum')).toBeTruthy();

    expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeTruthy();
  });
});
