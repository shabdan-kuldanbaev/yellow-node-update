import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import AppFeaturesItem from './AppFeaturesItem';
import { useAppFeatures } from './utils/useAppFeatures';
import styles from './styles.module.scss';

const AppFeatures = (props) => {
  const {
    type,
    data,
    images,
    activeIndex,
    handleOnClick,
    imagesData,
  } = useAppFeatures(props);

  if (!imagesData) {
    return null;
  }

  return (
    <section className={cn(styles.section, styles[type])}>
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <SectionTitle
            data={data}
            type={type}
          />
          {data.contentModules.map((document, index) => (
            <AppFeaturesItem
              type={type}
              data={document}
              currentIndex={index}
              activeIndex={activeIndex}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>
        <Animated delay={500}>
          <div className={styles.imageContainer}>
            <img
              src={images[activeIndex]}
              className={styles.image}
              alt={type}
            />
          </div>
        </Animated>
      </div>
    </section>
  );
};

AppFeatures.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default AppFeatures;
