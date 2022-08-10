import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import isEmpty from 'lodash/isEmpty';
import FullLayout from 'components/Layout/FullLayout';
import { microdata } from 'utils/microdata';
import { Question } from './Question';
import styles from './styles.module.scss';

export const FAQ = ({ faqList, type }) => {
  if (!faqList.length) {
    return null;
  }

  const faqBlock = (
    <>
      <Head>
        {!isEmpty(faqList) && (
          <Script
            id="JSON-LD-faq"
            key="JSON-LD-faq"
            type="application/ld+json"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(microdata.faq({ faqList })),
            }}
          />
        )}
      </Head>
      <div className={styles.frequentlyAskedQuestions}>
        {faqList.map((faq) => (
          <Question
            key={`faq-item/${faq.question}`}
            faq={faq}
          />
        ))}
      </div>
    </>
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
