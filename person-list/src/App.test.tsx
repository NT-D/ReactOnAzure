import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders span', () => {
  const { getByText, container, getByTestId } = render(<App />);
  const spanElement = getByText('Person List');
  const span2Element = container.querySelector('span')?.innerHTML;
  expect(spanElement).toBeInTheDocument();
  expect(getByTestId('person-list-stack')).toBeInTheDocument();
  expect(span2Element).toBe('Person List');
});
