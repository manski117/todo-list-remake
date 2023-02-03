import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import {App} from './App';
import ProjectForm from './components/ProjectForm';

describe("App Component", () =>{
  test('renders heading', () =>{
    const {getByRole} = render (<App />);
    expect(getByRole('heading').textContent).toMatch(/first test passes/i);
  });

});





///////tests to write


//local storage loads

//projects load in side bar

//clicking button makes form appear/hide

//if local storage doesn't load, informational text appears

//state in App is updated when form is changed

//all validation happens at once before attempt to render