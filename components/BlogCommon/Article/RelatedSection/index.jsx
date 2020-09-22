import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, Loader } from 'components';
import { Article } from './Article';
import styles from './styles.module.scss';

const RelatedSection = ({ articles, isLoading }) => (
  <Loader isLoading={!isLoading}>
    <div className={styles.related}>
      <div className={styles.heading}>
        <h3>Related Posts</h3>
        <LinkWrapper isLocalLink path="/blog">
          See all posts
          <span>→</span>
        </LinkWrapper>
      </div>
      <div className={styles.articlesList}>
        {articles && articles.map((item) => (
          <Article {...item} key={item.title} />
        ))}
      </div>
    </div>
  </Loader>
);

RelatedSection.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RelatedSection;
