import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectComponents, selectMetaData, selectTitle } from 'redux/selectors/layout';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import MetaTags from 'components/Common/MetaTags';
import { rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import { useRouter } from 'next/router';
import { routes } from 'utils/routes';

const CaseStudiesContainer = ({ introSection }) => {
  const { query: { project: slug } } = useRouter();

  const { main: contentModules } = useSelector(selectComponents);
  const pageTitle = useSelector(selectTitle);
  const {
    metaTitle,
    metaDescription,
    ogImage,
    metaRobots,
  } = useSelector(selectMetaData);

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
      <main>
        {(contentModules || []).map(({ fields, sys }) => (
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
