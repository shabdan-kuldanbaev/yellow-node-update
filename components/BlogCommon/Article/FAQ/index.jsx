import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { FullLayout } from 'components/Layout/FullLayout';
import { Question } from './Question';
import styles from './styles.module.scss';

export const FAQ = ({ faqList }) => {
  if (isEmpty(faqList)) {
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

FAQ.defaultProps = {
  faqList: [],
};

FAQ.propTypes = {
  faqList: PropTypes.instanceOf(Array),
};
