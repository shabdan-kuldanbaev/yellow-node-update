import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

const NextPrev = ({ article, isNewer }) => (
  <div className={isNewer ? styles.newer : styles.older}>
    <LinkWrapper
      isLocalLink
      dynamicRouting="/blog/[article]"
      path={`/blog/${article.slug}`}
    >
      <div className={styles.imgContainer}>
        <div className={styles.img} style={{ backgroundImage: `url(${get(article, 'header.image', '')})` }} />
      </div>
    </LinkWrapper>
    <div className={styles.content}>
      <small>{isNewer ? 'NEWER POST' : 'OLDER POST'}</small>
      <h3 className={styles.title}>
        <a>{get(article, 'header.title', '')}</a>
      </h3>
    </div>
  </div>
);

NextPrev.defaultProps = {
  isNewer: false,
};

NextPrev.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  isNewer: PropTypes.bool,
};

export default NextPrev;
