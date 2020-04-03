import React from 'react';
import { SectionTitle, ButtonMore } from 'components';
import { socialNetworks } from './utils/data';
import { rocketIcon } from './images';
import styles from './styles.module.scss';

const Contacts = () => (
  <div className={styles.contactsContainer}>
    <SectionTitle title="Contacts" styleTitle={styles.mobileFooterTitle} />
    <div className={styles.contacts}>
      <span>Email:</span>
      <span>
        <a
          href="mailto:hi@yellow.systems"
          target="_blank"
          rel="noopener noreferrer"
        >
          hi@yellow.systems
        </a>
      </span>
      <span>Phone US:</span>
      <span>
        <a href="tel:+14156709070">+1 415 670 9070</a>
      </span>
      <span>Phone BY:</span>
      <span>
        <a href="tel:+375445840208">+375 44 584 02 08</a>
      </span>
    </div>
    <div className={styles.social}>
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
    <div className={styles.estimationButton}>
      <ButtonMore
        href="/"
        title="Get an estimation"
        buttonStyle={styles.button}
      />
    </div>
    <div className={styles.text}>
      <span>© Copyright 2020 Yellow.</span><span> All Rights Reserved. Privacy Policy</span>
    </div>
    <div className={styles.rocket}>
      <div class={styles.stars} />
      <div class={styles.stars2} />
      <div class={styles.stars3} />
      <img src={rocketIcon} alt=""/>
    </div>
  </div>
);

export default Contacts;
