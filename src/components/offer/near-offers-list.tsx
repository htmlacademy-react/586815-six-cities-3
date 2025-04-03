import { OfferType } from '../../types/common';
import OfferCard from '../main-offers/offer-card';

type Props = {
  nearOffers: OfferType[];
}

function NearOffersList(props: Props): JSX.Element {
  const { nearOffers } = props;

  return (
    <div className="container" data-testid="near-offers-container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearOffers.map((offer) =>
            <OfferCard key={offer.id} cardData={offer} isNearbyOffers />
          )}
        </div>
      </section>
    </div>
  );
}

export default NearOffersList;
