import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType, LocationType } from '../../types/common';
import useMap from './use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { Nullable } from 'vitest';

type Props = {
  offers: OfferType[];
  currentCity: LocationType;
  selectedOffer: Nullable<OfferType>;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function OffersMap(props: Props): JSX.Element {
  const { offers, currentCity, selectedOffer } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({ mapRef, city: currentCity });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: (selectedOffer && selectedOffer.id === offer.id)
            ? currentCustomIcon
            : defaultCustomIcon
        })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default OffersMap;
