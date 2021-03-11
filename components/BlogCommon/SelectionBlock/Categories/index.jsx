import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
import { setOverflowForBody } from 'utils/helper';
import { ROUTES } from 'utils/constants';
import CloseIcon from './images/close.svg';
import styles from './styles.module.scss';

const Categories = ({
  urlPath,
  isMobileCategoties,
  closeMobileCategoties,
}) => {
  useEffect(() => {
    setOverflowForBody(isMobileCategoties);
  }, [isMobileCategoties]);

  return (
    <div className={styles.categories}>
      <div className={styles.categoryTitle}>
        <h1>Category</h1>
        <img
          src={CloseIcon}
          alt="Close"
          onClick={closeMobileCategoties}
        />
      </div>
      <ul>
        {[...ROUTES.blog.categories].map(({ title, slug }) => (
          <li className={cn({ [styles.selectedBlock]: urlPath.includes(slug) })} key={`categoris/${title}`}>
            <LinkWrapper
              isLocalLink
              path={ROUTES.blog.getPath(slug)}
              dynamicRouting={ROUTES.blog.dynamicPath}
            >
              {title}
            </LinkWrapper>
          </li>
        ))}
      </ul>
    </div>
  );
};

Categories.defaultProps = {
  isMobileCategoties: false,
};

Categories.propTypes = {
  urlPath: PropTypes.string.isRequired,
  isMobileCategoties: PropTypes.bool,
  closeMobileCategoties: PropTypes.func.isRequired,
};

export default Categories;
