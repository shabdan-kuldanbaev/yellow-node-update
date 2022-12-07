import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import FigmaPrototype from 'components/Common/FigmaPrototype';
import AppFeaturesItem from 'UI/components/AppFeaturesItem';
import SectionTitle from 'UI/components/SectionTitle';
import { useAppFeatures } from './utils/useAppFeatures';
import styles from './styles.module.scss';

const AppFeatures = (props) => {
  const {
    type,
    view,
    data,
    images,
    activeIndex,
    handleOnClick,
    imagesData,
    promoImages,
    isPromoImage,
  } = useAppFeatures(props);

  if (!imagesData) {
    return null;
  }

  return (
    <section
      className={cn(
        styles.section,
        styles[type],
        styles[view],
      )}
    >
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <SectionTitle
            title={data?.title}
            type={type}
          />
          {data.contentModules.map((document, index) => (
            <AppFeaturesItem
              view={view}
              type={type}
              data={document}
              currentIndex={index}
              activeIndex={activeIndex}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>
        <div className={styles.imageWrapper}>
          <Animated delay={500}>
            <div className={styles.imageContainer}>
              <img
                src={images[activeIndex]}
                className={styles.image}
                alt={type}
              />
              {isPromoImage && promoImages[activeIndex]
                && (
                  <FigmaPrototype
                    src={promoImages[activeIndex].url}
                  />
                )}
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

AppFeatures.defaultProps = {
  isPromoImage: false,
};

AppFeatures.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  isPromoImage: PropTypes.bool,
};

export default AppFeatures;
