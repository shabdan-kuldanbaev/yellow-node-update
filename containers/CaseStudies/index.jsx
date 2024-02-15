import { useContext } from 'react';
import PropTypes from 'prop-types';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import MetaTags from 'components/Common/MetaTags';
import { rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { routes } from 'utils/routes';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPage } from 'utils/dataFetching/getPage';
import { IntroSectionContext } from 'utils/appContext';
import styles from './styles.module.scss';

const CaseStudiesContainer = async ({ slug }) => {
  const { data = {}, isLoading } = await getPage(slug);

  const introSection = useContext(IntroSectionContext);

  if (isLoading) {
    return null;
  }

  const {
    contentModules,
    pageTitle,
    metaData: {
      metaTitle,
      metaDescription,
      ogImage,
      metaRobots,
    },
  } = data;

  const projectMetadata = {
    metaTitle: metaTitle || `${pageTitle} | Yellow`,
    metaDescription: metaDescription || (pageTitle && `Yellow professionals have created ${pageTitle}. Read our case study to find more!`),
    url: `${rootUrl}${routes.portfolio.getRoute(slug).path}`,
    metaRobots,
    ogImage,
  };

  const breadcrumbs = getBreadcrumbs(PAGES.project, {
    slug,
    title: pageTitle,
  });

  return (
    <>
      <MetaTags
        page={PAGES.portfolio}
        pageMetadata={projectMetadata}
        breadcrumbs={breadcrumbs}
      />
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
    </>
  );
};

export default CaseStudiesContainer;
