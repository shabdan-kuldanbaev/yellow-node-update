import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { selectProject } from 'redux/selectors/portfolio';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import MetaTags from 'components/Common/MetaTags';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const CaseStudiesContainer = ({ introSection }) => {
  const currentProject = useSelector(selectProject);

  const {
    slug,
    contentModules,
    metaTitle,
    metaDescription,
    ogImage,
    pageTitle,
  } = getDocumentFields(
    get(currentProject, 'items[0]', {}),
    [
      'slug',
      'contentModules',
      'metaDescription',
      'metaTitle',
      'hasFeedbackForm',
      'pageTitle',
    ],
  );
  // TODO: rework metatags for CaseStudies pages
  const projectMetadata = {
    metaTitle: metaTitle || (pageTitle && `${pageTitle} | Yellow`),
    metaDescription: metaDescription || (pageTitle && `Yellow professionals have created ${pageTitle}. Read our case study to find more!`),
    url: `${rootUrl}/${PAGES.portfolio}/${slug}`,
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
