import React from 'react';
import ReactDOM from 'react-dom';

import { render, screen } from '@testing-library/react';
import PokeCard from './PokeCard';

const data = JSON.parse("{\"abilities\":[{\"ability\":{\"name\":\"overgrow\",\"url\":\"https://pokeapi.co/api/v2/ability/65/\"},\"is_hidden\":false,\"slot\":1},{\"ability\":{\"name\":\"chlorophyll\",\"url\":\"https://pokeapi.co/api/v2/ability/34/\"},\"is_hidden\":true,\"slot\":3}],\"height\":10,\"name\":\"ivysaur\",\"id\":2,\"weight\":130,\"sprites\":{\"other\":{\"official-artwork\":{\"front_default\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png\"}}}}");

test('item count selector has the right default value', () => {
    // const { getByRole } = render(<PokeCard />);
    // expect(getByRole('itemCountControl').value).toEqual(20);
});