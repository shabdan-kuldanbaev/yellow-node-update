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
  const tagsArray = Object.entries(tags).map(([key, value]) => value);

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
        {tagsArray && tagsArray.map((tag) => (
          <li key={tag.name} className={cn({ [styles.selectedBlock]: urlPath.includes(tag.dynamicRouting) })}>
            <LinkWrapper
              isLocalLink
              dynamicRouting={`/blog?category=${tag.dynamicRouting}&page=1`}
              path={`/blog?category=${tag.dynamicRouting}&page=1`}
              // TODO dynamicRouting={`/blog?category=${tag.dynamicRouting}&page=1&limit=11`}
              // TODO path={`/blog?category=${tag.dynamicRouting}&page=1&limit=11`}
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
