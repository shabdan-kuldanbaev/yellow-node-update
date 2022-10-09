import React from 'react';
import PropTypes from 'prop-types';
import CaseStudyOverlayProcess from 'components/CaseStudiesCommon/CaseStudyOverlayProcess';
import styles from './styles.module.scss';

const AppOverlayProcess = ({ data, type }) => (
  <section className={styles[type]}>
    <CaseStudyOverlayProcess
      data={data}
      type={type}
    />
  </section>
);

AppOverlayProcess.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default AppOverlayProcess;
