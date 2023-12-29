import classNames from 'classnames';
import ProgressBar from '@ramonak/react-progress-bar';
import styles from './LinearWrapper.module.scss';

function LinearWrapper({ value, className }) {
  return (
    <ProgressBar
      completed={value}
      className={classNames(styles.progress, className)}
    />
  );
}

export default LinearWrapper;
