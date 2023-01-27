import React from 'react';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import FeedbackForm from 'UI/components/FeedbackForm';
import LinkWrapper from 'UI/components/LinkWrapper';
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
  } = useSectionProps(props);

  return (
    <section className={cn(styles.feedbackSection, styles[type], styles[slug])}>
      <div className={styles.contentWrapper}>
        {(() => {
          switch (slug) {
          case 'feedback-checklist-download':
            return (
              <>
                <SectionTitle
                  title={title}
                  subtitle={subtitle}
                />
                <div />
              </>
            );

          default:
            return (
              <>
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
              </>
            );
          }
        })()}
      </div>
    </section>
  );
};

export default FeedbackSection;
