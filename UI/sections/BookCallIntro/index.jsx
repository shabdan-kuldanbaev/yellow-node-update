import cn from 'classnames';
import dynamic from 'next/dynamic';
import { InlineWidget } from 'react-calendly';
import SectionTitle from 'UI/components/SectionTitle';
import Button from 'UI/components/Button';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import LinkWrapper from 'UI/components/LinkWrapper';
import Svg from 'UI/components/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './BookCallIntro.module.scss';
import useProps from './utils';

const Media = dynamic(() => import('UI/components/Media'));

function BookCallIntro(props) {
  const {
    introSection,
    type,
    title,
    subtitle,
    calendlyEventUrl,
    handleOnCTAClick,
    widgetImage,
  } = useProps(props);

  return (
    <section
      ref={introSection}
      className={cn(styles.pageIntroSection, styles[type])}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.pageWrapper}>
          <div className={styles.pageTextContainer}>
            <SectionTitle
              title={title}
              subtitle={subtitle}
              className={styles.title}
            />
            <div className={styles.actionWrapper}>
              <LinkWrapper
                path={calendlyEventUrl}
                className={styles.linkButton}
              >
                Book a call
              </LinkWrapper>
              <Button
                className={styles.ctaButton}
                onClick={handleOnCTAClick}
              >
                Write a message
              </Button>
            </div>
          </div>

          <div className={styles.widgetContainer}>
            <div className={styles.widgetFrame}>
              <InlineWidget
                url={calendlyEventUrl}
                pageSettings={{
                  hideGdprBanner: true,
                  hideEventTypeDetails: true,
                  hideLandingPageDetails: true,
                }}
                styles={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            <Media
              asset={widgetImage}
              className={styles.widgetImage}
            />
          </div>
        </div>
      </div>
      <Svg
        type={SVG_IMAGES_TYPES.arrowNarrowDown}
        className={styles.arrow}
      />
      <FullScreenEstimation />
    </section>
  );
}

export default BookCallIntro;
