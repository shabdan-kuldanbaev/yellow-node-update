import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const Selector = ({ displayNames, selectedIndex, onSelectedIndexChange }) => {
  const handleSelectedIndexChange = (i) => () => onSelectedIndexChange(i);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.selector}>
        {displayNames.map((name, i) => (
          <li
            key={name}
            className={cn(styles.item, { [styles.selected]: i === selectedIndex })}
            onClick={handleSelectedIndexChange(i)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
