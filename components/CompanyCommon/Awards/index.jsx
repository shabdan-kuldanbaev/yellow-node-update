import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { awards } from './utils/data';
import styles from './styles.module.scss';

export const Awards = ({ awards }) => {
  const [hostname, setHost] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.hostname);
    }
  }, [hostname]);

  return (
    <div className={styles.awards}>
      {
        awards.length && awards.map((award) => (
          <iframe
            id={award.id}
            src={award.src(hostname)}
            title={award.title}
          />
        ))
      }
    </div>
  );
};

Awards.defaultProps = {
  awards,
};

Awards.propTypes = {
  awards: PropTypes.instanceOf(Array),
};
