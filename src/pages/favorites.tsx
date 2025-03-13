import Logo from '../components/logo';
import UserProfile from '../components/user-profile';
import { Helmet } from 'react-helmet-async';
import { OfferType } from '../types/common';
import FavoritesCity from '../components/favorites/favorites-city';
import { Link } from 'react-router-dom';
import NoFavoritesList from '../components/no-favorites-list';

type Props = {
  favoritesOffers: OfferType[];
};

export default function Factories(props: Props): JSX.Element {
  const { favoritesOffers } = props;

  const favoritesCities = [...new Set(favoritesOffers.map((offer) => offer.city.name))];
  const cityList = favoritesCities.map((city: string) => (
    <FavoritesCity key={city} cityName={city} offers={favoritesOffers} />
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
      {favoritesOffers.length ?
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
