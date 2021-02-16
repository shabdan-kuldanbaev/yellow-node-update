import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { AdvantagesItems, SectionTitle } from 'components';
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

Advantages.defaultProps = {
  className: null,
};

Advantages.propTypes = {
  refs: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string,
};
