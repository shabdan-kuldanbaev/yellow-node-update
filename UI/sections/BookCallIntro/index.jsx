import cn from 'classnames';
import { InlineWidget } from 'react-calendly';
import SectionTitle from 'UI/components/SectionTitle';
import Button from 'UI/components/Button';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import styles from './BookCallIntro.module.scss';
import useProps from './utils';

function BookCallIntro(props) {
  const {
    introSection,
    type,
    title,
    subtitle,
    calendlyEventUrl,
    handleOnCTAClick,
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
            <Button
              className={styles.button}
              onClick={handleOnCTAClick}
            >
              Write a message
            </Button>
          </div>

          <div className={styles.widgetContainer}>
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
        </div>
      </div>
      <FullScreenEstimation />
    </section>
  );
}

export default BookCallIntro;
