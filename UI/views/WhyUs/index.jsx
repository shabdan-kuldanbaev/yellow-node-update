import dynamic from 'next/dynamic';
import PageHeader from 'UI/components/PageHeader';
import MetaTags from 'components/Common/MetaTags';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { useFetchPageQuery } from 'store/apis/page';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const WhyUsCommon = dynamic(() => import('UI/containers/WhyUsCommon').then((module) => module.WhyUsCommon));

const WhyUs = ({
  metaData,
  type,
  introSection,
}) => {
  const { data = {} } = useFetchPageQuery(type);
  const { contentModules } = data;

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
