import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../components/icons', () => ({
  GraphIcon: () => <div data-testid="graph-icon" />,
  IdentityIcon: () => <div data-testid="identity-icon" />,
}));

describe('Home Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the component renders
    expect(
      screen.getByText('Ejercicio 1 - Información nombre')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Ejercicio 2 - Covid Dashboard')
    ).toBeInTheDocument();
  });
  it('renders the IdentityIcon and GraphIcon', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the icons are rendered
    expect(screen.getByTestId('identity-icon')).toBeInTheDocument();
    expect(screen.getByTestId('graph-icon')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Ejercicio 1 - Información nombre')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Ejercicio 2 - Covid Dashboard')
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ejercicio 1/i })).toHaveAttribute(
      'href',
      '/user-info'
    );
    expect(screen.getByRole('link', { name: /Ejercicio 2/i })).toHaveAttribute(
      'href',
      '/covid-dashboard'
    );
  });
});
