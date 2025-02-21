import { OfferType } from '../../types/common';
import FavoritesOffer from './favorites-offer';

type Props = {
  cityName: string;
  offers: OfferType[];
}

function FavoritesCity(props: Props): JSX.Element {
  const { cityName, offers } = props;
  const cityOffers = offers.filter((offer: OfferType) => offer.city.name === cityName);

  const offersList = cityOffers.map((offer: OfferType) => (
    <FavoritesOffer offer={offer} key={offer.id} />
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

export default FavoritesCity;
