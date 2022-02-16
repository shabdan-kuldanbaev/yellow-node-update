import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import {
  animatedProps,
  MapPointValidator,
  markers,
} from '../utils';
import Map from '../Map';
import styles from './styles.module.scss';

const MapWithInfo = ({ mapData, placementInfo }) => (
  <>
    <Animated {...animatedProps}>
      {placementInfo.map((info) => (
        <p className={styles.placementInfo}>
          {info}
        </p>
      ))}
    </Animated>
    <Animated {...animatedProps}>
      <Map
        mapData={mapData}
        marker={markers.USA}
      />
    </Animated>
  </>
);

MapWithInfo.propTypes = {
  placementInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
  mapData: PropTypes.shape({
    zoom: PropTypes.number,
    center: MapPointValidator,
    marker: MapPointValidator,
  }).isRequired,
};

export default MapWithInfo;
