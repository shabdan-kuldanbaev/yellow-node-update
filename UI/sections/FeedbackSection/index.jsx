import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import FeedbackForm from 'UI/components/Forms/FeedbackForm';
import LinkWrapper from 'UI/components/LinkWrapper';
import Illustration from 'UI/components/Illustration';
import DownloadChecklistForm from 'UI/components/Forms/DownloadChecklistForm';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

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
              <DownloadChecklistForm downloadLink={files[0]} />
            </div>
          );

        default:
          return (
            <div className={styles.contentWrapper}>
              <SectionTitle
                title={title}
                secondTitle={secondTitle}
                titleStyle={styles.titleStyle}
              >
                <p className={styles.linkText}>
                  Fill in this form or
                  <LinkWrapper
                    className={styles.link}
                    path="mailto:hi@yellow.systems"
                  >
                    send us an e-mail
                  </LinkWrapper>
                </p>
              </SectionTitle>
              <FeedbackForm
                isBudgetSlider={isSliderBudget}
                type={type}
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
