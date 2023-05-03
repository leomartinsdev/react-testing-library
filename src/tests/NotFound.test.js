import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('A página contem um H2 escrito Page requested Not Found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('A página contem uma IMG com a url certa', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
