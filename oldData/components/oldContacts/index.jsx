import React from 'react';
import { SectionTitle } from 'components';
import { socialNetworks } from './utils/data';

import styles from './styles.module.scss';

const Contacts = () => (
  <div className={styles.contactsContainer}>
    <SectionTitle title="Contacts" />
    <div className={styles.contacts}>
      <a
        href="mailto:hi@yellow.systems"
        target="_blank"
        rel="noopener noreferrer"
      >
        hi@yellow.systems
      </a>
      <a href="tel:+14156709070">US: +1 415 670 9070</a>
      <a href="tel:+375445840208">BY: +375 44 584 02 08</a>
    </div>
    <div className={styles.social}>
      <span>Follow</span>
      <div className={styles.icons}>
        {socialNetworks.map(network => (
          <a
            key={`networks/${network.title}`}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={network.image} alt={network.title} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Contacts;
