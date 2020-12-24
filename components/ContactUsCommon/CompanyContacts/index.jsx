import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { LinkWrapper, Animated } from 'components';
import TestPhoto from './images/bitmap@3x.jpg';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const CompanyContacts = ({ photo, animatedFields }) => {
  const imgContainer = useRef(null);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (imgContainer.current) {
      if (isShow) imgContainer.current.classList.add(styles.removeWhiteCover);
      else imgContainer.current.classList.remove(styles.removeWhiteCover);
    }
  }, [isShow]);

  useEffect(() => {
    const handleOnScroll = () => {
      if (imgContainer.current) {
        if (imgContainer.current.getBoundingClientRect().top < window.innerHeight) setShow(true);
        else setShow(false);
      }
    };

    handleOnScroll();
    document.addEventListener('scroll', handleOnScroll);

    return () => document.removeEventListener('scroll', handleOnScroll);
  }, []);

  const trackContacts = ({ target }) => {
    const type = target.getAttribute('data-target');
    ReactGA.event({
      category: type,
      action: 'Click',
      label: type,
    });
  };

  const renderSwitch = ({ field }) => {
    switch (field) {
    case 'contact':
      return <span className={styles.addressTitle}>CONTACT US</span>;
    case 'locationAdress':
      return (
        <div className={styles.locationAddress}>
          <span>Nemiga 5, Minsk, Belarus</span>
          <span>220030</span>
        </div>
      );
    case 'phones':
      return <span className={styles.addressTitle}>PHONES</span>;
    case 'phoneNumber':
      return (
        <div className={styles.phoneNumber}>
          <LinkWrapper
            path="tel:+1 415 670 9070"
            isLocalLink
            additionalProps={{ 'data-target': 'Phone' }}
            handleOnClick={trackContacts}
          >
            +1 415 670 9070
          </LinkWrapper>
          <LinkWrapper
            path="tel:+375 44 584 02 08"
            isLocalLink
            additionalProps={{ 'data-target': 'Phone' }}
            handleOnClick={trackContacts}
          >
            +375 44 584 02 08
          </LinkWrapper>
        </div>
      );
    case 'emailTitle':
      return <span className={styles.addressTitle}>EMAIL</span>;
    case 'email':
      return (
        <div className={styles.email}>
          <LinkWrapper
            path="mailto:hi@yellow.systems"
            isLocalLink
            additionalProps={{ 'data-target': 'Email' }}
            handleOnClick={trackContacts}
          >
            hi@yellow.systems
          </LinkWrapper>
        </div>
      );
    default: null;
    }
  };

  return (
    <section className={styles.companyContacts}>
      <div ref={imgContainer} className={styles.imgContainer}>
        <div className={styles.whiteCover} />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="CompanyPeoplePhoto"
          style={{ backgroundImage: `url(${photo})` }}
        />
      </div>
      <address className={styles.address}>
        {animatedFields && animatedFields.map((animated) => (
          <Animated {...animated}>
            {renderSwitch(animated)}
          </Animated>
        ))}
      </address>
    </section>
  );
};

CompanyContacts.defaultProps = {
  photo: TestPhoto,
  animatedFields,
};

CompanyContacts.propTypes = {
  photo: PropTypes.string,
  animatedFields: PropTypes.instanceOf(Array),
};
