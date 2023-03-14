import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import isEmpty from 'lodash/isEmpty';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { microdata } from 'utils/microdata';
import styles from './styles.module.scss';

const CollapseItem = dynamic(() => import('UI/components/CollapseItem'));

const FAQ = ({ faqList, isArticalPage }) => (
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
    <div
      className={cn(
        styles.frequentlyAskedQuestions,
        { [styles.faqArticalPage]: isArticalPage },
      )}
    >
      {faqList?.map((faq) => (
        <CollapseItem
          key={`faq-item/${faq.question}`}
          faq={faq}
        />
      ))}
    </div>
  </>
);

FAQ.defaultProps = {
  faqList: [],
  isArticalPage: false,
};

FAQ.propTypes = {
  faqList: PropTypes.instanceOf(Array),
  isArticalPage: PropTypes.bool,
};

export default FAQ;
