import { render, screen } from '@testing-library/react'
import { act } from 'react'
import StatsPage from '@/app/stats/page'
import '@testing-library/jest-dom'


jest.mock('react-chartjs-2', () => ({
  Pie: () => <div data-testid="PieChart" />,
  Bar: () => <div data-testid="BarChart" />,
}))

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => 'mock-token')

  global.fetch = jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        byStatus: { APPLIED: 2 },
        byCompany: { Google: 1 },
        byTag: { remote: 1 },
      }),
    ok: true,
  }) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('StatsPage', () => {
  it('shows loading initially', () => {
    render(<StatsPage />)
    expect(screen.getByText(/Loading stats/i)).toBeInTheDocument()
  })

  it('renders chart sections after fetch', async () => {
    await act(async () => {
      render(<StatsPage />)
    })

    expect(screen.getByText(/By Status/i)).toBeInTheDocument()
    expect(screen.getByText(/By Company/i)).toBeInTheDocument()
    expect(screen.getByText(/By Tag/i)).toBeInTheDocument()
    expect(screen.getByTestId('PieChart')).toBeInTheDocument()
    expect(screen.getAllByTestId('BarChart')).toHaveLength(2)
  })
})

// The test still passes, but there's an error thats kinda annoying
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes('not wrapped in act') ||
      args[0]?.includes('ReactDOMTestUtils.act is deprecated')
    ) {
      return
    }
    originalError(...args)
  }
})
afterAll(() => {
  console.error = originalError
})
