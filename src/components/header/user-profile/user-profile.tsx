import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { userActions } from '../../../store/slices/user';
import { memo } from 'react';
import { getFavoritesCount } from '../../../store/selectors/favorites';
import { getUserInfo } from '../../../store/selectors/user';

const { logoutAction } = userActions;

function UserProfile(): JSX.Element {
  const userData = useAppSelector(getUserInfo);
  const favoritesCount = useAppSelector(getFavoritesCount);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  if (!userData) {
    return (
      <li className="header__nav-item user" data-testid='login-button-container'>
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
      <li className="header__nav-item user" data-testid='profile-container'>
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              backgroundImage: `url('${avatarUrl || '../img/avatar.svg'}')`,
            }}
          >
          </div>
          <span className="header__user-name user__name">{email}</span>
          <span className="header__favorite-count">{favoritesCount}</span>
        </Link>
      </li>
      <li className="header__nav-item" onClick={handleLogoutClick} data-testid='logout-button-container'>
        <Link className="header__nav-link" to={AppRoute.Main}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

const MemoizedUserProfile = memo(UserProfile);
MemoizedUserProfile.displayName = 'UserProfile';

export default MemoizedUserProfile;
