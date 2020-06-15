import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/helper';
import styled from 'styled-components';
import styles from './styles.module.scss';

export const Location = ({
  beginningDate,
  expirationDate,
  location,
  eventTitle,
  eventColor,
  delayAnimation,
}) => {
  const dataRef = useRef(null);
  const startDate = formatDate(beginningDate);
  const finishDate = formatDate(expirationDate);
  const Span = styled.span`
    // background-color: red;

    &:before {
      transform: scaleX(1);
      opacity: 1;
      transition-delay: "${delayAnimation}s";s
    }
  `;

  const handleOnLoad = () => {
    if (dataRef) {
      console.log(dataRef);
      dataRef.current.classList.add(styles.showUnderline);
    }
  };

  useEffect(() => {
    if (dataRef) {
      console.log(dataRef);
    }
  }, [dataRef]);

  return (
    <div className={styles.location}>
      <Span ref={dataRef} onLoad={handleOnLoad} className={styles.date}>{startDate === finishDate ? startDate : `${startDate} - ${finishDate}`}</Span>
      <span className={styles.locationTitle}>{location}</span>
      {eventTitle && <div className={styles.eventTitle} style={{ backgroundColor: `${eventColor}` }}>{eventTitle}</div>}
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
  delayAnimation: PropTypes.number.isRequired,
};
