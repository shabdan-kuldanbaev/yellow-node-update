import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  LinkWrapper,
  Loader,
  ImageWithPlaceholder,
} from 'components';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { routes } from 'utils/constants';
import styles from './styles.module.scss';

const NextPrev = ({
  article,
  isNewer,
  isLoading,
}) => {
  const { previewImageUrl, slug, title } = getDocumentFields(
    article,
    ['slug', 'title', 'previewImageUrl'],
  );
  const previewImage = getFileUrl(previewImageUrl);
  const linkProps = {
    isLocalLink: true,
    dynamicRouting: '/blog/[article]',
    path: routes.article(slug),
  };

  return ((slug && title) ? (
    <Loader isLoading={!isLoading}>
      <div className={isNewer ? styles.newer : styles.older}>
        <Fragment>
          <LinkWrapper {...linkProps}>
            <div className={styles.imgContainer}>
              <ImageWithPlaceholder src={previewImage} imageStyle={styles.img} />
            </div>
          </LinkWrapper>
          <div className={styles.content}>
            <small>{isNewer ? 'NEWER POST' : 'OLDER POST'}</small>
            <h3 className={styles.title}>
              <LinkWrapper {...linkProps}>
                {title}
              </LinkWrapper>
            </h3>
          </div>
        </Fragment>
      </div>
    </Loader>
  ) : null);
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
