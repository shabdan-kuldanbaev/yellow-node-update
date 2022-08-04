import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'components/Common/Svg';
import { SVG_IMAGES_TYPES, CASE_STUDIES } from 'utils/constants';
import styles from './styles.module.scss';

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
