'use client';

import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from 'UI/components/PageHeader';
import SectionSelector from 'UI/components/SectionSelector';
import { PAGES } from 'utils/constants';
import { IntroSectionContext } from 'utils/appContext';
import styles from './styles.module.scss';

const FullScreenEstimation = dynamic(() => import('components/Common/FullScreenEstimation'), { ssr: false });

const CompanyContainer = ({
  data,
  breadcrumbs,
  children,
}) => {
  const { contentModules } = data;

  const introSection = useContext(IntroSectionContext);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  return (
    <>
      {children}
      <main className={styles.main}>
        <PageHeader
          breadcrumbsTheme="dark"
          breadcrumbsStyles={styles.breadcrumbsStyles}
          breadcrumbs={breadcrumbs}
        />
        {contentModules?.map((module) => (
          <SectionSelector
            key={module.sys.id}
            introSection={introSection}
            handleOnCTAClick={openFullscreenEstimation}
            data={module}
            type={PAGES.company}
          />
        ))}
      </main>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </>
  );
};

export default CompanyContainer;
