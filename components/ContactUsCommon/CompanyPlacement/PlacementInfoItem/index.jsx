import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const PlacementInfoItem = ({ country, placementInfo }) => (
  <li>
    <h3>{country}</h3>
    {placementInfo.map((info, i) => (
      <p
        key={i}
        className={styles.placementInfo}
      >
        {info}
      </p>
    ))}
  </li>
);

PlacementInfoItem.propTypes = {
  country: PropTypes.string.isRequired,
  placementInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PlacementInfoItem;
