import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const ResultsSection = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const { images } = data;
  const smartphoneUrl = getFileUrl(images[0]);
  const appScreenUrl = getFileUrl(images[1]);

  return (
    <section className={styles[type]}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.circle}>
        <img
          className={styles.mockup}
          src={smartphoneUrl}
          alt={smartphoneUrl}
        />
        <img
          className={styles.startedImage}
          src={appScreenUrl}
          alt={appScreenUrl}
        />
      </div>
    </section>
  );
};

ResultsSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ResultsSection;
