import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppDispatch } from '../hooks/store';
import { logoutAction } from '../store/api-actions';
import { useAppSelector } from '../hooks/store';

type UserProfilePropsType = {
  disabled?: boolean;
};

function UserProfile(props: UserProfilePropsType): JSX.Element {
  const { disabled } = props;
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  if (!userData) {
    return (
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    );
  }

  const { avatarUrl, email } = userData;

  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} style={{ pointerEvents: disabled ? 'none' : 'auto' }} aria-disabled={disabled}>
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              backgroundImage: `url('${avatarUrl || '../img/avatar.svg'}')`,
            }}
          >
          </div>
          <span className="header__user-name user__name">{email}</span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      <li className="header__nav-item" onClick={handleLogoutClick}>
        <Link className="header__nav-link" to={AppRoute.Main}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default UserProfile;
