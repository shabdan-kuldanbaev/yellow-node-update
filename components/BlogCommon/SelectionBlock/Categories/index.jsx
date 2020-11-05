import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper, Animated } from 'components';
import { animatedType } from 'utils/constants';
import { setOverflowForBody } from 'utils/helper';
import CloseIcon from './images/close.svg';
import styles from './styles.module.scss';

const Categories = ({
  tags,
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
        {tags && Object.entries(tags).map(([key, value], index) => (

          <li className={cn({ [styles.selectedBlock]: urlPath.includes(value.dynamicRouting) })}>
            <LinkWrapper
              isLocalLink
              dynamicRouting={`/blog?category=${value.dynamicRouting}&page=1`}
              path={`/blog?category=${value.dynamicRouting}&page=1`}
              // TODO dynamicRouting={`/blog?category=${tag.dynamicRouting}&page=1&limit=11`}
              // TODO path={`/blog?category=${tag.dynamicRouting}&page=1&limit=11`}
            >
              {value.name}
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
  tags: PropTypes.instanceOf(Array).isRequired,
  urlPath: PropTypes.string.isRequired,
  isMobileCategoties: PropTypes.bool,
  closeMobileCategoties: PropTypes.func.isRequired,
};

export default Categories;
