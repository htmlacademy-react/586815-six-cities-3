import { OfferType } from '../types/common';
import Logo from '../components/logo';
import UserProfile from '../components/user-profile';
import { Helmet } from 'react-helmet-async';
import OffersSection from '../components/main-offers/offers-section';
import NoOffersList from '../components/main-offers/no-offers-list';
import Cities from '../components/cities';
import { useAppSelector, useAppDispatch } from '../hooks/store';
import { LocationType } from '../types/common';
import React, { useEffect, useState } from 'react';
import { offersActions } from '../store/slices/offers';

const { changeCity } = offersActions;

type Props = {
  offers: OfferType[];
}

const getCurrenCityLocation = (city: string, offers: OfferType[]) => offers.find((offer) => offer.city.name === city)?.city.location;

const getFilteredOffers = (city: string, offers: OfferType[]) => offers.filter((offer) => offer.city.name === city);

function MainPage(props: Props): JSX.Element {
  const { offers } = props;

  const [currentCity, setCurrentCity] = useState(useAppSelector((state) => state.offers.currentCity));
  const [currentCityLocation, setCurrentCityLocation] = useState<LocationType | null>(getCurrenCityLocation(currentCity, offers) || null);
  const [filteredOffers, setFilteredOffers] = useState<OfferType[]>(getFilteredOffers(currentCity, offers));

  const dispatch = useAppDispatch();

  useEffect(() => {
    const newLocation = getCurrenCityLocation(currentCity, offers);
    const newFilteredOffers = getFilteredOffers(currentCity, offers);
    setCurrentCityLocation(newLocation || null);
    setFilteredOffers(newFilteredOffers);
  }, [currentCity, offers]);

  const handleCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const target = evt.currentTarget as HTMLAnchorElement;

    const cityName = target.dataset.name?.toString() || '';

    dispatch(changeCity(cityName));
    setCurrentCity(cityName);
  };

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
                <UserProfile />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <Cities currentCity={currentCity} onCityClick={handleCityClick} />
        <div className="cities">
          {currentCityLocation ? <OffersSection offers={filteredOffers} currentCity={currentCity} currentCityLocation={currentCityLocation} /> : <NoOffersList currentCity={currentCity} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
