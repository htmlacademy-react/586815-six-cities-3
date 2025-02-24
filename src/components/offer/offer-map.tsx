import { useRef } from 'react';
import useMap from '../main-offers/use-map';
import { LocationType } from '../../types/common';
import { defaultCustomIcon, currentCustomIcon } from '../../const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  currentCity: LocationType;
  currentOfferLocation: LocationType;
  nearOffersLocations: LocationType[];
}

function OfferMap(props: Props): JSX.Element {
  const { currentCity, currentOfferLocation, nearOffersLocations } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({ mapRef, city: currentCity });

  if (map) {
    nearOffersLocations.forEach((offerLocation) => {
      leaflet.marker({
        lat: offerLocation.latitude,
        lng: offerLocation.longitude,
      }, {
        icon: defaultCustomIcon
      })
        .addTo(map);
    });

    leaflet.marker({
      lat: currentOfferLocation.latitude,
      lng: currentOfferLocation.longitude,
    }, {
      icon: currentCustomIcon
    }).addTo(map);
  }

  return (
    <section
      className="offer__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default OfferMap;
