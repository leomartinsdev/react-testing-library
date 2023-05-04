import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests the Pokemon component', () => {
  test('Test if the app renders a card with the right pokemon info', () => {
    renderWithRouter(<App />);
    const dragonFilterBtn = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonFilterBtn);

    const pokemonName = screen.getByText(/dragonair/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/average weight: 16\.5 kg/i);
    const pokemonImg = screen.getByRole('img', { name: /dragonair sprite/i });

    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Dragon');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://archives.bulbagarden.net/media/upload/2/2c/Spr_5b_148.png');
  });

  test('Test if the card has a More Details link', () => {
    renderWithRouter(<App />);
    const dragonFilterBtn = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonFilterBtn);

    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsBtn).toBeInTheDocument();

    expect(moreDetailsBtn.href).toContain('/pokemon/148');
  });

  test('Test the favorite star', () => {
    renderWithRouter(<App />);
    const dragonFilterBtn = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonFilterBtn);

    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsBtn).toBeInTheDocument();
    userEvent.click(moreDetailsBtn);

    const favCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);

    const favStar = screen.getByRole('img', { name: /dragonair is marked as favorite/i });
    expect(favStar).toBeInTheDocument();
    expect(favStar.src).toContain('star-icon.svg');
    expect(favStar.alt).toMatch(/dragonair is marked as favorite/i);
  });
});
