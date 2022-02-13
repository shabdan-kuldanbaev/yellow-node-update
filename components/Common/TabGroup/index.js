import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const TabGroup = ({
  activeIndex,
  items,
  onChange,
}) => (
  <ul className={styles.buttonGroup}>
    {
      items.map((item, i) => (
        <li
          key={`tabGroup/${item}`}
          className={cn(styles.item, { [styles.activeItem]: i === activeIndex })}
        >
          <button
            type="button"
            className={styles.button}
            onClick={() => onChange(i)}
          >
            {item}
          </button>
        </li>
      ))
    }
  </ul>
);

TabGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TabGroup;
