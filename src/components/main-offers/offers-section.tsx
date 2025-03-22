import { OfferType, LocationType } from '../../types/common';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';
import Map from '../map/map';
import { classNamesMap } from '../../const';
import Sorting from './sorting';
import { getSortedOffers } from '../../utils/sort';
import { SortingOptions } from '../../const';
import OffersList from './offers-list';
import { useCallback } from 'react';
import { getPluralSuffix } from '../../utils/common';

type Props = {
  offers: OfferType[];
  currentCity: string;
  currentCityLocation: LocationType;
}

function OffersSection(props: Props): JSX.Element {
  const { offers, currentCity, currentCityLocation } = props;
  const [activeOffer, setActiveOffer] = useState<Nullable<OfferType>>(null);
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortingOptions.POPULAR);
  const [sortedOffers, setSortedOffers] = useState<OfferType[]>(getSortedOffers(offers, currentSortOption));

  useEffect(() => {
    setSortedOffers(getSortedOffers(offers, currentSortOption));
  }, [currentCity, offers, currentSortOption]);

  const handleOfferHover = useCallback((offer: Nullable<OfferType>) => {
    setActiveOffer(offer || null);
  }, []);

  const handleSortingOptionChange = useCallback((sortOption: string) => {
    setSortedOffers(getSortedOffers(offers, sortOption));
    setCurrentSortOption(sortOption);
  }, [offers]);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} place{getPluralSuffix(offers.length)} to stay in {currentCity}</b>
        <Sorting onSortOptionChange={handleSortingOptionChange} />
        <div className="cities__places-list places__list tabs__content">
          <OffersList offers={sortedOffers} onOfferHover={handleOfferHover} />
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
