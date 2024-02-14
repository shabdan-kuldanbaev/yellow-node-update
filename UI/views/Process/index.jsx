import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import Process from 'UI/components/ProcessList';
import { PAGES, ROUTES } from 'utils/constants';
import { useProcess } from './utils/useProcess';
import styles from './styles.module.scss';

const ProcessContainer = () => {
  const {
    json,
    breadcrumbs,
    pageMetadata,
    isFullscreenEstimation,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  } = useProcess();

  return (
    <>
      <MetaTags
        page={PAGES.process}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
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
