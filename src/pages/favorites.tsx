import Logo from '../components/logo';
import UserProfile from '../components/user-profile';
import { Helmet } from 'react-helmet-async';
import { AuthorizationStatus } from '../const';
import { OfferType } from '../types/common';
import FavoritesCity from '../components/favorites/favorites-city';
import { Link } from 'react-router-dom';

type Props = {
  cards: OfferType[];
  authorizationStatus: AuthorizationStatus;
};

export default function Factories(props: Props): JSX.Element {
  const { cards, authorizationStatus } = props;

  const favoritesCities = [...new Set(cards.map((card) => card.city.name))];
  const cityList = favoritesCities.map((city: string) => (
    <FavoritesCity key={city} cityName={city} offers={cards} />
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
                <UserProfile authorizationStatus={authorizationStatus} disabled />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cityList}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
