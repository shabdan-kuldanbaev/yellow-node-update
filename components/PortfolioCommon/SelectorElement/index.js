import React from 'react';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import styles from './styles.module.scss';
import { animatedProps } from './utils';

const SelectorElement = ({
  displayName,
  type,
  onClick,
  selected,
  className,
}) => (
  <Animated
    {...animatedProps}
    transitionDelay={250}
  >
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.selectorElement, styles[type], { [styles.selected]: selected }, className)}
    >
      {displayName}
    </button>
  </Animated>
);

export default SelectorElement;
