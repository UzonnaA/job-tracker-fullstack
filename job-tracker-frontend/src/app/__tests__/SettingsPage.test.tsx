import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SettingsPage from '@/app/settings/page'
import * as api from '@/utils/api'

jest.mock('@/utils/api')
const mockedApi = api as jest.Mocked<typeof api>

beforeEach(() => {
  window.confirm = jest.fn(() => true) // Mock confirm to always return true
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('SettingsPage', () => {
  it('renders both delete buttons', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('button', { name: /Delete All Applications/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Delete Account/i })).toBeInTheDocument()
  })

  it('calls deleteAllApplications on button click', async () => {
    mockedApi.deleteAllApplications.mockResolvedValue()
    render(<SettingsPage />)

    fireEvent.click(screen.getByRole('button', { name: /Delete All Applications/i }))

    await waitFor(() => {
      expect(mockedApi.deleteAllApplications).toHaveBeenCalled()
    })
  })

  it('calls deleteUserAccount on button click', async () => {
    mockedApi.deleteAccount.mockResolvedValue()
    render(<SettingsPage />)

    fireEvent.click(screen.getByRole('button', { name: /Delete Account/i }))

    await waitFor(() => {
      expect(mockedApi.deleteAccount).toHaveBeenCalled()
    })
  })
})
