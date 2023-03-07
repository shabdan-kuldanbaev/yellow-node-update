import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { formSuccessDismissed } from 'redux/reducers/contact';
import { selectIsFormDataSent } from 'redux/selectors/contact';
import styles from '../styles.module.scss';

export default () => {
  const isDataSubmited = useSelector(selectIsFormDataSent);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(formSuccessDismissed());

  const className = cn(
    styles.formAlert,
    { [styles.isVisible]: isDataSubmited },
  );

  return {
    handleClose,
    className,
  };
};
