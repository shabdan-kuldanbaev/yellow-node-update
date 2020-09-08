import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle, Animated } from 'components';
import { animatedType } from 'utils/constants';
import TestPhoto from './images/bitmap@3x.png';
import styles from './styles.module.scss';

export const CompanyPeoplePhoto = ({ photo }) => {
  const photoRef = useRef();
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    const handlerOnScroll = () => {
      photoRef.current
        && photoRef.current.getBoundingClientRect().top < window.innerHeight
        && setShow(true);
    };

    handlerOnScroll();
    window.addEventListener('scroll', handlerOnScroll);
    return () => window.removeEventListener('scroll', handlerOnScroll);
  }, []);

  return (
    <section className={cn(styles.companyPeoplePhoto, { [styles.showPhoto]: isShow })}>
      <SectionTitle
        title="And come to work with us side by side"
        subtitle="We’re always happy to see you here"
        styleSubtitle={styles.subtitle}
      />
      <div className={styles.photoContainer}>
        <div className={styles.photoWrap}>
          <Animated
            type={animatedType.isCustom}
            translateY="70px"
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={0}
          >
            <img
              ref={photoRef}
              src={photo}
              alt="CompanyPeoplePhoto"
            />
          </Animated>
        </div>
      </div>
    </section>
  );
};

CompanyPeoplePhoto.defaultProps = {
  photo: TestPhoto,
};

CompanyPeoplePhoto.propTypes = {
  photo: PropTypes.string,
};
