'use client';

import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useCaseFeaturesProps from './utils/useCaseFeaturesProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CaseAppFeatures = (props) => {
  const {
    type,
    sectionTitle,
    sectionDescription,
    content,
    imagesData,
    promoImage,
    handleClick,
    activeIndex,
  } = useCaseFeaturesProps(props);

  return (
    <section className={cn(styles.section, styles[type])}>
      <SectionTitle
        title={sectionTitle}
        description={sectionDescription}
        titleStyle={styles.titleStyle}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.featuresContainer}>
          {content?.map(({ title, text }, index) => (
            <Animated
              key={title}
              {...REVEAL_ANIMATION_PROPS}
              delay={75 * index}
            >
              <div
                className={cn(styles.feature, {
                  [styles.activeFeature]: index === activeIndex,
                })}
              >
                <Typography
                  variant="p"
                  className={styles.title}
                  onClick={handleClick(index)}
                >
                  {title}
                </Typography>
                <Animated
                  open={index === activeIndex}
                  type={ANIMATED_TYPE.expandByHeight}
                >
                  <div className={styles.description}>
                    <ContentfulParser document={text} />
                  </div>
                </Animated>
              </div>
            </Animated>
          ))}
        </div>
        <div className={styles.imageContainer}>
          {activeIndex !== -1 ? imagesData?.map((image, i) => (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              key={`image_${i + 1}`}
            >
              <Illustration
                src={image}
                className={cn(styles.image, {
                  [styles.activeImage]: i === activeIndex,
                })}
                alt={type}
              />
            </Animated>
          )) : (
            <Animated {...REVEAL_ANIMATION_PROPS}>
              <Illustration
                src={promoImage}
                className={styles.promoImage}
                alt={type}
              />
            </Animated>
          )}
        </div>
      </div>
    </section>
  );
};

CaseAppFeatures.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseAppFeatures;
