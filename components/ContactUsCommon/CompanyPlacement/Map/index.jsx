import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MapGL, {
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { MAPBOX_TOKEN } from 'utils/constants';
import {
  markers,
  INITIAL_MAP_LAT,
  INITIAL_MAP_LNG,
  INITIAL_MAP_ZOOM,
} from '../utils';
import YellowLogo from '../assets/yellow-logo.svg';
import styles from './styles.module.scss';

const MAP_MAX_WIDTH = 320;

const Map = () => {
  const [viewport, setViewport] = useState(null);
  const mapRef = useRef(null);
  const mapWidthRef = useRef(0);

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  );

  useEffect(() => {
    setViewport({
      latitude: INITIAL_MAP_LAT,
      longitude: INITIAL_MAP_LNG,
      zoom: INITIAL_MAP_ZOOM,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const handleOnResize = () => {
      const { _width: width } = mapRef.current;

      if (width === mapWidthRef.current) {
        return;
      }

      mapWidthRef.current = width;

      setViewport(({ zoom: mapZoom, ...prev }) => {
        const calculatedZoom = INITIAL_MAP_ZOOM - 1 + (width / MAP_MAX_WIDTH);

        return ({
          ...prev,
          zoom: calculatedZoom,
        });
      });
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, [mapRef]);

  return (
    <div className={styles.map}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="auto"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
      >
        <NavigationControl className={styles.controlPanel} />
        {Object.entries(markers).map(([country, marker]) => (
          <Marker
            key={country}
            longitude={marker.lng}
            latitude={marker.lat}
            anchor="center"
          >
            <YellowLogo />
          </Marker>
        ))}
      </MapGL>
    </div>
  );
};

export default Map;
