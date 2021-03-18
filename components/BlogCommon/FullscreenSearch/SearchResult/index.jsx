import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectFoundArticles, selectSearchMessage } from 'redux/selectors/blog';
import { ArticlesList } from 'components';
import styles from './styles.module.scss';

const SearchResult = ({ foundArticles, searchMessage }) => (
  <Fragment>
    {foundArticles && foundArticles.length
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
      )}
  </Fragment>
);

SearchResult.propTypes = {
  foundArticles: PropTypes.instanceOf(Array).isRequired,
  searchMessage: PropTypes.string.isRequired,
};

export default connect((state) => ({
  foundArticles: selectFoundArticles(state),
  searchMessage: selectSearchMessage(state),
}))(SearchResult);
