import React from 'react';
import { render } from '@testing-library/react-native';
import Coremind from '../app/(tabs)/coremind';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  useAsyncStorage: () => ({
    getItem: mockGetItem,
    setItem: mockSetItem,
  }),
}));

describe('Coremind', () => {
  it('renders default goal when no stored goal exists', async () => {
    mockGetItem.mockResolvedValue(null);

    const { findByText } = render(<Coremind />);

    const defaultGoal = await findByText('Быть счастливым!');
    expect(defaultGoal).toBeTruthy();

    expect(mockSetItem).toHaveBeenCalledWith('Быть счастливым!');
  });
});