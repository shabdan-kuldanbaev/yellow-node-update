import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const SelectorElement = ({
  displayName,
  type,
  onClick,
  selected,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(styles.selectorElement, styles[type], { [styles.selected]: selected }, className)}
  >
    {displayName}
  </button>

);

export default SelectorElement;
