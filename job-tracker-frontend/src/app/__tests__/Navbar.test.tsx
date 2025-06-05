import { render, screen } from '@testing-library/react'
import Navbar from '@/app/components/Navbar'

beforeEach(() => {
  localStorage.clear()
})

it('hides links when not authenticated', () => {
  render(<Navbar />)
  expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
})

it('shows links when authenticated', () => {
  localStorage.setItem('token', 'fake-token')
  localStorage.setItem('username', 'testuser')

  render(<Navbar />)

  expect(screen.getByText(/Logout/i)).toBeInTheDocument()
})
