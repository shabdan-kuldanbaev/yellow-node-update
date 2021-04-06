import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectFoundArticles, selectSearchMessage } from 'redux/selectors/blog';
import { ArticlesList } from 'components';
import styles from './styles.module.scss';

const SearchResult = ({ foundArticles, searchMessage }) => (foundArticles.length
  ? (
    <ArticlesList
      articles={foundArticles}
      isLoading={false}
      page={2}
      isSearch
    />
  ) : (
    <span className={styles.nothingFound}>
      {searchMessage}
    </span>
  )
);

SearchResult.defaultProps = {
  foundArticles: [],
};

SearchResult.propTypes = {
  foundArticles: PropTypes.instanceOf(Array),
  searchMessage: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    foundArticles: selectFoundArticles(state),
    searchMessage: selectSearchMessage(state),
  }),
)(SearchResult);
