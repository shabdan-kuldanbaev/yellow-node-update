import cn from 'classnames';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'UI/components/SectionTitle';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useAppFeatures } from './utils/useAppFeatures';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const AppFeaturesItem = dynamic(() => import('UI/components/AppFeaturesItem'));
const FigmaPrototype = dynamic(() => import('components/Common/FigmaPrototype'));

const AppFeatures = (props) => {
  const {
    type,
    view,
    title,
    subtitle,
    description,
    imageSrc,
    activeIndex,
    handleOnClick,
    itemsData,
    promoImages,
    isPromoImage,
  } = useAppFeatures(props);

  if (!itemsData) {
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
            title={title}
            subtitle={subtitle}
            description={description}
            className={styles.titleWrapper}
          />
          {itemsData.map((document, index) => (
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
        <Animated
          delay={500}
          {...ANIMATION_CASE_STUDY_PROPS}
        >
          <div className={styles.imageContainer}>
            <Illustration
              src={imageSrc}
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
