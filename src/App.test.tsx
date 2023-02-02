import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from './App';

describe("App Component", () =>{
  test('renders heading', () =>{
    const {getByRole} = render (<App />);
    expect(getByRole('heading').textContent).toMatch(/first test passes/i);
  })
})
