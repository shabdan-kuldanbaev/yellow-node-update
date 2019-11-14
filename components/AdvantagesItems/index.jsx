import React from 'react';
import { advantages } from './utils/data';
import styles from './styles.module.scss';

const AdvantagesItems = () => (
  <div className={styles.advantagesContainer}>
    {advantages.map(adv => (
      <div className={styles.advItem} key={`advantages/${adv.title}`}>
        <img src={adv.image} alt={adv.title} />
        <span>{adv.title}</span>
        <p>{adv.desc}</p>
      </div>
    ))}
  </div>
);

export default AdvantagesItems;
