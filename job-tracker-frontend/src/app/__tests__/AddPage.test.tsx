import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddPageContent from '@/app/add/AddPage'
import '@testing-library/jest-dom'

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => 'mock-token')
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve([]),
    ok: true,
  }) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('AddPageContent', () => {
  it('renders form inputs and submit button', async () => {
    await waitFor(() => render(<AddPageContent />))

    expect(screen.getByPlaceholderText(/Job Title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Company/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Add tag/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Add Application/i })).toBeInTheDocument()
  })

  it('adds and removes a tag', async () => {
    await waitFor(() => render(<AddPageContent />))

    fireEvent.change(screen.getByPlaceholderText('Add tag'), {
      target: { value: 'remote' },
    })

    fireEvent.click(screen.getAllByRole('button', { name: /Add/i })[0])
    expect(screen.getByText('remote')).toBeInTheDocument()

    fireEvent.click(screen.getByText('×'))
    expect(screen.queryByText('remote')).not.toBeInTheDocument()
  })

  it('submits form and clears inputs', async () => {
    await waitFor(() => render(<AddPageContent />))

    fireEvent.change(screen.getByPlaceholderText(/Job Title/i), {
      target: { value: 'Frontend Developer' },
    })

    fireEvent.change(screen.getByPlaceholderText(/Company/i), {
      target: { value: 'CoolCorp' },
    })

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'APPLIED' },
    })

    fireEvent.change(screen.getByLabelText('Application Date'), {
      target: { value: '2024-06-01' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Add Application/i }))

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))

    expect(screen.getByPlaceholderText(/Job Title/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Company/i)).toHaveValue('')
  })
})
