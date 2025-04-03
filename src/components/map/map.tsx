import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType, LocationType } from '../../types/common';
import useMap from '../../hooks/map';
import { Nullable } from 'vitest';
import { defaultCustomIcon, currentCustomIcon } from '../../const';
import classNames from 'classnames';

type Props = {
  offers: (OfferType | null)[];
  currentCity: LocationType;
  selectedOfferId: Nullable<string>;
  isMainPage?: boolean;
}

function Map(props: Props): JSX.Element {
  const { offers, currentCity, selectedOfferId, isMainPage } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap({ mapRef, city: currentCity });
  const markerGroupRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (map) {
      map.setView({
        lat: currentCity.latitude,
        lng: currentCity.longitude,
      }, currentCity.zoom);
    }
  }, [currentCity, map]);

  useEffect(() => {
    if (!markerGroupRef.current && map) {
      markerGroupRef.current = leaflet.layerGroup().addTo(map);
    }

    markerGroupRef.current?.clearLayers();

    if (map) {
      offers.forEach((offer) => {
        if (offer) {
          leaflet.marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (selectedOfferId === offer.id)
              ? currentCustomIcon
              : defaultCustomIcon
          })
            .addTo(markerGroupRef.current as leaflet.LayerGroup);
        }
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={classNames('map', isMainPage ? 'cities__map' : 'offer__map')}
      ref={mapRef}
      data-testid="map-container"
    >
    </section >
  );
}

export default Map;
