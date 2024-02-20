import cn from 'classnames';
import PropTypes from 'prop-types';
import { useTag } from './utils/useTag';
import styles from './styles.module.scss';

const Tag = (props) => {
  const {
    type,
    onClick,
    selected,
    disabled,
    className,
    displayName,
    isSecondary,
    isPrimary,
  } = useTag(props);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        styles.selectorElement,
        styles[type],
        {
          [styles.selected]: selected,
          [styles.primary]: isPrimary,
          [styles.secondary]: isSecondary,
        },
        className,
      )}
    >
      {displayName}
    </button>
  );
};

Tag.propTypes = {
  displayName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isSecondary: PropTypes.bool,
};

export default Tag;
