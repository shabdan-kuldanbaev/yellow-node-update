import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Animated from 'components/Common/Animated';
import { FieldsWrapper } from './FieldsWrapper';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const CompanyContacts = ({ photo, animatedFields: animatedFieldsList }) => {
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

  return photo && (
    <section className={styles.companyContacts}>
      <div
        ref={imgContainer}
        className={styles.imgContainer}
      >
        <div className={styles.whiteCover} />
        <LazyLoadImage
          src={photo}
          alt="CompanyOfficePhoto"
          effect="blur"
          className={styles.img}
        />
      </div>
      <address className={styles.address}>
        {animatedFieldsList && animatedFieldsList.map((animated) => (
          <Animated
            {...animated}
            key={`fields/${animated.field}`}
          >
            <FieldsWrapper animated={animated} />
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
