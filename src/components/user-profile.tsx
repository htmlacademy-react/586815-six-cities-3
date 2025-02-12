import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';

type UserProfilePropsType = {
  disabled?: boolean;
  authorizationStatus: AuthorizationStatus;
};

function UserProfile (props: UserProfilePropsType): JSX.Element {
  const {disabled, authorizationStatus} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      <>
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} style={{ pointerEvents: disabled ? 'none' : 'auto'}} aria-disabled={disabled}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">3</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to={AppRoute.Main}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </> :
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
  );
}

export default UserProfile;
