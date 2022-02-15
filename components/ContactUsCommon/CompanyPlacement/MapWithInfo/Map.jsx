import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { MAPBOX_TOKEN } from 'utils/constants';
import PropTypes from 'prop-types';
import { markers, MapPointValidator } from '../utils';
import YellowLogo from '../assets/yellow-logo.svg';
import styles from './styles.module.scss';

const Map = ({ mapData: { center, zoom } }) => {
  const [viewport, setViewport] = useState(null);
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  );

  useEffect(() => {
    setViewport({
      latitude: center.lat,
      longitude: center.lng,
      zoom,
    });
  }, [center, zoom]);

  return (
    <div className={styles.map}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {
          Object.entries(markers).map(([country, marker]) => (
            <Marker
              key={country}
              longitude={marker.lng}
              latitude={marker.lat}
              anchor="center"
            >
              <YellowLogo />
            </Marker>
          ))
        }
      </MapGL>
    </div>
  );
};

Map.propTypes = {
  mapData: PropTypes.shape({
    center: MapPointValidator,
    zoom: PropTypes.number,
  }).isRequired,
};

export default Map;
