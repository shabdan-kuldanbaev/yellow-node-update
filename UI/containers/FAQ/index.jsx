import PropTypes from 'prop-types';
import Head from 'next/head';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { getFaqMicrodata } from 'utils/microdata/utils';
import styles from './styles.module.scss';

const CollapseItem = dynamic(() => import('UI/components/CollapseItem'));

const FAQ = ({
  isArticalPage,
  faqList = [],
}) => (
  <>
    <Head>
      {/* Somehow microdata doesnt work with next/script so use this instead */}
      <script
        id="JSON-LD-faq"
        key="JSON-LD-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqMicrodata({ faqList }), null, 2) }}
      />
    </Head>
    <div className={cn(styles.frequentlyAskedQuestions, { [styles.faqArticalPage]: isArticalPage })}>
      {faqList.map((faq) => (
        <CollapseItem
          key={`faq-item/${faq.question}`}
          faq={faq}
        />
      ))}
    </div>
  </>
);

FAQ.propTypes = {
  faqList: PropTypes.instanceOf(Array),
  isArticalPage: PropTypes.bool,
};

export default FAQ;
