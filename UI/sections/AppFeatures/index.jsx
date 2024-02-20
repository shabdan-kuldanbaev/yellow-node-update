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
    className,
    titleProps,
    imageSrc,
    activeIndex,
    handleOnClick,
    itemsData,
    promoSrc,
    logoImage,
    isPromoImage,
  } = useAppFeatures(props);

  if (!itemsData) {
    return null;
  }

  return (
    <section className={className}>
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          <Illustration {...logoImage} />
          <SectionTitle {...titleProps} />
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
          {...ANIMATION_CASE_STUDY_PROPS}
          delay={150}
        >
          <div className={styles.imageContainer}>
            <Illustration {...imageSrc} />
            {isPromoImage && (
              <FigmaPrototype
                src={promoSrc}
                className={styles.prototype}
              />
            )}
          </div>
        </Animated>
      </div>
    </section>
  );
};

AppFeatures.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  isPromoImage: PropTypes.bool,
};

export default AppFeatures;
