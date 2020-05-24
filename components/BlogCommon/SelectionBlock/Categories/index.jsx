import React, { useEffect } from 'react';
import { LinkWrapper } from 'components';
import cn from 'classnames';
import { setOverflowForBody } from 'utils/helper';
import PropTypes from 'prop-types';
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
        <span>Category</span>
        <img
          src={CloseIcon}
          alt="Close"
          onClick={closeMobileCategoties}
        />
      </div>
      <ul>
        {tags.map((tag) => (
          <li key={tag.name} className={cn({ [styles.selectedBlock]: urlPath.includes(tag.dynamicRouting) })}>
            <LinkWrapper
              isLocalLink
              dynamicRouting={`/blog?category=${tag.dynamicRouting}&page=1`}
              path={`/blog?category=${tag.dynamicRouting}&page=1`}
            >
              {tag.name}
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
