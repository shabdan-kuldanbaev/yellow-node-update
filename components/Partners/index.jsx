import React from 'react';
import { partners } from './utils/data';

import styles from './styles.module.scss';

const Partners = () => (
  <div className={styles.partnersContainer}>
    <h1>and get featured on</h1>
    <div className={styles.partners}>
      {partners.map(partner => (
        <div key={`partner/${partner.title}`} className={styles.partnersItem}>
          <img src={partner.image} alt={partner.title} />
        </div>
      ))}
    </div>
  </div>
);

export default Partners;
