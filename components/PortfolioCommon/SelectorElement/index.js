import cn from 'classnames';
import PropTypes from 'prop-types';
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
    className={cn(
      styles.selectorElement,
      styles[type],
      { [styles.selected]: selected },
      className,
    )}
  >
    {displayName}
  </button>
);

SelectorElement.propTypes = {
  displayName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectorElement;
