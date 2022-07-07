import React from 'react';
import PropTypes from 'prop-types';
import { FAQ } from 'components/Common/FAQ';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { getFAQList } from './utils/faqHelper';
import styles from './styles.module.scss';

const FaqSection = ({ data, type }) => {
  const {
    title,
    contentModules,
  } = getDocumentFields(data);

  if (!contentModules) {
    return null;
  }

  const faqList = getFAQList(contentModules);

  return (
    <section className={styles[type]}>
      <SectionTitle title={title} />
      <FAQ faqList={faqList} />
    </section>
  );
};

FaqSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FaqSection;
