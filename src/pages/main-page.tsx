import { OfferType } from '../types/common';
import Logo from '../components/logo';
import UserProfile from '../components/user-profile';
import { Helmet } from 'react-helmet-async';
import OffersSection from '../components/main-offers/offers-section';
import { AuthorizationStatus } from '../const';
import NoOffersList from '../components/no-offers-list';

type Props = {
  cards: OfferType[];
  authorizationStatus: AuthorizationStatus;
}

function MainPage(props: Props): JSX.Element {
  const { cards, authorizationStatus } = props;
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities. Main page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isActive />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <UserProfile authorizationStatus={authorizationStatus} />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          {cards.length ? <OffersSection cards={cards} /> : <NoOffersList />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
