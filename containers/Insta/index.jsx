import React from 'react';
import {
  InstaLogo,
  InstaTape,
  SectionTitle,
  ButtonMore,
} from 'components';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './styles.module.scss';

const Insta = () => (
  <section className={styles.insta}>
    <ScrollAnimation
      animateIn="zoomIn"
      animateOnce
      delay={1500}
    >
      <InstaLogo />
    </ScrollAnimation>
    <SectionTitle title="Live" subtitle="How we live and work" />
    <InstaTape />
    <ButtonMore
      href="/insta"
      title="Follow on Instagram"
      buttonStyle={styles.instaButton}
    />
  </section>
);

export default Insta;
