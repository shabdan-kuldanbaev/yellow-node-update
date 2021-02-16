import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from 'components';
import { Location } from './Location';
import styles from './styles.module.scss';

export const Calendar = ({ locationData: locations }) => !!locations.length && (
  <section className={styles.feedbackFormWithTitle}>
    <div>
      <SectionTitle
        title="Want to meet with us?"
        styleTitle={styles.title}
        styleSubtitle={styles.subtitle}
        isFeedbackForm
        subtitle="Let’s see each other!"
        linkText="Schedule a meeting"
      />
      <div>
        {locations && locations.map(({
          eventTitle,
          beginningDate,
          expirationDate,
          location,
          eventColor,
        }, index) => (
          <Location
            key={`location/${eventTitle}`}
            beginningDate={beginningDate}
            expirationDate={expirationDate}
            location={location}
            eventTitle={eventTitle}
            eventColor={eventColor}
            animationDelay={index}
          />
        ))}
      </div>
    </div>
  </section>
);

Calendar.defaultProps = {
  locationData: [],
};

Calendar.propTypes = {
  locationData: PropTypes.instanceOf(Array),
};
