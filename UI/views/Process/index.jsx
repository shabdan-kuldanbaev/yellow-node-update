'use client';

import PageHeader from 'UI/components/PageHeader';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import Process from 'UI/components/ProcessList';
import { ROUTES } from 'utils/constants';
import { useProcess } from './utils/useProcess';
import styles from './styles.module.scss';

const ProcessContainer = (props) => {
  const {
    json,
    isFullscreenEstimation,
    breadcrumbs,
    children,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  } = useProcess(props);

  return (
    <>
      {children}
      <main className={styles.main}>
        <PageHeader
          title={ROUTES.process.title}
          breadcrumbs={breadcrumbs}
          breadcrumbsTheme="dark"
          breadcrumbsStyles={styles.breadcrumbsStyles}
          titleStyles={styles.titleStyles}
        />
        <Process
          processes={json}
          handleOnCTAClick={openFullscreenEstimation}
        />
      </main>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </>
  );
};

export default ProcessContainer;
