import React from 'react';
import { render } from '@testing-library/react';
import UserCard from './UserCard';

test('renders user card with correct details', () => {
  const user = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg'
  };

  const { getByText, getByAltText } = render(<UserCard user={user} />);
  const nameElement = getByText(`${user.first_name} ${user.last_name}`);
  const emailElement = getByText(user.email);
  const avatarElement = getByAltText(`${user.first_name} ${user.last_name}`);

  expect(nameElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(avatarElement).toBeInTheDocument();
  expect(avatarElement.src).toBe(user.avatar);
});


