import React from 'react';
import cn from 'classnames';
import { useSelector } from './useSelector';
import styles from './styles.module.scss';

const Selector = (props) => {
  const {
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  } = useSelector(props);

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
