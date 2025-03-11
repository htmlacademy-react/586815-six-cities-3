import Logo from '../components/logo';
import UserProfile from '../components/user-profile';
import { Helmet } from 'react-helmet-async';
import { OfferType } from '../types/common';
import { SCALE_RATING, NEAR_OFFERS_AMOUNT } from '../const';
import { useParams } from 'react-router-dom';
import NotFoundPage from './not-found-page';
import { AuthorizationStatus } from '../const';
import ReviewsSection from '../components/offer/reviews/reviews-section';
import NearOffersList from '../components/offer/near-offers-list';
import Map from '../components/map/map';
import { classNamesMap } from '../const';
import { fetchDetailedOffer, fetchOfferReviews, fetchNearbyOffers } from '../store/api-actions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setError } from '../store/action';
import Gallery from '../components/offer/gallery';
import Features from '../components/offer/features';

type Props = {
  authorizationStatus: AuthorizationStatus;
}

export default function Offer(props: Props): JSX.Element {
  const { authorizationStatus } = props;

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchDetailedOffer(id)).unwrap(),
          dispatch(fetchOfferReviews(id)).unwrap(),
          dispatch(fetchNearbyOffers(id)).unwrap(),
        ]);
      } catch (error) {
        dispatch(setError(error as string));
      }
    };

    loadData();
  }, [id, dispatch]);

  const currentDetailedOffer = useAppSelector((state) => state.detailedOffer);
  const reviews = useAppSelector((state) => state.offerReviews);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const offers = useAppSelector((state) => state.offers);

  if (!currentDetailedOffer) {
    return <NotFoundPage />;
  }

  const { price, title, isPremium, images, rating, type, city, bedrooms, maxAdults, goods, description } = currentDetailedOffer;

  const currentSimpleOffer = offers.find((offer) => offer.id === id) as OfferType;
  const currentCity = city.location;
  const nearbyOffersForMap = offers.filter((offer) => offer.id !== id).slice(0, NEAR_OFFERS_AMOUNT);
  const nearbyOffersPlusCurrent = [currentSimpleOffer, ...nearbyOffersForMap];

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. About offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <UserProfile />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <Gallery images={images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating * SCALE_RATING}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <Features features={goods} />
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                  {/* <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p> */}
                </div>
              </div>
              <ReviewsSection authorizationStatus={authorizationStatus} reviews={reviews} />
            </div>
          </div>
          <Map
            className={classNamesMap.offer}
            currentCity={currentCity}
            offers={nearbyOffersPlusCurrent}
            selectedOfferId={id}
          />
        </section>
        <NearOffersList nearOffers={nearbyOffers} />
      </main>
    </div>
  );
}
