import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, Loader } from 'components';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import { Article } from './Article';
import { Arrow } from './images';
import styles from './styles.module.scss';

const RelatedSection = ({ articles, isLoading }) => (
  <div className={styles.related}>
    <div className={styles.headingContainer}>
      <div className={styles.heading}>
        <h3>Related Posts</h3>
        <LinkWrapper isLocalLink path={ROUTES.blog}>
          See all posts
          <div className={styles.svgContainer}>
            <img src={Arrow} alt="arrow" />
          </div>
        </LinkWrapper>
      </div>
    </div>
    <div className={styles.articlesList}>
      {articles && articles.map((article, index) => {
        const { slug, title, headImageUrl } = getDocumentFields(
          article,
          ['slug', 'title', 'headImageUrl'],
        );
        const image = getFileUrl(headImageUrl);

        return (
          <Article
            key={`related/${index}`}
            slug={slug}
            title={title}
            image={image}
          />
        );
      })}
    </div>
  </div>
);

RelatedSection.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RelatedSection;
