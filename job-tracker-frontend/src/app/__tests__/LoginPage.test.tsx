import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import * as api from '@/utils/api'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('@/utils/api', () => ({
  login: jest.fn(),
}))

describe('LoginPage', () => {
  it('renders inputs and button', () => {
    render(<LoginPage />)
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })

  it('shows error on failed login', async () => {
    (api.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'))
    render(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'baduser' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrong' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    await waitFor(() =>
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    )
  })

  it('redirects on successful login', async () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push })
    ;(api.login as jest.Mock).mockResolvedValue('fake-token')

    render(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'testpass' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    await waitFor(() => expect(push).toHaveBeenCalledWith('/'))
  })
})
