import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { REVEAL_ANIMATION_PROPS, SVG_IMAGES_TYPES } from 'utils/constants';
import Illustration from 'UI/components/Illustration';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import Svg from 'UI/components/Svg';
import { useWhyUsIntro } from './utils/useWhyUsIntro';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const Typography = dynamic(() => import('UI/components/Typography'));

const WhyUsIntro = (props) => {
  const {
    type,
    titleParagraphs,
    imageUrl,
    secondImageUrl,
    figuresData,
  } = useWhyUsIntro(props);

  return (
    <section
      className={cn(styles.pageIntroSection, styles[type])}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.pageWrapper}>
          <div className={styles.pageTextContainer}>
            <Animated {...REVEAL_ANIMATION_PROPS}>
              <Typography
                variant="h1"
                size={TYPOGRAPHY_SIZE.headline46}
                mobileSize={TYPOGRAPHY_SIZE.headline24}
                className={styles.pageTitle}
              >
                <span>We provide </span>
                <Svg
                  type={SVG_IMAGES_TYPES.rocketFilled}
                  className={styles.logoImage}
                />
                <span>expertise,</span>
                <span>not just engineers</span>
              </Typography>
            </Animated>
          </div>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            {imageUrl && (
              <Illustration
                src={imageUrl}
                className={styles.pageImage}
                transparent
                priority
              />
            )}
          </Animated>
        </div>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          {secondImageUrl && (
            <Illustration
              src={secondImageUrl}
              className={styles.secondImageUrl}
              transparent
              priority
            />
          )}
        </Animated>
      </div>
    </section>
  );
};

WhyUsIntro.defaultProps = {
  introSection: null,
};

WhyUsIntro.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object),
};

export default WhyUsIntro;
