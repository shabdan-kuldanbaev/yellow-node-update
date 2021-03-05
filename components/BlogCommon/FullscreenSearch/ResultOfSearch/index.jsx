import React, { Fragment } from 'react';
import cn from 'classnames';
import { ArticlesList } from 'components';
import styles from './styles.module.scss';

export const ResultOfSearch = ({ foundArticles, isMessageHidden }) => (
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
