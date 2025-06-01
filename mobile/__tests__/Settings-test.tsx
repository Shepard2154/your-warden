import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Settings from '../app/(tabs)/settings';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

jest.mock("@react-native-async-storage/async-storage", () => ({
  useAsyncStorage: jest.fn(() => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
  })),
}));

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

jest.mock('@/components/MessageBar', () => {
  const { Text } = require('react-native');
  
  return function MockMessageBar({ sendMessage }: { sendMessage: (msg: string) => void }) {
    return (
      <>
        <Text>MessageBar</Text>
        <Text 
          testID="send-button"
          onPress={() => sendMessage("test-api-key")}
        >
          Отправить
        </Text>
      </>
    );
  };
});

describe('Settings screen', () => {
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();

  beforeEach(() => {
    (useAsyncStorage as jest.Mock).mockReturnValue({
      getItem: mockGetItem,
      setItem: mockSetItem,
    });
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('отображает сообщение о том, что ключ не найден', async () => {
    const { findByText } = render(<Settings />);
    
    await act(async () => {
      expect(await findByText(/API ключ не найден/i)).toBeTruthy();
    });
  });

  it('сохраняет и отображает ключ после отправки', async () => {
    const { getByTestId, findByText } = render(<Settings />);
    
    await act(async () => {
      fireEvent.press(getByTestId('send-button'));
    });

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith('test-api-key');
      expect(findByText('test-api-key')).toBeTruthy();
    });
  });
});