import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { LinkWrapper } from 'components';
import { setOverflowForBody, isNumeric } from 'utils/helper';
import { ROUTES, CATEGORY_SLUGS } from 'utils/constants';
import CloseIcon from './images/close.svg';
import styles from './styles.module.scss';


const Categories = ({ isMobileCategoties, closeMobileCategoties }) => {
  const { asPath, query: { slug: currentCategory } } = useRouter();

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
        {ROUTES.blog.categories.map(({ title, slug }, index) => {
          const { root, slug: category } = ROUTES.blog.getPath(slug).dynamicPath;
          const { path } = ROUTES.blog.getPath(slug);
          const dynamicRouting = slug === CATEGORY_SLUGS[0] ? root : category;
          const isSelected = index !== 0
            ? asPath.includes(path)
            : asPath === path || isNumeric(currentCategory);

          return (
            <li
              key={`categoris/${title}`}
              className={cn({ [styles.selectedBlock]: isSelected })}
            >
              <LinkWrapper
                isLocalLink
                path={path}
                dynamicRouting={dynamicRouting}
              >
                {title}
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
  isMobileCategoties: PropTypes.bool,
  closeMobileCategoties: PropTypes.func.isRequired,
};

export default Categories;
