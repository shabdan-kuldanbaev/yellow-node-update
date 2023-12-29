import cn from 'classnames';
import { CONTACT_CASH_KEY, useSendContactFormMutation } from 'redux/apis/dataSending';
import styles from '../styles.module.scss';

export default () => {
  const [sendForm, { data: { sent } = {} }] = useSendContactFormMutation({ fixedCacheKey: CONTACT_CASH_KEY });

  const handleClose = () => sendForm({ isSent: false });

  const className = cn(
    styles.formAlert,
    { [styles.isVisible]: sent },
  );

  return {
    handleClose,
    className,
  };
};
