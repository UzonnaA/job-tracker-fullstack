import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchPageContent from '@/app/search/SearchPage'
import '@testing-library/jest-dom'

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => 'mock-token')

  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve([
      {
        id: 1,
        jobTitle: 'Software Engineer',
        company: 'TechCorp',
        status: 'APPLIED',
        applicationDate: '2024-06-01',
        tags: ['remote'],
      },
    ]),
    ok: true,
  }) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('SearchPageContent', () => {
  it('renders filters and search button', async () => {
    await waitFor(() => render(<SearchPageContent />))

    expect(screen.getByPlaceholderText(/Filter by company/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Filter by tag/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument()
  })

  it('renders job application card after fetch', async () => {
    await waitFor(() => render(<SearchPageContent />))

    expect(await screen.findByText(/Software Engineer @ TechCorp/i)).toBeInTheDocument()
    expect(screen.getByText(/Status: APPLIED/i)).toBeInTheDocument()
    expect(screen.getByText(/Date: 2024-06-01/i)).toBeInTheDocument()
    expect(screen.getByText(/Tags: remote/i)).toBeInTheDocument()
  })

  it('filters by company name', async () => {
    await waitFor(() => render(<SearchPageContent />))

    fireEvent.change(screen.getByPlaceholderText(/Filter by company/i), {
      target: { value: 'TechCorp' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Search/i }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('company=TechCorp'),
        expect.any(Object)
      )
    })
  })
})
