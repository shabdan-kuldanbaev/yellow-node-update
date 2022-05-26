import React, {
  Fragment, useCallback, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectPortfolioProjectsPreview, selectMetaData, selectTitle, selectSubtitle, selectCTA,
} from 'redux/selectors/layout';
import {
  Portfolio,
  MetaTags,
  PageHeader,
  FullLayout,
  CallToAction, Animated, FullScreenEstimation,
} from 'components';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { ANIMATED_TYPE, PAGES, ROUTES } from 'utils/constants';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  portfolioProjects,
  metaData,
  title,
  subtitle,
  linkCTA,
}) => {
  const [isFullscreenEstimation, setIsFullscreenEstimation] = useState(false);

  const { contentModules } = getDocumentFields(portfolioProjects, ['contentModules']);
  const works = contentModules.map((module) => {
    const {
      types,
      tags,
      ...rest
    } = getDocumentFields(module, ['title', 'description', 'types', 'tags', 'mainImage', 'backgroundImage', 'slug']);

    return {
      types: types ? types.map((type) => getDocumentFields(type, ['slug', 'displayName'])) : [],
      tags: tags ? tags.map((tag) => getDocumentFields(tag, ['slug', 'displayName'])) : [],
      ...rest,
    };
  });

  const link = useMemo(() => getDocumentFields(linkCTA), [linkCTA]);

  const breadcrumbs = pagesBreadcrumbs.portfolio();
  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/works`,
  };

  const openFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(true), []);
  const closeFullscreenEstimation = useCallback(() => setIsFullscreenEstimation(false), []);

  return (
    <Fragment>
      <MetaTags
        page={PAGES.portfolio}
        breadcrumbs={breadcrumbs}
        pageMetadata={pageMetadata}
      />
      <FullLayout introSection={introSection}>
        <PageHeader
          title={ROUTES.portfolio.title}
          breadcrumbs={breadcrumbs}
        />
        <Animated
          type={ANIMATED_TYPE.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={250}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </Animated>
        <Portfolio works={works} />
        <CallToAction
          type="page"
          title={link.title}
          buttonTitle={link.buttonTitle}
          handleOnClick={openFullscreenEstimation}
          className={styles.callToAction}
        />
      </FullLayout>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimation}
        closeFullscreenEstimation={closeFullscreenEstimation}
      />
    </Fragment>
  );
};

PortfolioContainer.defaultProps = {
  portfolioProjects: {},
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  portfolioProjects: PropTypes.instanceOf(Object),
  metaData: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    ogImage: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  linkCTA: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({
    portfolioProjects: selectPortfolioProjectsPreview(state),
    metaData: selectMetaData(state),
    title: selectTitle(state),
    subtitle: selectSubtitle(state),
    linkCTA: selectCTA(state),
  }),
)(PortfolioContainer);
