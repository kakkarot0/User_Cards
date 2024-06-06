import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
            { id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com' },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders user list heading', () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/User List/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders user cards', async () => {
  const { findAllByTestId } = render(<App />);
  const userCards = await findAllByTestId('user-card');
  expect(userCards.length).toBeGreaterThan(0);
});

test('loads more users when button is clicked', async () => {
  const { getByText, findAllByTestId } = render(<App />);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  const loadMoreButton = getByText(/Load More Users/i);

  await act(async () => {
    fireEvent.click(loadMoreButton);
  });

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  // Assuming fetch response appends users again
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            { id: 3, first_name: 'Alice', last_name: 'Smith', email: 'alice.smith@example.com' },
            { id: 4, first_name: 'Bob', last_name: 'Brown', email: 'bob.brown@example.com' },
          ],
        }),
    })
  );

  const userCards = await findAllByTestId('user-card');
  expect(userCards.length).toBe(4); // 2 from initial load + 2 more from "Load More"
});

test('displays an error message when fetch fails', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Failed to fetch users'))
  );

  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'There was an error fetching the users!',
      expect.any(Error)
    );
  });

  consoleErrorSpy.mockRestore();
});
