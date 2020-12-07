import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { SectionTitle } from 'components';
import { Location } from './Location';
import { locationData } from './utils/data';
import styles from './styles.module.scss';

export const Calendar = ({ locationData: locations }) => (
  !isEmpty(locations) ? (
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
              animationDelay={index}
            />
          ))}
        </div>
      </div>
    </section>
  ) : null);

Calendar.defaultProps = {
  locationData,
};

Calendar.propTypes = {
  locationData: PropTypes.instanceOf(Array),
};
