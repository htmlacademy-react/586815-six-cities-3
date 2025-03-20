import { OfferType } from '../../types/common';
import OfferCard from '../main-offers/offer-card';

type Props = {
  cityName: string;
  offers: OfferType[];
}

function FavoritesOffersList(props: Props): JSX.Element {
  const { cityName, offers } = props;
  const cityOffers = offers.filter((offer: OfferType) => offer.city.name === cityName);

  const offersList = cityOffers.map((offer: OfferType) => (
    <OfferCard cardData={offer} key={offer.id} isFavoritesOffers />
  ));

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offersList}
      </div>
    </li>
  );
}

export default FavoritesOffersList;
