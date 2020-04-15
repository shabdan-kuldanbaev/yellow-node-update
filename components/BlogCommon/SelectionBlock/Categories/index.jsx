import React from 'react';
import styles from './styles.module.scss';
import { LinkWrapper } from 'components';
import CloseIcon from './images/close.svg';
import cn from 'classnames';
import { useOverflowForBody } from 'hooks';

const Categories = ({
  tags,
  urlPath,
  isMobileCategoties,
  closeMobileCategoties,
}) => {
  useOverflowForBody(isMobileCategoties);

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

export default Categories;
