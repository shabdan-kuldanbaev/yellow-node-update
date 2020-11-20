import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper, Animated } from 'components';
import { animatedType } from 'utils/constants';
import TestPhoto from './images/bitmap@3x.jpg';
import styles from './styles.module.scss';

export const CompanyContacts = ({ photo }) => {
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
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={100}
        >
          <span className={styles.addressTitle}>CONTACT US</span>
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={150}
        >
          <div className={styles.locationAddress}>
            <span>Nemiga 5, Minsk, Belarus</span>
            <span>220030</span>
          </div>
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={200}
        >
          <span className={styles.addressTitle}>PHONES</span>
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={250}
        >
          <div className={styles.phoneNumber}>
            <LinkWrapper path="tel:+1 415 670 9070" isLocalLink>
              +1 415 670 9070
            </LinkWrapper>
            <LinkWrapper path="tel:+375 44 584 02 08" isLocalLink>
              +375 44 584 02 08
            </LinkWrapper>
          </div>
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={300}
        >
          <span className={styles.addressTitle}>EMAIL</span>
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={350}
        >
          <div className={styles.email}>
            <LinkWrapper path="mailto:hi@yellow.systems" isLocalLink>
              hi@yellow.systems
            </LinkWrapper>
          </div>
        </Animated>
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
