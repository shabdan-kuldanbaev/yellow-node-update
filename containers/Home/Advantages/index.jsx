import React from 'react';
import { AdvantagesItems, SectionTitle } from 'components';
import cn from 'classnames';
import styles from './styles.module.scss';

export const Advantages = ({ refs, className }) => (
  <section ref={refs[0]} className={cn(styles.advantages, { [className]: className })}>
    <SectionTitle
      title="We kick ass on"
      subtitle="We brainstorm, contribute, and grow your product together. Every step of the way."
      styleSubtitle={styles.subtitle}
    />
    <AdvantagesItems />
  </section>
);
