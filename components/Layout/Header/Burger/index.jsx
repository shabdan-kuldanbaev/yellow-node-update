import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Burger = ({
  isMobileMenuOpened,
  handleOnClick,
  isAdditional,
}) => (
    <div
      onClick={handleOnClick}
      className={cn(styles.burger, {
        [styles.burgerOpened]: isMobileMenuOpened,
        [styles.burgerClosed]: !isMobileMenuOpened,
        [styles.additionalBurger]: isAdditional,
      })}
    >
      <hr />
      <hr />
    </div>
  );

Burger.propTypes = {
  isMobileMenuOpened: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default Burger;
