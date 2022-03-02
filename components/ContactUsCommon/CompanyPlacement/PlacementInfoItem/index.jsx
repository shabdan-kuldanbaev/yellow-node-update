import React from 'react';
import PropTypes from 'prop-types';

const PlacementInfoItem = ({ country, placementInfo }) => (
  <li>
    <h3>{country}</h3>
    {placementInfo.map((info) => <p>{info}</p>)}
  </li>
);

PlacementInfoItem.propTypes = {
  country: PropTypes.string.isRequired,
  placementInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlacementInfoItem;
