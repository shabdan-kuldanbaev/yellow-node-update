import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LinkWrapper, Animated } from 'components';
import { getOptimizedImage, getFileUrl } from 'utils/helper';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const CompanyContacts = ({
  photo,
  animatedFields,
}) => {
  const imgContainer = useRef(null);
  const [isShow, setShow] = useState(false);
  const photoUrl = getFileUrl(photo);

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
            googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
          >
            +1 415 670 9070
          </LinkWrapper>
          <LinkWrapper
            path="tel:+375 44 584 02 08"
            isLocalLink
            googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
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
            googleAnalyticProps={{ action: 'Click', data: 'Email' }}
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
        <LazyLoadImage src={getOptimizedImage(photoUrl, 465)} alt="CompanyOfficePhoto" effect="blur" />
        {/* <img
          src={getOptimizedImage(photoUrl, 465)}
          alt="CompanyPeoplePhoto"
        /> */}
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
  animatedFields,
};

CompanyContacts.propTypes = {
  photo: PropTypes.string.isRequired,
  animatedFields: PropTypes.instanceOf(Array),
};
