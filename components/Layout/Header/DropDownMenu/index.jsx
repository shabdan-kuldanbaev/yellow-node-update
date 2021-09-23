import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { SUB_NAVIGATION_LINKS } from 'utils/constants';
import styles from './styles.module.scss';

export const DropDownMenu = ({
  isDropMenuOpened,
  isPageScrolledDown,
  slug,
  closeMobileMenu,
  closeDropDownMenu,
}) => {
  const subNavigationLinks = SUB_NAVIGATION_LINKS[slug];

  const handleOnClick = (subMenuSlug) => () => {
    if (subMenuSlug) {
      closeMobileMenu();
      closeDropDownMenu();
    }
  };

  if (!subNavigationLinks) {
    return null;
  }

  return (
    <div className={cn(styles.dropDownMenu, {
      [styles.pageScrolling]: isPageScrolledDown,
      [styles.closed]: !isDropMenuOpened,
    })}
    >
      <div className={styles.dropDownNavContainer}>
        {subNavigationLinks.map(({
          title,
          subtitle,
          slug: subMenuSlug,
          items,
        }) => {
          const subMenuItem = (
            <div
              className={styles.itemContainer}
              onClick={handleOnClick(subMenuSlug)}
              role="button"
              tabIndex="0"
            >
              <h3 className={styles.title}>
                {title}
              </h3>
              {subtitle && (
                <span className={styles.subtitle}>
                  {subtitle}
                </span>
              )}
              {items && items.map(({ slug: itemSlug, title: itemTitle }) => (
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
          );

          return subMenuSlug
            ? (
              <LinkWrapper
                isLocalLink
                path={subMenuSlug}
              >
                {subMenuItem}
              </LinkWrapper>
            )
            : subMenuItem;
        })}
      </div>
    </div>
  );
};

DropDownMenu.defaultProps = {
  closeMobileMenu: () => {},
  closeDropDownMenu: () => {},
};

DropDownMenu.propTypes = {
  isDropMenuOpened: PropTypes.bool.isRequired,
  isPageScrolledDown: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  closeMobileMenu: PropTypes.func,
  closeDropDownMenu: PropTypes.func,
};
