import { render } from '@testing-library/react-native';
import Layout from '../app/(tabs)/_layout';

jest.mock('expo-router', () => {
  return {
    Tabs: Object.assign(({ children }: any) => <>{children}</>, {
      Screen: ({ name, options }: any) => {
        const Icon = options?.tabBarIcon?.({ focused: true }) ?? null;
        return <>{Icon}</>;
      }
    }),
  };
});

describe('_Layout', () => {
  it('renders all TabIcons', () => {
    const { getByText } = render(<Layout />);
    expect(getByText('Чат')).toBeTruthy();
    expect(getByText('Цель')).toBeTruthy();
    expect(getByText('Избранное')).toBeTruthy();
    expect(getByText('Ключ')).toBeTruthy();
  });
});
