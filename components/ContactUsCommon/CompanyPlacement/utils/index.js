import { ANIMATED_TYPE } from 'utils/constants';
import PropTypes from 'prop-types';

export const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opacityDuration: 1,
  transformDuration: 1,
  transitionDelay: 100,
};

export const MapPointValidator = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
});

export * from './data';
