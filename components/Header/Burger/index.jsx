import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Burger = ({
  isMobileMenuOpened,
  setMobileMenuState,
  isAdditional,
}) => {
  const burgerClassName = cn({
    [`${styles.burger}`]: true,
    [`${styles.burgerOpened}`]: isMobileMenuOpened,
    [`${styles.burgerClosed}`]: !isMobileMenuOpened,
    [`${styles.additionalBurger}`]: isAdditional,
  });

  const handleOnClick = () => {
    setMobileMenuState(!isMobileMenuOpened);
  };

  return (
    <div className={burgerClassName} onClick={handleOnClick}>
      <hr />
      <hr />
    </div>
  );
}

Burger.propTypes = {
  isMobileMenuOpened: PropTypes.bool.isRequired,
  setMobileMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default Burger;