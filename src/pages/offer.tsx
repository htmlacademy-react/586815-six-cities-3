import Logo from '../components/header/logo';
import UserProfile from '../components/header/user-profile';
import { Helmet } from 'react-helmet-async';
import { SCALE_RATING } from '../const';
import { useParams } from 'react-router-dom';
import NotFoundPage from './not-found-page';
import ReviewsSection from '../components/offer/reviews/reviews-section';
import NearOffersList from '../components/offer/near-offers-list';
import Map from '../components/map/map';
import { classNamesMap } from '../const';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import Gallery from '../components/offer/gallery';
import Features from '../components/offer/features';
import { offerActions } from '../store/slices/offer';
import { reviewsActions } from '../store/slices/reviews';
import { nearbyOffersActions } from '../store/slices/nearby-offers';
import Loader from '../components/loader/loader';
import Bookmark from '../components/favorites/bookmark';
import { TypeBookmark } from '../const';
import { favoriteActions } from '../store/slices/favorites';
import { getDetailedOffer, getSortedReviews, getNearbyOffersForMap, getNearbyOffers } from '../store/selectors/offer';
import { getLoadingStatus } from '../store/selectors/loading';

const { fetchDetailedOffer } = offerActions;
const { fetchOfferReviews } = reviewsActions;
const { fetchNearbyOffers } = nearbyOffersActions;
const { changeFavorite, fetchFavoritesOffers } = favoriteActions;

export default function Offer(): JSX.Element {
  const { id } = useParams();

  const currentDetailedOffer = useAppSelector(getDetailedOffer);
  const reviews = useAppSelector(getSortedReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const nearbyOffersForMap = useAppSelector((state) => getNearbyOffersForMap(state));
  const isLoadingData = useAppSelector(getLoadingStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        dispatch(fetchDetailedOffer({ offerId: id })).unwrap(),
        dispatch(fetchOfferReviews({ offerId: id })).unwrap(),
        dispatch(fetchNearbyOffers({ offerId: id })).unwrap(),
      ]);
    };
    loadData();
  }, [id, dispatch]);


  if (!currentDetailedOffer) {
    if (isLoadingData) {
      return <Loader />;
    }
    return <NotFoundPage />;
  }

  const { price, title, isPremium, images, rating, type, city, bedrooms, maxAdults, goods, description, isFavorite } = currentDetailedOffer;

  const currentCity = city.location;

  const handleFavoritesChange = () => {
    dispatch(changeFavorite({ offerId: id as string, status: !isFavorite }))
      .unwrap()
      .then(() => {
        dispatch(fetchFavoritesOffers());
        dispatch(fetchDetailedOffer({ offerId: id }));
      });
  };

  return (
    <div className="page" >
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
        <section className="offer" data-testid="offer-page-container">
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
                <Bookmark
                  type={TypeBookmark.Offer}
                  isFavorite={isFavorite}
                  onFavoritesChange={handleFavoritesChange}
                />
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
                </div>
              </div>
              <ReviewsSection reviews={reviews} />
            </div>
          </div>
          <Map
            className={classNamesMap.offer}
            currentCity={currentCity}
            offers={nearbyOffersForMap}
            selectedOfferId={id}
          />
        </section>
        <NearOffersList nearOffers={nearbyOffers} />
      </main>
    </div>
  );
}
