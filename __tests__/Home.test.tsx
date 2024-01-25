import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/(root)/page';

describe('Page', () => {
  it('should contain an heading element', () => {
    render(<Home />);

    const h1Element = screen.getByRole('heading', { name: "Comment ça fonctionne :" });

    expect(h1Element).toBeInTheDocument();
  });

});