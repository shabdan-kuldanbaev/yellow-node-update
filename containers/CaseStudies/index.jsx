import PropTypes from 'prop-types';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import MetaTags from 'components/Common/MetaTags';
import { rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { routes } from 'utils/routes';
import { useFetchPageQuery } from 'redux/apis/page';
import styles from './styles.module.scss';

const CaseStudiesContainer = ({ introSection, slug }) => {
  const { data = {}, isLoading } = useFetchPageQuery(slug);

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

  return (
    <>
      <MetaTags
        page={PAGES.portfolio}
        pageMetadata={projectMetadata}
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

CaseStudiesContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
};

export default CaseStudiesContainer;
