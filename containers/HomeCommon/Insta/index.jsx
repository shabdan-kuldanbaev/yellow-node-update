import React from 'react';
import {
  InstaLogo,
  InstaTape,
  SectionTitle,
  ButtonMore,
} from 'components';
import styles from './styles.module.scss';

export const Insta = () => (
  <section className={styles.insta}>
    <InstaLogo />
    <SectionTitle title="Live" subtitle="How we live and work" />
    <InstaTape />
    <ButtonMore
      href="/insta"
      title="Follow on Instagram"
      buttonStyle={styles.instaButton}
    />
  </section>
);
