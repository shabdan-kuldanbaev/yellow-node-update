import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import AppFeaturesItem from 'UI/components/AppFeaturesItem';
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
    isMobileResolution,
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
            data={data}
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
        <Animated delay={500}>
          <div className={styles.imageContainer}>
            <img
              src={images[activeIndex]}
              className={styles.image}
              alt={type}
            />
            {isPromoImage && promoImages[activeIndex]
              && (
                <iframe
                  height={isMobileResolution ? '650' : '700'}
                  width={isMobileResolution ? '350' : '450'}
                  src={`https://www.figma.com/embed?embed_host=astra&url=${promoImages[activeIndex].url}`}
                  title={data.title}
                  allowTransparency
                />
              )}
          </div>
        </Animated>
      </div>
    </section>
  );
};

AppFeatures.defaultProps = {
  isPromoImage: false,
};

AppFeatures.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  isPromoImage: PropTypes.bool,
};

export default AppFeatures;
