import React from 'react';
import ReactDOM from 'react-dom';

import { render, screen } from '@testing-library/react';
import App from './App';

test('app renders without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});