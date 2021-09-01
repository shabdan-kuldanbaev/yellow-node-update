import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { SUB_ITEMS_NAV } from 'utils/constants';
import styles from './styles.module.scss';

// TODO rewrite this component(use state here or in the nav instead of using it the header)
export const DropDownMenu = ({
  isDropMenuOpened,
  isAdditional,
  slug,
  closeMobileMenu,
}) => {
  if (!SUB_ITEMS_NAV[slug]) {
    return null;
  }

  return (
    <div className={cn(styles.dropDownMenu, {
      [styles.additional]: isAdditional,
      [styles.closed]: !isDropMenuOpened,
    })}
    >
      <div className={styles.dropDownNavContainer}>
        {SUB_ITEMS_NAV[slug].map(({ title, items }) => (
          <div className={styles.itemContainer}>
            <h3 className={styles.title}>
              {title}
            </h3>
            {items.map((item) => (
              <LinkWrapper
                isLocalLink
                path={item.slug}
              >
                <span
                  onClick={closeMobileMenu}
                  role="button"
                  tabIndex="0"
                >
                  {item.itemTitle}
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
  isAdditional: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  closeMobileMenu: PropTypes.func,
};
