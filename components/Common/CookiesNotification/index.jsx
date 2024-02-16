'use client';

import dynamic from 'next/dynamic';
import {
  useEffect,
  useState,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import Button from 'UI/components/Button';
import useStorage from 'hooks/useStorage';
import { PAGES } from 'utils/constants';
import { notificationData } from './utils/data';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

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

    const handleScroll = () => {
      if (document.documentElement.scrollTop < 200) {
        return;
      }

      setScrolled(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      <div className={styles.container}>
        <p>
          {text}
          <LinkWrapper
            path={PAGES.cookiesPolicy}
            className={styles.link}
          >
            Cookies Policy
          </LinkWrapper>
        </p>
        <Button
          onClick={handlerOnClose}
          className={styles.button}
        >
          Accept
        </Button>
        <Svg
          type="xClose"
          handleOnClick={handlerOnClose}
          className={styles.cross}
        />
      </div>
    </div>
  );
};

CookiesNotification.defaultProps = {
  text: notificationData.text,
};

CookiesNotification.propTypes = {
  text: PropTypes.string,
};

export default memo(CookiesNotification);
