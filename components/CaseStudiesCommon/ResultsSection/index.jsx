import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const ResultsSection = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const { images } = data;
  const smartphoneUrl = getFileUrl(images[0]);
  const appScreenUrl = getFileUrl(images[1]);
  const appScreens = images.slice(2);

  return (
    <section className={styles[type]}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.circle}>
        <div className={styles.pointer} />
        <img
          className={styles.rootImage}
          src={smartphoneUrl}
          alt={smartphoneUrl}
        />
        <img
          className={styles.startedImage}
          src={appScreenUrl}
          alt={appScreenUrl}
        />
        {appScreens && appScreens.map((image, index) => {
          const imageUrl = getFileUrl(image);
          const delay = 2 ** index * 1000 + 2900;

          return (
            <Animated
              key={imageUrl}
              type={ANIMATED_TYPE.isFade}
              delay={delay}
              duration={1}
            >
              <div>
                <img
                  className={styles.screenImage}
                  src={imageUrl}
                  alt={imageUrl}
                />
              </div>
            </Animated>
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
