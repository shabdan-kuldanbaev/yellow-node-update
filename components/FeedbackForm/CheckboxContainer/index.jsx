import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

export const CheckboxContainer = () => (
  <div className={styles.checkboxContainer}>
    <label className={styles.checkbox}>
      <span>I accept your</span>
      <Link href="/privacy-policy">
          <span className={styles.link}>Privacy Policy</span>
      </Link>
      <input type="checkbox" />
      <span className={styles.checkmark} />
    </label>
    <label className={styles.checkbox}>
      <span>Send me NDA</span>
      <input type="checkbox" />
      <span className={styles.checkmark} />
    </label>
  </div>
);
