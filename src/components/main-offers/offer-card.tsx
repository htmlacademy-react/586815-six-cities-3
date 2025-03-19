import { OfferType } from '../../types/common';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCALE_RATING, TypeBookmark } from '../../const';
import classNames from 'classnames';
import Bookmark from '../bookmark';
import { favoriteActions } from '../../store/slices/favorites';
import { useAppDispatch } from '../../hooks/store';
// import { FavoritesStatus } from '../../const';
import { offersActions } from '../../store/slices/offers';
import { memo } from 'react';

const { changeFavorite } = favoriteActions;
const { changeFavoriteStatus } = offersActions;

type Props = {
  cardData: OfferType;
  onOfferHover?: (offer: OfferType | null) => void;
  isMainOffers?: boolean;
  isOffer?: boolean;
}

function OfferCard(props: Props): JSX.Element {
  const { isMainOffers, isOffer, onOfferHover } = props;
  const { isPremium, isFavorite, title, price, rating, previewImage, type, id } = props.cardData;
  const offerRoute = `/offer/${id}`;
  const dispatch = useAppDispatch();

  // const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);

  const handleFavoritesChange = () => {
    dispatch(changeFavorite({ offerId: id, status: !isFavorite }))
      .unwrap()
      .then(() => {
        dispatch(changeFavoriteStatus(id));
      });


    // if (isFavorite) {
    //   dispatch(changeFavorite({ offerId: id, status: FavoritesStatus.Removed }));
    //   return;
    // }
    // dispatch(changeFavorite({ offerId: id, status: FavoritesStatus.Added }));
  };

  const handleMouseEnter = () => {
    onOfferHover?.(props.cardData);
  };

  const handleMouseLeave = () => {
    onOfferHover?.(null);
  };

  return (
    <article
      className={classNames('place-card',
        isMainOffers && 'cities__card',
        isOffer && 'near-places__card'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div
        className={classNames('place-card__image-wrapper',
          isMainOffers && 'cities__image-wrapper',
          isOffer && 'near-places__image-wrapper'
        )}
      >
        <Link to={offerRoute}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark
            type={TypeBookmark.PlaceCard}
            isFavorite={isFavorite}
            onFavoritesChange={handleFavoritesChange}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * SCALE_RATING}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >
  );
}

const MemoizedOfferCard = memo<Props>(OfferCard);
MemoizedOfferCard.displayName = 'OfferCard';

export default MemoizedOfferCard;
