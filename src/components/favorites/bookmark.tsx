import classNames from 'classnames';
import { AppRoute, TypeBookmark } from '../../const';
import useAuth from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { memo } from 'react';

type Props = {
  type: TypeBookmark;
  isFavorite?: boolean;
  onFavoritesChange: () => void;
};

function Bookmark(props: Props): JSX.Element {
  const { type, isFavorite, onFavoritesChange } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsDisabled(false);
  }, [isFavorite]);

  const status = isFavorite && isAuth;

  const widthMark = type === TypeBookmark.PlaceCard ? '18' : '31';
  const heightMark = type === TypeBookmark.PlaceCard ? '19' : '33';
  const hiddenComment = status ? 'In bookmarks' : 'To bookmarks';

  const handleButtonClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
      return;
    }
    setIsDisabled(true);
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
      disabled={isDisabled}
    >
      <svg className={classNames(`${type}__bookmark-icon`)} width={widthMark} height={heightMark}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{hiddenComment}</span>
    </button >
  );
}

const MemoizedBookmark = memo<Props>(Bookmark);
MemoizedBookmark.displayName = 'Bookmark';

export default MemoizedBookmark;
