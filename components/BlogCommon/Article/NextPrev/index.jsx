import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { LinkWrapper, Loader } from 'components';
import styles from './styles.module.scss';

const NextPrev = ({
  article,
  isNewer,
  isLoading,
}) => (
  <Fragment>
    {article && (
      <Loader isLoading={!isLoading}>
        <div className={isNewer ? styles.newer : styles.older}>
          <LinkWrapper
            isLocalLink
            dynamicRouting="/blog/[article]"
            path={`/blog/${article.slug}`}
          >
            <div className={styles.imgContainer}>
              <div className={styles.img} style={{ backgroundImage: `url(${article.image})` }} />
            </div>
          </LinkWrapper>
          <div className={styles.content}>
            <small>{isNewer ? 'NEWER POST' : 'OLDER POST'}</small>
            <h3 className={styles.title}>
              <a>{article.title}</a>
            </h3>
          </div>
        </div>
      </Loader>
    )}
  </Fragment>
);

NextPrev.defaultProps = {
  isNewer: false,
};

NextPrev.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  isNewer: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

export default NextPrev;
