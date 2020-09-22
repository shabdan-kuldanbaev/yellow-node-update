import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, sortBy, get } from 'lodash';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { selectArticle, selectIsLoading, selectRelatedArticles } from 'redux/selectors/blog';
import { getArticle, loadRelatedArticles } from 'redux/actions/blog';
import { Article, RelatedSection } from 'components';
import { SocialThumbnails } from '../../components/Common/SocialThumbnails';

const ArticleContainer = ({
  introSection,
  articles: relatedArticles,
  currentArticle,
  isLoading,
  getArticle: getCurrentArticle,
  loadRelatedArticles: loadArticles,
}) => {
  const { query: { article } } = useRouter();
  const sortArticle = cloneDeep(currentArticle);
  const sortBody = (currentArticle && currentArticle.body && sortBy(currentArticle.body, 'orderNumber')) || [];
  if (sortBody) sortArticle.body = sortBody;
  const currentCategory = get(sortArticle, 'header.categoryTag', null);

  useEffect(() => {
    if (article) getCurrentArticle('choosing-the-right-automation-testing-strategy-dos-and-don-ts');
  }, []);

  useEffect(() => {
    if (currentCategory) loadArticles({ category: currentCategory });
  }, [currentCategory]);

  return (
    <>
      <Article
        article={sortArticle}
        introSection={introSection}
        isLoading={isLoading}
      />
      <SocialThumbnails />
      <RelatedSection articles={relatedArticles} isLoading={isLoading} />
    </>
  );
};

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  articles: PropTypes.instanceOf(Array).isRequired,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
  getArticle: PropTypes.func.isRequired,
  loadRelatedArticles: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    articles: selectRelatedArticles(state),
    isLoading: selectIsLoading(state),
  }), { getArticle, loadRelatedArticles },
)(ArticleContainer);
