import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCovidData } from '../services/fetchCovidData';
import CovidDashboard from '../pages/CovidDashboard';
import { ChartComponent } from '../components/ChartComponent';

vi.mock('../services/fetchCovidData.ts', () => ({
  fetchCovidData: vi.fn(),
}));

vi.mock('../components/Toast', () => ({
  Toast: ({ message }: { message: string }) => <div>{message}</div>,
}));

vi.mock('../components/ChartComponent', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ChartComponent: vi.fn(({ data }: { data: any[] }) => {
    return (
      <>
        <div>Chart</div>
        <div>{JSON.stringify(data)}</div>
      </>
    );
  }),
  CombinedChart: vi.fn(() => <div>Combined Chart</div>),
}));

describe('CovidDashboard', () => {
  const mockCovidData = [
    { date: '2021-01-01', cases: 100, recovered: 80, deaths: 20 },
    { date: '2021-01-02', cases: 120, recovered: 90, deaths: 30 },
    { date: '2021-01-03', cases: 140, recovered: 100, deaths: 40 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render CovidDashboard correctly', async () => {
    await act(async () => {
      render(<CovidDashboard />);
    });

    expect(screen.getByText('COVID-19 Data Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
  });

  it('should fetch and display data on load', async () => {
    vi.mocked(fetchCovidData).mockResolvedValueOnce({ data: mockCovidData });
    await act(async () => {
      render(<CovidDashboard />);
    });

    await waitFor(() => expect(fetchCovidData).toHaveBeenCalledTimes(1));

    expect(screen.getAllByText('Chart').length).toBe(3);
    expect(screen.getByText('Combined Chart')).toBeInTheDocument();
  });

  it('should handle errors when data fetch fails', async () => {
    vi.mocked(fetchCovidData).mockRejectedValueOnce(
      new Error('Could not retrieve data from server')
    );

    await act(async () => {
      render(<CovidDashboard />);
    });
    await waitFor(() =>
      expect(
        screen.getByText('Could not retrieve data from server')
      ).toBeInTheDocument()
    );
  });

  it('should filter data based on selected start and end dates', async () => {
    vi.mocked(fetchCovidData).mockResolvedValueOnce({ data: mockCovidData });

    await act(async () => {
      render(<CovidDashboard />);
    });

    // Simulate selecting dates
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');

    fireEvent.change(startDateInput, { target: { value: '2021-01-02' } });
    fireEvent.change(endDateInput, { target: { value: '2021-01-03' } });
    await waitFor(() => {
      expect(ChartComponent).toHaveBeenCalled();
    });
    const casesRecoveredCall = vi
      .mocked(ChartComponent)
      .mock.calls.find(
        (call) =>
          call[0].type === 'cases-recovered' && call[0].data.length === 2
      );
    expect(casesRecoveredCall).toBeDefined();

    const props = casesRecoveredCall![0];
    expect(props.data).toEqual([
      { date: '2021-01-02', cases: 120, recovered: 90, deaths: 30 },
      { date: '2021-01-03', cases: 140, recovered: 100, deaths: 40 },
    ]);
    expect(props.labels).toEqual(['2021-01-02', '2021-01-03']);
    expect(props.title).toBe('COVID-19 Cases and Recovered Over Time');
    expect(props.type).toBe('cases-recovered');
  });

  it('should display a loading state when data is being fetched', async () => {
    vi.mocked(fetchCovidData).mockResolvedValueOnce({ data: mockCovidData });

    await act(async () => {
      render(<CovidDashboard />);
    });

    // Check that data is being fetched
    expect(screen.getAllByText('Chart').length).toBeGreaterThan(1);
  });

  it('should call fetchCovidData when component is mounted', async () => {
    vi.mocked(fetchCovidData).mockResolvedValueOnce({ data: mockCovidData });

    await act(async () => {
      render(<CovidDashboard />);
    });

    await waitFor(() => expect(fetchCovidData).toHaveBeenCalledTimes(1));
  });
});
