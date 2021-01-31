import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Animated } from 'components';
import {
  getDocumentFields,
  getOptimizedImage,
  getFileUrl,
} from 'utils/helper';
import { FieldsWrapper } from './FieldsWrapper';
import { animatedFields } from './utils';
import styles from './styles.module.scss';

export const CompanyContacts = ({ photo, animatedFields }) => {
  const imgContainer = useRef(null);
  const [isShow, setShow] = useState(false);
  const { image } = getDocumentFields(photo[0], ['image']);
  const photoUrl = getFileUrl(image);

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
        <LazyLoadImage
          src={getOptimizedImage(photoUrl, 465)}
          alt="CompanyOfficePhoto"
          effect="blur"
        />
      </div>
      <address className={styles.address}>
        {animatedFields && animatedFields.map((animated) => (
          <Animated {...animated}>
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
  photo: PropTypes.instanceOf(Array).isRequired,
  animatedFields: PropTypes.instanceOf(Array),
};
