import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { Figures } from 'UI/components/Figures';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Illustration from 'UI/components/Illustration';
import { TYPOGRAPHY_SIZE } from 'UI/components/Typography/utils/useTypography';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const Typography = dynamic(() => import('UI/components/Typography'));
const Button = dynamic(() => import('UI/components/Button'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));

const PageIntroSection = (props) => {
  const {
    type,
    title,
    description,
    image,
    buttonTitle,
    figuresData,
    introSection,
    handleOnCTAClick,
    scrollBlock,
  } = useSectionProps(props);

  // TODO: use rich text instead of splitting
  const descriptionParagraphs = description?.split('||');

  return (
    <section
      ref={introSection}
      className={cn(styles.pageIntroSection, styles[type])}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.pageWrapper}>
          <div className={styles.pageTextContainer}>
            <Animated {...REVEAL_ANIMATION_PROPS}>
              {title && (
                <Typography
                  variant="h1"
                  size={TYPOGRAPHY_SIZE.headline46}
                  mobileSize={TYPOGRAPHY_SIZE.headline24}
                  className={styles.pageTitle}
                >
                  {title}
                </Typography>
              )}
            </Animated>
            <Animated {...REVEAL_ANIMATION_PROPS}>
              {descriptionParagraphs?.map((text, index) => (
                <Typography
                  variant="p"
                  className={styles.pageSubtitle}
                  key={`paragraph/${index}`}
                >
                  {text}
                </Typography>
              ))}
            </Animated>
            {buttonTitle && (
              <Animated {...REVEAL_ANIMATION_PROPS}>
                <div className={styles.buttonWrapper}>
                  <Button
                    onClick={handleOnCTAClick}
                    className={styles.button}
                    data-button
                  >
                    {buttonTitle}
                  </Button>
                </div>
              </Animated>
            )}
          </div>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            {image.url && (
              <Illustration
                src={image.url}
                alt={image.alt}
                className={styles.pageImage}
                transparent
                priority
              />
            )}
          </Animated>
        </div>
        <Figures
          type={type}
          figuresData={figuresData}
        />
        {scrollBlock && (
          <CallToAction
            data={scrollBlock}
            slug={type}
            sectionRef={introSection}
          />
        )}
      </div>
    </section>
  );
};

PageIntroSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object),
};

export default PageIntroSection;
