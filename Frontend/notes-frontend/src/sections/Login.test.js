import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  test('renders forgot password link', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const forgotLink = screen.getByText('Forgot password?');
    expect(forgotLink).toBeInTheDocument();
  });

  test('forgot password link navigates to reset-password', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const forgotLink = screen.getByText('Forgot password?');
    fireEvent.click(forgotLink);

    expect(mockNavigate).toHaveBeenCalledWith('/reset-password');
  });
});