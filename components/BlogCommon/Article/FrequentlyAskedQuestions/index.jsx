import React from 'react';
import PropTypes from 'prop-types';
import { FullLayout } from 'components/Layout/FullLayout';
import { Question } from './Question';
import styles from './styles.module.scss';

export const FrequentlyAskedQuestions = ({ faqList }) => {
  if (!faqList || !faqList.length) {
    return null;
  }

  return (
    <FullLayout
      disableMaxWidth
      disableTopPadding
      disableSidePadding
      disableBottomPadding
    >
      <div className={styles.frequentlyAskedQuestions}>
        {faqList.map((faq) => (
          <Question
            key={`faq-item/${faq.question}`}
            faq={faq}
          />
        ))}
      </div>
    </FullLayout>
  );
};

FrequentlyAskedQuestions.defaultProps = {
  faqList: [],
};

FrequentlyAskedQuestions.propTypes = {
  faqList: PropTypes.instanceOf(Array),
};
