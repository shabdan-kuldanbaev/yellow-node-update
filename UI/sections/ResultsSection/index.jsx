import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Video from 'components/Common/Video';
import { useResultsSection } from './utils/useResultsSection';
import styles from './styles.module.scss';

const ResultsSection = (props) => {
  const {
    view,
    type,
    images,
    title,
    description,
    smartphoneUrl,
    appScreenUrl,
    imagesBundles,
    sectionStyle,
    isResultVideo,
  } = useResultsSection(props);

  if (!images) {
    return null;
  }

  return (
    <section
      className={cn(styles.container, [styles[type]], [styles[view]])}
      style={sectionStyle}
    >
      <SectionTitle
        title={title}
        description={description}
        type={type}
        className={styles.sectionTitle}
      />
      <div className={styles.circle}>
        <img
          className={styles.mockup}
          src={smartphoneUrl}
          alt={smartphoneUrl}
        />
        {isResultVideo
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
        {imagesBundles.map((bundleUrl, index) => (
          <img
            className={cn(styles.imageBundle, styles[`imageBundle-${index + 1}`])}
            src={bundleUrl}
            alt={type}
            key={`result-images-bundles/${bundleUrl}`}
          />
        ))}
      </div>
    </section>
  );
};

ResultsSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ResultsSection;
