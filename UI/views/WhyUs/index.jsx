'use client';

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from 'UI/components/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { IntroSectionContext } from 'utils/appContext';
import { routes } from 'utils/routes';
import styles from './styles.module.scss';

const WhyUsCommon = dynamic(() => import('UI/containers/WhyUsCommon').then((module) => module.WhyUsCommon));

const WhyUs = ({ data, metaData }) => {
  const type = routes.whyUs.slug;
  const { contentModules } = data;

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
