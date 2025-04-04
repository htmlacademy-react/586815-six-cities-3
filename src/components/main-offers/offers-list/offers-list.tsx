
import { OfferType } from '../../../types/common';
import OfferCard from '../offer-card/offer-card';
import { Nullable } from 'vitest';

type Props = {
  offers: OfferType[];
  onOfferHover: (offer: Nullable<OfferType>) => void;
};

function OffersList(props: Props): JSX.Element {
  const { offers, onOfferHover } = props;

  return (
    <div className="cities__places-list places__list tabs__content" data-testid="offers-list-container">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          cardData={offer}
          onOfferHover={onOfferHover}
          isMainOffers
        />
      ))}
    </div>
  );
}

export default OffersList;
