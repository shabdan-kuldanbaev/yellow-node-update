import React,
{
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

const Dropdown = ({
  className,
  options,
  selected,
  setSelected,
  placeholder = 'Choose one',
}) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) return setIsActive(false);
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.dropdown, className)}
      onClick={() => setIsActive(!isActive)}
    >
      <div className={
        cn(styles.dropdownBtn, {
          [styles.isSelected]: !!selected,
        })
      }
      >
        {selected || placeholder}
        <span className={styles.triangle} />
      </div>
      <div className={
        cn(styles.dropdownContent, {
          [styles.isActive]: isActive,
        })
      }
      >
        {options?.map((option, index) => (
          <div
            key={`${option}-${index}`}
            className={styles.dropdownItem}
            onClick={() => {
              setSelected(option);
              setIsActive(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Dropdown;
