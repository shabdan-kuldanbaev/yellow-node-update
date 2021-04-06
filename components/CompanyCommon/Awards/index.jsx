import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { awards } from './utils/data';
import styles from './styles.module.scss';

export const Awards = ({ awards: awardsList }) => {
  const [hostname, setHost] = useState('');

  useEffect(() => {
    if (window) {
      setHost(window.location.hostname);
    }
  }, []);

  return (
    <div className={styles.awards}>
      { awardsList && awardsList.map(({ id, src, title }) => (
        <iframe
          id={id}
          src={src(hostname)}
          title={title}
          key={`awards/${title}`}
        />
      ))}
    </div>
  );
};

Awards.defaultProps = {
  awards,
};

Awards.propTypes = {
  awards: PropTypes.instanceOf(Array),
};
