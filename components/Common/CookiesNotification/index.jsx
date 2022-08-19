import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ButtonMore from 'components/Common/ButtonMore';
import LinkWrapper from 'components/Common/LinkWrapper';
import useStorage from 'hooks/useStorage';
import { PAGES } from 'utils/constants';
import { notificationData } from './utils/data';
import styles from './styles.module.scss';

const CookiesNotification = ({ text }) => {
  const [storage, setStorage] = useState(null);
  const [isHidden, setHidden] = useStorage({
    storage,
    key: 'isCookiesNotificationHidden',
    defaultValue: false,
  });
  const [isScrolled, setScrolled] = useState(false);

  const handlerOnClose = () => setHidden(true);

  useEffect(() => {
    setStorage(window.localStorage);

    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop < 200) {
        return;
      }

      setScrolled(true);
      window.removeEventListener('scroll');
    });

    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  if (isHidden === null) {
    return null;
  }

  return !isHidden && (
    <div className={cn(styles.cookiesNotification, {
      [styles.hide]: isHidden,
      [styles.notScrolled]: !isScrolled,
    })}
    >
      <p>
        {text}
        <LinkWrapper
          path={PAGES.cookiesPolicy}
          className={styles.link}
        >
          Cookies Policy
        </LinkWrapper>
      </p>
      <ButtonMore
        handleOnClick={handlerOnClose}
        title="Accept"
        buttonStyle={styles.button}
      />
    </div>
  );
};

CookiesNotification.defaultProps = {
  text: notificationData.text,
};

CookiesNotification.propTypes = {
  text: PropTypes.string,
};

export default React.memo(CookiesNotification);
