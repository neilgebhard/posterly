import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn Posterly link', () => {
  render(<App />)
  const linkElement = screen.getByText(/posterly/i)
  expect(linkElement).toBeInTheDocument()
})
