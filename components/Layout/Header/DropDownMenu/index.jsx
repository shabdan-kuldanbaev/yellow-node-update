import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { SUB_NAVIGATION_LINKS } from 'utils/constants';
import styles from './styles.module.scss';

export const DropDownMenu = ({
  isDropMenuOpened,
  isPageScrolling,
  slug,
  closeMobileMenu,
}) => {
  const subNavigationLinks = SUB_NAVIGATION_LINKS[slug];

  if (!subNavigationLinks) {
    return null;
  }

  return (
    <div className={cn(styles.dropDownMenu, {
      [styles.pageScrolling]: isPageScrolling,
      [styles.closed]: !isDropMenuOpened,
    })}
    >
      <div className={styles.dropDownNavContainer}>
        {subNavigationLinks.map(({ title, items }) => (
          <div className={styles.itemContainer}>
            <h3 className={styles.title}>
              {title}
            </h3>
            {items.map(({ slug: itemSlug, title: itemTitle }) => (
              <LinkWrapper
                isLocalLink
                path={itemSlug}
              >
                <span
                  onClick={closeMobileMenu}
                  role="button"
                  tabIndex="0"
                >
                  {itemTitle}
                </span>
              </LinkWrapper>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

DropDownMenu.defaultProps = {
  closeMobileMenu: () => {},
};

DropDownMenu.propTypes = {
  isDropMenuOpened: PropTypes.bool.isRequired,
  isPageScrolling: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  closeMobileMenu: PropTypes.func,
};
