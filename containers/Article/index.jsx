import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { selectArticle, selectIsLoading } from 'redux/selectors/blog';
import { getArticle } from 'redux/actions/blog';
import { Article } from 'components';
import { sortingArray } from 'utils/helper';

const ArticleContainer = ({
  introSection,
  currentArticle,
  isLoading,
  getArticle: getCurrentArticle,
}) => {
  const { query: { article } } = useRouter();
  const sortArticle = cloneDeep(currentArticle);
  const sortBody = (currentArticle && currentArticle.body && sortingArray(currentArticle.body)) || [];
  if (sortBody) sortArticle.body = sortBody;

  useEffect(() => {
    if (article) getCurrentArticle('choosing-the-right-automation-testing-strategy-dos-and-don-ts');
  }, []);

  return (
    <Article
      article={sortArticle}
      introSection={introSection}
      isLoading={isLoading}
    />
  );
};

ArticleContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentArticle: PropTypes.instanceOf(Object).isRequired,
  getArticle: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    currentArticle: selectArticle(state),
    isLoading: selectIsLoading(state),
  }), { getArticle },
)(ArticleContainer);
