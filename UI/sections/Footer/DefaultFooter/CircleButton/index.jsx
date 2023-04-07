import cn from 'classnames';
import styles from './styles.module.scss';

const CircleButton = ({ className, children, onClick }) => (
  <button
    type="button"
    className={cn(className, styles.button)}
    onClick={onClick}
  >
    {children}
  </button>
);

export default CircleButton;
