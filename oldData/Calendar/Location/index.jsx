import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { formatDate } from 'utils/helper';
import styles from './styles.module.scss';

export const Location = ({
  beginningDate,
  expirationDate,
  location,
  eventTitle,
  eventColor,
  animationDelay,
}) => {
  const [isShow, setShow] = useState(false);
  const dataRef = useRef(null);
  const startDate = formatDate(beginningDate);
  const finishDate = formatDate(expirationDate);

  useEffect(() => {
    if (isShow && dataRef.current) {
      dataRef.current.classList.add(styles.showUnderline);
      dataRef.current.children[0].style.transition = `transform 1.2s ${(0.7 + animationDelay * 0.15)}s cubic-bezier(.17,.67,.57,.96)`;
    } else if (!isShow && dataRef.current) {
      dataRef.current.classList.remove(styles.showUnderline);
      dataRef.current.children[0].style.transition = 'transform 0s 0s';
    }
  }, [animationDelay, isShow]);

  useEffect(() => {
    const handleOnScroll = () => {
      if (dataRef.current) {
        if (dataRef.current.getBoundingClientRect().top < window.innerHeight) setShow(true);
        else setShow(false);
      }
    };

    handleOnScroll();
    document.addEventListener('scroll', handleOnScroll);

    return () => document.removeEventListener('scroll', handleOnScroll);
  }, [dataRef]);

  return (
    <div className={styles.location}>
      <Animated
        type={ANIMATED_TYPE.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={100 + 100 * animationDelay}
      >
        <div
          ref={dataRef}
          className={styles.date}
        >
          <span />
          {startDate === finishDate ? startDate : `${startDate} - ${finishDate}`}
        </div>
        <span className={styles.locationTitle}>
          {location}
        </span>
        {eventTitle && (
          <div
            className={styles.eventTitle}
            style={{ backgroundColor: `${eventColor}` }}
          >
            {eventTitle}
          </div>
        )}
      </Animated>
    </div>
  );
};

Location.defaultProps = {
  beginningDate: new Date(),
  expirationDate: new Date(),
  location: '',
  eventTitle: '',
  eventColor: '#e85928',
};

Location.propTypes = {
  beginningDate: PropTypes.instanceOf(Date),
  expirationDate: PropTypes.instanceOf(Date),
  location: PropTypes.string,
  eventTitle: PropTypes.string,
  eventColor: PropTypes.string,
  animationDelay: PropTypes.number.isRequired,
};
