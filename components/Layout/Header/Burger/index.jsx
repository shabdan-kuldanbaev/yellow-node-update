import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { PAGES_WITH_DARK_HEADER } from 'utils/constants';
import styles from './styles.module.scss';

const Burger = ({
  isMobileMenuOpened,
  handleOnClick,
  isPageScrolledDown,
}) => {
  const { asPath } = useRouter();

  return (
    <div
      className={
        cn(styles.burger, {
          [styles.burgerOpened]: isMobileMenuOpened,
          [styles.burgerClosed]: !isMobileMenuOpened,
          [styles.pageScrollingBurger]: isPageScrolledDown || (!isMobileMenuOpened && !PAGES_WITH_DARK_HEADER.includes(asPath)),
          [styles.pageScrollingBurgerOpened]: isPageScrolledDown && isMobileMenuOpened,
        })
      }
      onClick={handleOnClick}
      role="button"
      tabIndex="0"
    >
      <div>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

Burger.propTypes = {
  isMobileMenuOpened: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  isPageScrolledDown: PropTypes.bool.isRequired,
};

export default Burger;
