import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { userActions } from '../../store/slices/user';
import { memo } from 'react';
import { getFavoritesCount } from '../../store/selectors/favorites';
import { selectUserInfo } from '../../store/selectors/user';

const { logoutAction } = userActions;

type Props = {
  disabled?: boolean;
};

function UserProfile(props: Props): JSX.Element {
  const { disabled } = props;
  const userData = useAppSelector(selectUserInfo);
  const favoritesCount = useAppSelector(getFavoritesCount);
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
          <span className="header__favorite-count">{favoritesCount}</span>
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


const MemoizedUserProfile = memo<Props>(UserProfile, (prevProps, nextProps) =>
  prevProps.disabled === nextProps.disabled);
MemoizedUserProfile.displayName = 'UserProfile';

export default MemoizedUserProfile;
