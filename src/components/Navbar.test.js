import React from 'react';
import ReactDOM from 'react-dom';

import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('navbar renders without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar />, div);
});

test('navbar contains header', () => {
    const {getByText} = render(<Navbar />);
    expect(getByText(/pokemen/i)).toBeInTheDocument();
});