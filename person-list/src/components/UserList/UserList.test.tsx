import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList';
import { PersonaPresence, Persona } from 'office-ui-fabric-react/lib/Persona';
import { User } from '../../interfaces/User';

test('renders UserList', () => {
  // Arrange
  const testUsers: User[] = [
    { id: '1', text: 'Sample Name 1', presence: PersonaPresence.online, gender: 'female' },
    { id: '2', text: 'Sample Name 2', presence: PersonaPresence.away, gender: 'male' },
  ];

  const userListWrapper = shallow(<UserList users={testUsers} />);

  // Act & Assert
  expect(userListWrapper.find(Persona).length).toBe(2);
});
