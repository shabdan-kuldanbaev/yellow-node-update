import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { FullLayout } from 'components/Layout/FullLayout';
import { Question } from './Question';
import styles from './styles.module.scss';

export const FAQ = ({ faqList, type }) => {
  if (isEmpty(faqList)) {
    return null;
  }

  const faqBlock = (
    <div className={styles.frequentlyAskedQuestions}>
      {faqList.map((faq) => (
        <Question
          key={`faq-item/${faq.question}`}
          faq={faq}
        />
      ))}
    </div>
  );

  switch (type) {
  case 'default':
    return faqBlock;
  case 'withFullLayout':
    return (
      <FullLayout
        disableMaxWidth
        disableTopPadding
        disableSidePadding
        disableBottomPadding
      >
        {faqBlock}
      </FullLayout>
    );
  default:
    return null;
  }
};

FAQ.defaultProps = {
  faqList: [],
  type: 'default',
};

FAQ.propTypes = {
  faqList: PropTypes.instanceOf(Array),
  type: PropTypes.string,
};
