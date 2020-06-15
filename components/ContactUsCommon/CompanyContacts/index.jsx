import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import TestPhoto from './images/bitmap@3x.png';
import styles from './styles.module.scss';

export const CompanyContacts = ({ photo }) => {
  const imgContainer = useRef(null);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (isShow) imgContainer.current && imgContainer.current.classList.add(styles.removeWhiteCover);
    else imgContainer.current && imgContainer.current.classList.remove(styles.removeWhiteCover);
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
  }, [imgContainer]);

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
        <span className={styles.addressTitle}>CONTACT US</span>
        <span className={styles.locationAddress}>Nemiga 5, Minsk, Belarus 220030</span>
        <span className={styles.addressTitle}>PHONES</span>
        <span className={styles.phoneNumber}>
          <LinkWrapper path="tel:+1 415 670 9070" isLocalLink>
            +1 415 670 9070
          </LinkWrapper>
        </span>
        <span className={styles.phoneNumber}>
          <LinkWrapper path="tel:+375 44 584 02 08" isLocalLink>
            +375 44 584 02 08
          </LinkWrapper>
        </span>
        <span className={styles.addressTitle}>EMAIL</span>
        <span className={styles.email}>
          <LinkWrapper path="mailto:hi@yellow.systems" isLocalLink>
            hi@yellow.systems
          </LinkWrapper>
        </span>
      </address>
    </section>
  );
};
CompanyContacts.defaultProps = {
  photo: TestPhoto,
};

CompanyContacts.propTypes = {
  photo: PropTypes.string,
};
