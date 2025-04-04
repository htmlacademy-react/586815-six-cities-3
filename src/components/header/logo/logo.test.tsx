import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../../utils/mock-component';

describe('Component: Logo', () => {
  const logoContainerTestId = 'logo-container';
  const logoActiveClass = 'header__logo-link--active';

  it('should render correct without active class', () => {
    render(withHistory(<Logo />));
    const logoContainer = screen.getByTestId(logoContainerTestId);

    expect(logoContainer).not.toHaveClass(logoActiveClass);
  });

  it('should render correct with active class', () => {
    render(withHistory(<Logo isActive />));
    const logoContainer = screen.getByTestId(logoContainerTestId);

    expect(logoContainer).toHaveClass(logoActiveClass);
  });
});
