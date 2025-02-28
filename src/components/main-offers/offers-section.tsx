import { OfferType, LocationType } from '../../types/common';
import OfferCard from './offer-card';
import { useState } from 'react';
import { Nullable } from 'vitest';
import Map from '../map/map';
import { classNamesMap } from '../../const';

type Props = {
  offers: OfferType[];
  currentCity: string;
  currentCityLocation: LocationType;
}

function OffersSection(props: Props): JSX.Element {
  const { offers, currentCity, currentCityLocation } = props;
  const [activeOffer, setActiveOffer] = useState<Nullable<OfferType>>(null);

  const handleOfferHover = (offer: Nullable<OfferType>) => {
    setActiveOffer(offer || null);
  };

  const cardList = offers.map((offer: OfferType) => (
    <OfferCard
      key={offer.id}
      cardData={offer}
      onOfferHover={handleOfferHover}
      isMainOffers
    />));


  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {cardList}
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          className={classNamesMap.cities}
          offers={offers}
          currentCity={currentCityLocation}
          selectedOfferId={activeOffer ? activeOffer.id : null}
        />
      </div>
    </div>
  );
}

export default OffersSection;
