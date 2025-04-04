import Logo from '../../components/header/logo/logo';
import UserProfile from '../../components/header/user-profile/user-profile';
import { Helmet } from 'react-helmet-async';
import OffersSection from '../../components/main-offers/offers-section/offers-section';
import NoOffersList from '../../components/main-offers/no-offers-list/no-offers-list';
import Cities from '../../components/main-offers/cities/cities';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import React from 'react';
import { offersActions } from '../../store/slices/offers';
import { getCurrentCity, getCurrentCityLocation, getFilteredOffers } from '../../store/selectors/offers';
import classNames from 'classnames';

const { changeCity } = offersActions;

function MainPage(): JSX.Element {

  const currentCity = useAppSelector(getCurrentCity);
  const currentCityLocation = useAppSelector(getCurrentCityLocation);
  const filteredOffers = useAppSelector(getFilteredOffers);

  const dispatch = useAppDispatch();

  const handleCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const target = evt.currentTarget as HTMLAnchorElement;
    const cityName = target.dataset.name?.toString() || '';

    dispatch(changeCity(cityName));
  };

  return (
    <div className="page page--gray page--main" data-testid="main-page-container">
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
                <UserProfile />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={classNames('page__main', 'page__main--index',
        { 'page__main--index-empty': !filteredOffers.length })}
      >
        <Cities currentCity={currentCity} onCityClick={handleCityClick} />
        <div className="cities">
          {currentCityLocation ? <OffersSection offers={filteredOffers} currentCity={currentCity} currentCityLocation={currentCityLocation} /> : <NoOffersList currentCity={currentCity} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
