import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const TabGroup = ({
  activeIndex,
  items,
  onChange,
  className,
}) => {
  const handleTabClick = (i) => () => onChange(i);

  return (
    <ul className={cn(styles.buttonGroup, className)}>
      {items.map((item, i) => (
        <li
          key={`tabGroup/${item}`}
          className={cn(styles.item, { [styles.activeItem]: i === activeIndex })}
        >
          <button
            type="button"
            className={styles.button}
            onClick={handleTabClick(i)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

TabGroup.defaultProps = {
  className: '',
};

TabGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TabGroup;
