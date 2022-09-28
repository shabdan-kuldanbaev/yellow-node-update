import React from 'react';

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

export default AppOverlayProcess;