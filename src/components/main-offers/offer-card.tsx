import { OfferType } from '../../types/common';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCALE_RATING } from '../../const';
import classNames from 'classnames';

type Props = {
  cardData: OfferType;
  onOfferHover?: (offer: OfferType | null) => void;
  isMainOffers?: boolean;
  isOffer?: boolean;
}

function OfferCard(props: Props): JSX.Element {
  const { isMainOffers, isOffer } = props;
  const { isPremium, isFavorite, title, price, rating, previewImage, type, id } = props.cardData;
  const { onOfferHover } = props;
  const offerRoute = `/offer/${id}`;

  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);

  const getFavoriteMarkState = (favoriteState: boolean) => favoriteState ? 'place-card__bookmark-button place-card__bookmark-button--active button' :
    'place-card__bookmark-button button';

  const handleFavoriteClick = () => {
    setFavoriteStatus((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    if (onOfferHover) {
      onOfferHover(props.cardData);
    }
  };

  const handleMouseLeave = () => {
    if (onOfferHover) {
      onOfferHover(null);
    }
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
          <button className={getFavoriteMarkState(favoriteStatus)} type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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

export default OfferCard;
