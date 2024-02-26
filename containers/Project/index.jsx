import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { useRouter } from 'next/navigation';
import { selectProject } from 'redux/selectors/portfolio';
import Project from 'components/ProjectCommon';
import MetaTags from 'components/Common/MetaTags';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';

const ProjectContainer = ({ introSection, currentProject }) => {
  const { asPath } = useRouter();
  const {
    body,
    metaTitle,
    metaDescription,
  } = getDocumentFields(get(currentProject, 'items[0]', {}));

  const pageMetadata = {
    metaTitle,
    metaDescription,
    url: `${rootUrl}${asPath}`,
  };

  return (
    <>
      <MetaTags
        page={PAGES.portfolio}
        pageMetadata={pageMetadata}
      />
      <Project
        body={body}
        introSection={introSection}
      />
    </>
  );
};

ProjectContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentProject: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ currentProject: selectProject(state) }),
)(ProjectContainer);
