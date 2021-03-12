import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectFoundArticles } from 'redux/selectors/blog';
import { ArticlesList } from 'components';
import styles from './styles.module.scss';

const SearchResult = ({ foundArticles, isMessageHidden }) => (
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
        <span className={cn(styles.nothingFound, {
          [styles.hidden]: isMessageHidden,
        })}
        >
          Nothing Found. Please try again with some different keywords.
        </span>
      )}
  </Fragment>
);

SearchResult.propTypes = {
  foundArticles: PropTypes.instanceOf(Array).isRequired,
  isMessageHidden: PropTypes.bool.isRequired,
};

export default connect((state) => ({ foundArticles: selectFoundArticles(state) }))(SearchResult);
