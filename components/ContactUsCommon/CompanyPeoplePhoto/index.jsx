import {
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CompanyPeoplePhoto = ({ photo }) => {
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

  return photo && (
    <section className={cn(styles.companyPeoplePhoto, { [styles.showPhoto]: isShow })}>
      <div className={styles.photoContainer}>
        <div className={styles.photoWrap}>
          <Animated
            type={ANIMATED_TYPE.isCustom}
            translateY="70px"
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={0}
          >
            <Illustration
              layout="responsive"
              width="100%"
              height="100%"
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

CompanyPeoplePhoto.propTypes = {
  photo: PropTypes.string.isRequired,
};

export default CompanyPeoplePhoto;
