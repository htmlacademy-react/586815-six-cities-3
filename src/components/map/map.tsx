import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType, LocationType } from '../../types/common';
import useMap from './use-map';
import { Nullable } from 'vitest';
import { defaultCustomIcon, currentCustomIcon } from '../../const';
import classNames from 'classnames';

type Props = {
  className: string;
  offers: OfferType[];
  currentCity: LocationType;
  selectedOfferId: Nullable<string>;
}

function Map(props: Props): JSX.Element {
  const { className, offers, currentCity, selectedOfferId } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({ mapRef, city: currentCity });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: (selectedOfferId === offer.id)
            ? currentCustomIcon
            : defaultCustomIcon
        })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={classNames(className, 'map')}
      ref={mapRef}
    >
    </section >
  );
}

export default Map;
