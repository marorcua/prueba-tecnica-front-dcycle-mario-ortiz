import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserInfoForm } from '../pages/UserInfoForm';
import { fetchUserInfo } from '../services/fetchData';
import { Spinner } from '../components/Spinner';

vi.mock('../services/fetchData.ts', () => ({
  fetchUserInfo: vi.fn().mockResolvedValue({}),
}));

describe('UserInfoForm Component', () => {
  beforeEach(() => {
    vi.mocked(fetchUserInfo).mockReset();
  });

  it('renders input and submit button', () => {
    render(<UserInfoForm />);
    expect(
      screen.getByPlaceholderText('Introduce tu nombre')
    ).toBeInTheDocument();
    expect(screen.getByText('Consultar')).toBeInTheDocument();
  });

  it('calls API on submit and displays results', async () => {
    const mockResponse = {
      name: 'mario',
      genderData: {
        gender: 'male',
        probability: 0.9,
        count: 1000,
        name: 'mario',
      },
      ageData: { age: 30, count: 500, name: 'mario' },
      nationalitiesData: {
        country: [{ country_id: 'IT', probability: 0.8 }],
        count: 1000,
        name: 'mario',
      },
    };
    vi.mocked(fetchUserInfo).mockResolvedValue(mockResponse);

    render(<UserInfoForm />);
    const input = screen.getByPlaceholderText('Introduce tu nombre');
    const button = screen.getByText('Consultar');

    fireEvent.change(input, { target: { value: 'mario' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Resultados para mario')).toBeInTheDocument();
      expect(screen.getByText('Edad más probable:')).toBeInTheDocument();
      expect(screen.getByText('IT (80.00%)')).toBeInTheDocument();
    });
  });
});

describe('Spinner Component', () => {
  it('renders a spinner', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

it('displays error toast when API returns undefined values', async () => {
  const badMockResponse = {
    name: 'mario',
    genderData: undefined, // Missing required data
    ageData: { age: 30, count: 500, name: 'mario' },
    nationalitiesData: {
      country: [{ country_id: 'IT', probability: 0.8 }],
      count: 1000,
      name: 'mario',
    },
  };

  vi.mocked(fetchUserInfo).mockResolvedValue(badMockResponse);

  render(<UserInfoForm />);

  const input = screen.getByPlaceholderText('Introduce tu nombre');
  const button = screen.getByText('Consultar');

  fireEvent.change(input, { target: { value: 'mario' } });
  fireEvent.click(button);

  // Wait for error toast to appear
  await waitFor(() => {
    expect(
      screen.getByText('Error obteniendo infromación de: genderData')
    ).toBeInTheDocument();
  });

  // Verify the toast component exists
  const toast = await screen.findByTestId('toast');

  expect(toast).toHaveClass('bg-red-500');
});
