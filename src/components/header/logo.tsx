import { Link } from 'react-router-dom';
import { memo } from 'react';

type Props = {
  isActive?: boolean;
}

const Logo = (props: Props): JSX.Element => {
  const { isActive } = props;
  return (
    <Link
      className={`header__logo-link ${isActive ? 'header__logo-link--active' : ''}`}
      to="/"
      data-testid="logo-container"
    >
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
};

const MemoizedLogo = memo<Props>(Logo, (prevProps, nextProps) => prevProps.isActive === nextProps.isActive);
MemoizedLogo.displayName = 'Logo';

export default MemoizedLogo;
