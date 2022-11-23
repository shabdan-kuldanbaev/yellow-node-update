import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import isEmpty from 'lodash/isEmpty';
import { microdata } from 'utils/microdata';
import CollapseItem from 'UI/components/CollapseItem';
import styles from './styles.module.scss';

const FAQ = ({ faqList }) => (
  <>
    <Head>
      {!isEmpty(faqList) && (
        <script
          key="JSON-LD-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(microdata.faq({ faqList })),
          }}
        />
      )}
    </Head>
    <div className={styles.frequentlyAskedQuestions}>
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
};

FAQ.propTypes = {
  faqList: PropTypes.instanceOf(Array),
};

export default FAQ;
