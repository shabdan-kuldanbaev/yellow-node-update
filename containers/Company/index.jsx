import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import MetaTags from 'components/Common/MetaTags';
import PageHeader from 'UI/components/PageHeader';
import SectionSelector from 'UI/components/SectionSelector';
import { getPage } from 'utils/dataFetching/getPage';
import { PAGES } from 'utils/constants';
import { rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { IntroSectionContext } from 'utils/appContext';
import styles from './styles.module.scss';

const FullScreenEstimation = dynamic(() => import('components/Common/FullScreenEstimation'), { ssr: false });

const CompanyContainer = async () => {
  const { data = {} } = await getPage(PAGES.company);
  const {
    contentModules,
    metaData,
  } = data;

  const introSection = useContext(IntroSectionContext);

  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const openFullscreenEstimation = () => setIsFullscreenEstimation(true);
  const closeFullscreenEstimation = () => setIsFullscreenEstimation(false);

  const breadcrumbs = getBreadcrumbs(PAGES.company);
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/company`,
  };

  return (
    <>
      <MetaTags
        page={PAGES.company}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
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
