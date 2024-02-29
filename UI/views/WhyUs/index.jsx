'use client';

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from 'UI/components/PageHeader';
import { getDocumentFields } from 'utils/helper';
import { IntroSectionContext } from 'utils/appContext';
import { routes } from 'utils/routes';
import styles from './styles.module.scss';

const WhyUsCommon = dynamic(() => import('UI/containers/WhyUsCommon').then((module) => module.WhyUsCommon));

const WhyUs = ({
  data,
  breadcrumbs,
  children,
}) => {
  const type = routes.whyUs.slug;
  const { contentModules } = data;

  const introSection = useContext(IntroSectionContext);

  return (
    <>
      {children}
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
