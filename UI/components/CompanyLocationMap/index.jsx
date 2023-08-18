import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import Svg from 'UI/components/Svg';
import { selectIsMobile } from 'redux/selectors/layout';
import { useSelector } from 'react-redux';
import {
  markers,
  INITIAL_MAP_LAT,
  INITIAL_MAP_LNG,
  INITIAL_MAP_ZOOM,
  MAPBOX_TOKEN,
  INITIAL_MAP_MOBILE_ZOOM,
} from './utils/data';
import styles from './styles.module.scss';

const Map = () => {
  const isMobile = useSelector(selectIsMobile);

  const [viewport, setViewport] = useState({
    latitude: INITIAL_MAP_LAT,
    longitude: INITIAL_MAP_LNG,
    zoom: INITIAL_MAP_ZOOM,
  });

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    setViewport((prev) => ({ ...prev, zoom: INITIAL_MAP_MOBILE_ZOOM }));
  }, [isMobile]);

  return (
    <div className={styles.map}>
      {viewport && (
        <MapGL
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
              anchor="bottom"
              className={styles.marker}
            >
              <Svg type="defaultLogo" />
            </Marker>
          ))}
        </MapGL>
      )}
    </div>
  );
};

export default Map;
