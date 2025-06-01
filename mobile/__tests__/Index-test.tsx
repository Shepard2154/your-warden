import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Index from '../app/(tabs)/index';
import * as api from '@/services/api';
import { Keyboard } from 'react-native';

jest.mock('@/services/api', () => ({
  fetchAnswer: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(Keyboard, 'dismiss').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Index Screen', () => {
  it('renders initial state correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Index />);
    
    expect(getByText('Hi, я твой ассистент на пути к цели!')).toBeTruthy();
    expect(getByPlaceholderText('Введи свой запрос')).toBeTruthy();
  });
});

it('handles message submission', async () => {
  (api.fetchAnswer as jest.Mock).mockResolvedValue('Test answer');
  
  const { getByPlaceholderText, getByTestId } = render(<Index />);
  const input = getByPlaceholderText('Введи свой запрос');
  const sendButton = getByTestId('send-button');

  fireEvent.changeText(input, 'Test question');
  fireEvent.press(sendButton);

  await act(async () => {
    expect(api.fetchAnswer).toHaveBeenCalledWith({ query: 'Test question' });
  });
});

it('shows loading indicator', async () => {
  (api.fetchAnswer as jest.Mock).mockImplementation(
    () => new Promise((resolve) => setTimeout(() => resolve('Answer'), 1000))
  );

  const { getByPlaceholderText, getByTestId, getByRole } = render(<Index />);
  
  fireEvent.changeText(getByPlaceholderText('Введи свой запрос'), 'Test');
  fireEvent.press(getByTestId('send-button'));

  expect(getByTestId('loader')).toBeTruthy();
});

it('displays error message', async () => {
  (api.fetchAnswer as jest.Mock).mockRejectedValue(new Error('API Error'));
  
  const { getByPlaceholderText, getByTestId, findByText } = render(<Index />);
  
  fireEvent.changeText(getByPlaceholderText('Введи свой запрос'), 'Test');
  fireEvent.press(getByTestId('send-button'));

  expect(await findByText('Ошибка: API Error')).toBeTruthy();
});

it('dismisses keyboard on tap', () => {
  const { getByTestId } = render(<Index />);
  fireEvent.press(getByTestId('screen-touchable'));
  expect(Keyboard.dismiss).toHaveBeenCalled();
});

it('displays answer correctly', async () => {
  (api.fetchAnswer as jest.Mock).mockResolvedValue('Mocked answer');
  
  const { getByPlaceholderText, getByTestId, findByText } = render(<Index />);
  
  fireEvent.changeText(getByPlaceholderText('Введи свой запрос'), 'Test');
  fireEvent.press(getByTestId('send-button'));

  expect(await findByText('Mocked answer')).toBeTruthy();
});