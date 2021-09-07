import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { isTitleHasBackground } from 'components/CaseStudiesCommon/Intro/VerticalIntro/utils/introHelper';
import styles from '../styles.module.scss';

export const TitleText = ({ type, data }) => {
  switch (type) {
  case 'separateUs':
    const titleWords = data && data.split('.');

    if (!titleWords) {
      return null;
    }

    return (
      <h1 className={styles.projectTitle}>
        <span className={styles.pinkText}>
          {`${titleWords[0]}.`}
        </span>
        {titleWords[1]}
      </h1>
    );
  case 'meatEater':
    const titleFirstPart = data && data.slice(0, 4);
    const titleSecondPart = data && data.slice(4);

    if (!titleFirstPart && !titleSecondPart) {
      return null;
    }

    return (
      <h1 className={styles.projectTitle}>
        <span className={styles.orangeText}>
          {titleFirstPart}
        </span>
        {titleSecondPart}
      </h1>
    );
  case 'openSense':
    return (
      <div className={styles.titleText}>
        <h1 className={styles.projectTitle}>
          {data}
        </h1>
        {isTitleHasBackground('open-sense') && (
          <Svg
            type={SVG_IMAGES_TYPES.opensenseTitleBorder}
            className={styles.titleBackground}
          />
        )}
      </div>
    );
  default:
    return (
      <h1 className={styles.projectTitle}>
        {data}
      </h1>
    );
  }
};

TitleText.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};
