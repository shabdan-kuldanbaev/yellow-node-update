import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Burger = ({
  isMenuOpened,
  setMenuState,
  isAdditional,
}) => {
  const burgerClassName = cn({
    [`${styles.burger}`]: true,
    [`${styles.burgerOpened}`]: isMenuOpened,
    [`${styles.burgerClosed}`]: !isMenuOpened,
    [`${styles.additionalBurger}`]: isAdditional,
  });

  return (
    <div className={burgerClassName} onClick={() => setMenuState(!isMenuOpened)}>
      <hr />
      <hr />
    </div>
  );
}

Burger.propTypes = {
  isMenuOpened: PropTypes.bool.isRequired,
  setMenuState: PropTypes.func.isRequired,
  isAdditional: PropTypes.bool.isRequired,
};

export default Burger;