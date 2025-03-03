import { OfferType, LocationType } from '../../types/common';
import OfferCard from './offer-card';
import { useState } from 'react';
import { Nullable } from 'vitest';
import Map from '../map/map';
import { classNamesMap } from '../../const';
import Sorting from './sorting';
import { getSortedOffers } from '../../utils/sort';

type Props = {
  offers: OfferType[];
  currentCity: string;
  currentCityLocation: LocationType;
}

function OffersSection(props: Props): JSX.Element {
  const { offers, currentCity, currentCityLocation } = props;
  const [activeOffer, setActiveOffer] = useState<Nullable<OfferType>>(null);
  const [sortedOffers, setSortedOffers] = useState<OfferType[]>(offers);

  const handleOfferHover = (offer: Nullable<OfferType>) => {
    setActiveOffer(offer || null);
  };

  const handleSortingOptionChange = (sortType: string) => setSortedOffers(getSortedOffers(offers, sortType));

  const cardList = sortedOffers.map((offer: OfferType) => (
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
        <Sorting onSortOptionChange={handleSortingOptionChange} />
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
