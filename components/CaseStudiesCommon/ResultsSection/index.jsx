import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { Video } from 'components/Common/Video';
import { getFileUrl } from 'utils/helper';
import { isResultHasVideo, getResultProps } from './utils/resultsHelper';
import styles from './styles.module.scss';

const ResultsSection = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const {
    smartphoneUrl,
    appScreenUrl,
    imagesBundlesData,
  } = getResultProps(data);

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
        {isResultHasVideo(type)
          ? (
            <Video
              src={appScreenUrl}
              className={styles.video}
            />
          )
          : (
            <img
              className={styles.appImage}
              src={appScreenUrl}
              alt={appScreenUrl}
            />
          )}
        {imagesBundlesData && imagesBundlesData.imagesBundles.map((bundle) => {
          const bundleUrl = getFileUrl(bundle);

          return (
            <img
              className={styles.imageBundle}
              src={bundleUrl}
              alt={type}
            />
          );
        })}
      </div>
    </section>
  );
};

ResultsSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ResultsSection;
