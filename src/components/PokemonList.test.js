import React from 'react';
import ReactDOM from 'react-dom';

import { render, fireEvent } from '@testing-library/react';
import PokemonList from './PokemonList';

test('list renders without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PokemonList />, div);
});

test('item count selector should have the right default value', () => {
  const { getByRole } = render(<PokemonList />);
  expect(getByRole('itemCountControl').querySelector('input').value).toBe('20');
});

test('previous button should be disabled by default', () => {
  const { getAllByLabelText } = render(<PokemonList />);
  const buttons = getAllByLabelText('previous page');
  expect(buttons[0]).toBeDisabled();
  expect(buttons[1]).toBeDisabled();
});

test('previous button should be enabled after next click', () => {
  const { getAllByLabelText } = render(<PokemonList />);
  sessionStorage.setItem('rawData', "{\"count\":1118,\"next\":\"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20\",\"previous\":null,\"results\":[{\"name\":\"bulbasaur\",\"url\":\"https://pokeapi.co/api/v2/pokemon/1/\"}]}");
  const nextButtons = getAllByLabelText('next page');
  fireEvent.click(nextButtons[0]);
  const prevButtons = getAllByLabelText('previous page')
  expect(prevButtons[0]).toBeDisabled();
  expect(prevButtons[1]).toBeDisabled();
});