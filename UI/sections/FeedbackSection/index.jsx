import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import LinkWrapper from 'UI/components/LinkWrapper';
import Illustration from 'UI/components/Illustration';
import { EMAIL_LINK } from 'utils/constants/contacts';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const DownloadChecklistForm = dynamic(() => import('UI/components/Forms/DownloadChecklistForm'), { ssr: false });
const FeedbackForm = dynamic(() => import('UI/components/Forms/FeedbackForm'), { ssr: false });

const FeedbackSection = (props) => {
  const {
    type,
    title,
    secondTitle,
    isSliderBudget,
    subtitle,
    slug,
    images,
    files,
    buttonTitle,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.feedbackSection, styles[type], styles[slug])}>
      {(() => {
        switch (slug) {
        case 'feedback-checklist-download':
          return (
            <div className={styles.contentWrapper}>
              <Illustration
                src={images[0].url}
                alt={images[0].alt}
                className={styles.image}
              />
              <SectionTitle
                title={title}
                subtitle={subtitle}
                className={styles.title}
              />
              <DownloadChecklistForm
                downloadLink={files[0]}
                pageSlug={type}
              />
            </div>
          );

        default:
          return (
            <div className={styles.container}>
              <FeedbackForm
                buttonTitle={buttonTitle}
                className={styles.form}
                isBudgetSlider={isSliderBudget}
                type={type}
                formHeader={(
                  <SectionTitle
                    title={title}
                    secondTitle={secondTitle}
                    titleStyle={styles.titleStyle}
                  >
                    <p className={styles.linkText}>
                      Fill in this form or
                      <LinkWrapper
                        className={styles.link}
                        path={`mailto:${EMAIL_LINK}`}
                      >
                        send us an e-mail
                      </LinkWrapper>
                    </p>
                  </SectionTitle>
                )}
              />
            </div>
          );
        }
      })()}
    </section>
  );
};

FeedbackSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FeedbackSection;
