import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import UserList from './components/UserList/UserList';
import AuthLogIn from './components/Auth/AuthLogIn';

test('Initially renders App', () => {
  // Arrange
  const appWrapper = shallow(<App />);

  // Act & Assert
  expect(appWrapper.find(AuthLogIn).length).toBe(1);
  expect(appWrapper.find(UserList).length).toBe(0);
});
