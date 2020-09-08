import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const Burger = ({
  isMobileMenuOpened,
  handleOnClick,
  isAdditional,
}) => {
  const { asPath } = useRouter();

  return (
    <div
      className={
        cn(styles.burger, {
          [styles.burgerOpened]: isMobileMenuOpened,
          [styles.burgerClosed]: !isMobileMenuOpened,
          [styles.additionalBurger]: isAdditional || (!isMobileMenuOpened && asPath.length > 2),
        })
      }
      onClick={handleOnClick}
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
  isAdditional: PropTypes.bool.isRequired,
};

export default Burger;
