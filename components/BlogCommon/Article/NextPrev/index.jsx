import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  LinkWrapper,
  Loader,
  ImageWithPlaceholder,
} from 'components';
import styles from './styles.module.scss';

const NextPrev = ({
  article,
  isNewer,
  isLoading,
}) => {
  const preview = get(article, 'fields.previewImageUrl.fields.file.url', '');
  const slug = get(article, 'fields.slug', '');
  const title = get(article, 'fields.title', '');

  return (article ? (
    <Loader isLoading={!isLoading}>
      <div className={isNewer ? styles.newer : styles.older}>
        <Fragment>
          <LinkWrapper
            isLocalLink
            dynamicRouting="/blog/[article]"
            path={`/blog/${slug}`}
          >
            <div className={styles.imgContainer}>
              <ImageWithPlaceholder src={preview} imageStyle={styles.img} />
            </div>
          </LinkWrapper>
          <div className={styles.content}>
            <small>{isNewer ? 'NEWER POST' : 'OLDER POST'}</small>
            <h3 className={styles.title}>
              <a>{title}</a>
            </h3>
          </div>
        </Fragment>
      </div>
    </Loader>
  ) : null
  );
};

NextPrev.defaultProps = {
  isNewer: false,
};

NextPrev.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  isNewer: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

export default NextPrev;
