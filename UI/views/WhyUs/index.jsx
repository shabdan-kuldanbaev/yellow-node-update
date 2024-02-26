import { useContext } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from 'UI/components/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { getPage } from 'utils/dataFetching/getPage';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { IntroSectionContext, PageFetchContext } from 'utils/appContext';
import { routes } from 'utils/routes';
import styles from './styles.module.scss';

const WhyUsCommon = dynamic(() => import('UI/containers/WhyUsCommon').then((module) => module.WhyUsCommon));

const WhyUs = async () => {
  const type = routes.whyUs.slug;
  const { data: { metaData, ...data } = {} } = await getPage(type);
  const { contentModules } = data;

  const { setPageFetchQuery } = useContext(PageFetchContext);
  setPageFetchQuery(type);

  const introSection = useContext(IntroSectionContext);

  const breadcrumbs = getBreadcrumbs(type);
  const pageMetadata = { ...metaData, url: `${rootUrl}/${type}` };

  if (!contentModules) {
    return null;
  }

  return (
    <>
      <MetaTags
        page={PAGES.whyUs}
        pageMetadata={pageMetadata}
        breadcrumbs={breadcrumbs}
      />
      <main className={styles.container}>
        <PageHeader
          breadcrumbsTheme="light"
          breadcrumbsStyles={styles.breadcrumbs}
          titleStyles={styles.titleStyles}
          breadcrumbs={breadcrumbs}
        />
        {contentModules?.map((section) => {
          const { type: sectionType, view, slug } = getDocumentFields(section);

          return (
            <WhyUsCommon
              key={`${type}/${sectionType}-${view || slug}`}
              type={type}
              section={section}
              introSection={introSection}
            />
          );
        })}
      </main>
    </>
  );
};

export default WhyUs;
