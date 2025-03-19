import classNames from 'classnames';
import { AppRoute, TypeBookmark } from '../const';
import { useAppSelector } from '../hooks/store';
import { RequestStatus } from '../const';
import useAuth from '../hooks/auth';
import { useNavigate } from 'react-router-dom';

type Props = {
  type: TypeBookmark;
  isFavorite?: boolean;
  onFavoritesChange: () => void;
};

export default function Bookmark(props: Props): JSX.Element {
  const { type, isFavorite, onFavoritesChange } = props;
  const isAuth = useAuth();
  const navigate = useNavigate();
  const isDataLoaded = useAppSelector((state) => state.favorites.status === RequestStatus.Loading);

  const status = isFavorite && isAuth;

  const widthMark = type === TypeBookmark.PlaceCard ? '18' : '31';
  const heightMark = type === TypeBookmark.PlaceCard ? '19' : '33';
  const hiddenComment = status ? 'In bookmarks' : 'To bookmarks';

  const handleButtonClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
      return;
    }
    onFavoritesChange();
  };

  return (
    <button
      className={classNames(
        `${type}__bookmark-button`,
        status && `${type}__bookmark-button--active`,
        'button'
      )}
      type="button"
      onClick={handleButtonClick}
      disabled={isDataLoaded}
    >
      <svg className={classNames(`${type}__bookmark-icon`)} width={widthMark} height={heightMark}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{hiddenComment}</span>
    </button >
  );
}
