import cn from 'classnames';
import styles from '../styles.module.scss';

export default ({
  setIsFormDataSent,
  isDataSubmitted,
}) => {
  const handleClose = () => setIsFormDataSent(false);

  const className = cn(
    styles.formAlert,
    { [styles.isVisible]: isDataSubmitted },
  );

  return {
    handleClose,
    className,
  };
};
