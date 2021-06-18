import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Images from 'components/CaseStudiesCommon/Images';
import styles from './styles.module.scss';

const ResultsSection = ({ data, type }) => (
  <section className={styles[type]}>
    <SectionTitle
      data={data}
      type={type}
    />
    <Images data={data} />
  </section>
);

ResultsSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ResultsSection;
