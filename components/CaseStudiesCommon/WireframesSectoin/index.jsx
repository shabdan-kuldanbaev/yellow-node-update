import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import styles from './styles.module.scss';

const WireframesSection = ({ data, type }) => (
  <section className={styles[type]}>
    <SectionTitle
      data={data}
      type={type}
    />
    <Wireframes
      data={data}
      type={type}
    />
  </section>
);

WireframesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default WireframesSection;
