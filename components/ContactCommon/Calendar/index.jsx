import React from 'react';
import { SectionTitle } from 'components';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { locationData } from './utils/data';
import { Location } from './Location';

export const Calendar = ({ locationData: locations }) => (
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
        {locations && locations.map((location, index) => (
          <Location
            key={`location/${location.eventTitle}`}
            beginningDate={location.beginningDate}
            expirationDate={location.expirationDate}
            location={location.location}
            eventTitle={location.eventTitle}
            eventColor={location.eventColor}
            delayAnimation={index}
          />
        ))}
      </div>
    </div>
  </section>
);

Calendar.defaultProps = {
  locationData,
};

Calendar.propTypes = {
  locationData: PropTypes.instanceOf(Array),
};
