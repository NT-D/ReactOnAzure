import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import UserList from './components/UserList/UserList';
import Auth from './components/Auth/Auth';

test('renders span', () => {
  // Arrange
  const appWrapper = shallow(<App />);

  // Act & Assert
  expect(appWrapper.find(Auth).length).toBe(1);
  expect(appWrapper.find(UserList).length).toBe(1);
});
