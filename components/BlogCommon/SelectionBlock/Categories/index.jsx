import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components';
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
        {tags && Object.entries(tags).map(([key, value]) => {
          const url = `/blog?category=${value.dynamicRouting}&page=1`;

          return (
            <li className={cn({ [styles.selectedBlock]: urlPath.includes(value.dynamicRouting) })}>
              <LinkWrapper
                isLocalLink
                dynamicRouting={url}
                path={url}
              >
                {value.name}
              </LinkWrapper>
            </li>
          );
        })}
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
