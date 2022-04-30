import { render, screen } from '@testing-library/react';
import App from './App';

test('renders shortest distance block', () => {
  render(<App />);
  const linkElement = screen.getByText(/Shortest distance from/i);
  expect(linkElement).toBeInTheDocument();
});
