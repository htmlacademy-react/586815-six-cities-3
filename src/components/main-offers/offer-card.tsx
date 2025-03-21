import { OfferType } from '../../types/common';
import { Link } from 'react-router-dom';
import { SCALE_RATING, TypeBookmark } from '../../const';
import classNames from 'classnames';
import Bookmark from '../favorites/bookmark';
import { favoriteActions } from '../../store/slices/favorites';
import { useAppDispatch } from '../../hooks/store';
import { offersActions } from '../../store/slices/offers';
import { memo } from 'react';

const { changeFavorite } = favoriteActions;
const { changeFavoriteStatus } = offersActions;

type Props = {
  cardData: OfferType;
  onOfferHover?: (offer: OfferType | null) => void;
  isMainOffers?: boolean;
  isNearbyOffers?: boolean;
  isFavoritesOffers?: boolean;
}

function OfferCard(props: Props): JSX.Element {
  const { isMainOffers, isNearbyOffers: isOffer, isFavoritesOffers: isFavorites, onOfferHover } = props;
  const { isPremium, isFavorite, title, price, rating, previewImage, type, id } = props.cardData;
  const offerRoute = `/offer/${id}`;

  const dispatch = useAppDispatch();

  const handleFavoritesChange = () => {
    dispatch(changeFavorite({ offerId: id, status: !isFavorite }))
      .unwrap()
      .then(() => {
        dispatch(changeFavoriteStatus(id));
      });
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
        isOffer && 'near-places__card',
        isFavorites && 'favorites__card'
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
          isOffer && 'near-places__image-wrapper',
          isFavorites && 'favorites__image-wrapper'
        )}
      >
        <Link to={offerRoute}>
          <img className="place-card__image" src={previewImage} width={isFavorites ? '150' : '260'} height={isFavorites ? '110' : '200'} alt="Place image" />
        </Link>
      </div>
      <div className={classNames('place-card__info',
        isFavorites && 'favorites__card-info'
      )}
      >
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
