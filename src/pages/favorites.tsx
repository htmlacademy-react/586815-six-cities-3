import Logo from '../components/header/logo';
import UserProfile from '../components/header/user-profile';
import { Helmet } from 'react-helmet-async';
import FavoritesOffersList from '../components/favorites/favorites-offers-list';
import { Link } from 'react-router-dom';
import NoFavoritesList from '../components/favorites/no-favorites-list';
import { useAppSelector } from '../hooks/store';
import { getFavoritesOffers, getFavoritesCities, getFavoritesCount } from '../store/selectors/favorites';

export default function Factories(): JSX.Element {
  const favoritesOffers = useAppSelector(getFavoritesOffers);
  const favoritesCities = useAppSelector(getFavoritesCities);
  const favoritesCount = useAppSelector(getFavoritesCount);

  const cityList = favoritesCities.map((city: string) => (
    <FavoritesOffersList key={city} cityName={city} offers={favoritesOffers} />
  ));

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. In favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <UserProfile disabled />
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {favoritesCount ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cityList}
              </ul>
            </section>
          </div>
        </main> :
        <NoFavoritesList />}
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
