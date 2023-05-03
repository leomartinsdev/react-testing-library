import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import { PokemonButtonsPanel } from '../components';
// import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
// import pokemonList from '../data';

describe('Tests for Pokedex Component', () => {
  test('Test H2 heading with Encountered Pokémon text', () => {
    renderWithRouter(<App />);
    const h2Heading = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(h2Heading).toBeInTheDocument();
  });

  test('Text next Pokémon', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(nextBtn);
    const pokemon2 = screen.getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon3 = screen.getByText(/caterpie/i);
    expect(pokemon3).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon4 = screen.getByText(/ekans/i);
    expect(pokemon4).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon5 = screen.getByText(/alakazam/i);
    expect(pokemon5).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon6 = screen.getByText(/mew/i);
    expect(pokemon6).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon7 = screen.getByText(/rapidash/i);
    expect(pokemon7).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon8 = screen.getByText(/snorlax/i);
    expect(pokemon8).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon9 = screen.getByText(/dragonair/i);
    expect(pokemon9).toBeInTheDocument();

    userEvent.click(nextBtn);
    const pokemon1 = screen.getByText(/pikachu/i);
    expect(pokemon1).toBeInTheDocument();
  });

  // Teste se é mostrado apenas um Pokémon por vez;
  test('Test if only one pokémon is shown at a time', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsBtn).toHaveLength(1);
  });

  // Teste se a Pokédex tem os botões de filtro:
  // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição;
  test('Test the filter buttons', () => {
    renderWithRouter(<App />);
    const allFilterBtn = screen.getAllByTestId('pokemon-type-button');
    expect(allFilterBtn).toHaveLength(7);

    const allTypesHTML = allFilterBtn.map((pokeType) => pokeType.innerHTML);

    expect(allTypesHTML).toEqual(['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon']);
  });

  // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo;
  test('Test if only the filtered pokemons are shown', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    const electricFilterBtn = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricFilterBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();

    const fireFilterBtn = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireFilterBtn);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
  });

  test('Test if there is a Reset button', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    const showPikachu = screen.getByText(/pikachu/i);
    expect(showPikachu).toBeInTheDocument();
  });
});
