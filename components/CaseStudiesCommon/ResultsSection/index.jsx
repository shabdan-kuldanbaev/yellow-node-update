import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { Video } from 'components/Common/Video';
import { getFileUrl, getDocumentFields } from 'utils/helper';
import { isResultHasVideo } from './utils/resultsHelper';
import styles from './styles.module.scss';

const ResultsSection = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const { images, contentModules } = data;
  const smartphoneUrl = getFileUrl(images[0]);
  const appScreenUrl = getFileUrl(images[1]);
  const imagesBundlesData = contentModules && getDocumentFields(get(contentModules, '[0]', {}));

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
        {isResultHasVideo
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
