import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do App', () => {
  test('Testa item Home nos links de navegação', () => {
    renderWithRouter(<App />);
    const homeNavItem = screen.getByRole('link', { name: /home/i });
    expect(homeNavItem).toBeInTheDocument();
    expect(homeNavItem).toHaveTextContent('Home');
  });

  test('Testa item About nos links de navegação', () => {
    renderWithRouter(<App />);
    const aboutNavItem = screen.getByRole('link', { name: /about/i });
    expect(aboutNavItem).toBeInTheDocument();
    expect(aboutNavItem).toHaveTextContent('About');
  });

  test('Testa item Favorite Pokémon nos links de navegação', () => {
    renderWithRouter(<App />);
    const favNavItem = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favNavItem).toBeInTheDocument();
    expect(favNavItem).toHaveTextContent('Favorite Pokémon');
  });

  test('Testa se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeNavItem = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeNavItem);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutNavItem = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutNavItem);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favNavItem = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favNavItem);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-que-nao-existe');
    });
    const error = screen.getByRole('heading', { name: /page requested not found/i });
    expect(error).toBeInTheDocument();
  });
});
