import React, { useRef, useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { notificationData } from './utils/data';
import { ButtonMore } from 'components';

const CookiesNotification = ({ text }) => {
  const [isShown, setIsShown] = useState(false);

  const handlerOnClose = () => {
    setIsShown(false);
  };

  return (
    <div className={cn(styles.cookiesNotification, {[styles.hide]: !isShown })}>
      <p>{text}</p>
      <ButtonMore
        handleOnClick={handlerOnClose}
        href="/"
        title="ACCEPT COOKIES"
        buttonStyle={styles.button}
      />
      <div className={styles.cross} onClick={handlerOnClose}>
        <hr />
        <hr />
      </div>
    </div>
  );
};

CookiesNotification.defaultProps = {
  text: notificationData.text,
}

CookiesNotification.propTypes = {
  text: PropTypes.string,
};

export default CookiesNotification;
