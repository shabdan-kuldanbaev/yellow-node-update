import cn from 'classnames';
import { CONTACT_CASH_KEY, useContactMutation } from 'redux/apis/dataSending';
import styles from '../styles.module.scss';

export default () => {
  const [contact, { data: { sent } = {} }] = useContactMutation({ fixedCacheKey: CONTACT_CASH_KEY });

  const handleClose = () => contact({ isSent: false });

  const className = cn(
    styles.formAlert,
    { [styles.isVisible]: sent },
  );

  return {
    handleClose,
    className,
  };
};
