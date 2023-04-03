import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { SVG_IMAGES_TYPES, CASE_STUDIES } from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

export const TitleUnderline = ({ type }) => {
  switch (type) {
  case CASE_STUDIES.tell:
    return (
      <Svg
        type={SVG_IMAGES_TYPES.tellTeamUnderline}
        className={styles[type]}
      />
    );
  default:
    return null;
  }
};

TitleUnderline.defaultProps = {
  type: '',
};

TitleUnderline.propTypes = {
  type: PropTypes.string,
};
