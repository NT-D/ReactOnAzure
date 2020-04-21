import React from 'react';
import { render } from '@testing-library/react';
import UserList from './UserList';
import { PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { User } from '../../interfaces/User';

test('renders UserList', () => {
  const testUsers: User[] = [{ id: '1', text: 'Sample Name 1', presence: PersonaPresence.online, gender: 'female' }];
  const { getByTestId } = render(<UserList users={testUsers} />);
  expect(getByTestId('person-list-persona')).toBeInTheDocument();
});
