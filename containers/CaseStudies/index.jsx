'use client';

import { useContext } from 'react';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import { IntroSectionContext } from 'utils/appContext';
import styles from './styles.module.scss';

const CaseStudiesContainer = ({ data, slug }) => {
  const introSection = useContext(IntroSectionContext);

  const { contentModules } = data;

  return (
    <main className={styles.main}>
      {contentModules?.map(({ fields, sys }) => (
        <CaseStudiesCommon
          key={sys.id}
          type={slug}
          introSection={introSection}
          data={fields}
        />
      ))}
    </main>
  );
};

export default CaseStudiesContainer;
