import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do About', () => {
  test('A página contem as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstText = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    expect(firstText).toBeInTheDocument();

    const secondText = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(secondText).toBeInTheDocument();
  });

  test('A página tem um heading H2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('A página tem 2 parágrafos com texto sobre a Pokedéx', () => {
    renderWithRouter(<About />);
    const firstText = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondText = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    const thereIsTwoTexts = firstText && secondText;
    expect(thereIsTwoTexts).toBeTruthy();
  });

  test('', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
