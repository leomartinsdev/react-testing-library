import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
// import PokemonDetails from '../pages/PokemonDetails';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o FavoritePokemon', () => {
  test('Na pg detalhes, ao favoritar, exibir No favorite pokemon Found caso não tenha favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const nothingFound = screen.getByText(/no favorite pokémon found/i);
    expect(nothingFound).toBeInTheDocument();
  });

  test('Testa se apenas são exibidos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    const favoritePokemonList = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemonList).toBeInTheDocument();
    userEvent.click(favoritePokemonList);

    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();
  });
});
