import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

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
      <hr />
    </div>
  );
}

export default Burger;