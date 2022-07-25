import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { AdvantagesItems } from 'components/HomeCommon/AdvantagesItems';
import { SectionTitle } from 'components/Common/SectionTitle';
import styles from './styles.module.scss';

export const Advantages = ({ className }) => (
  <section className={cn(styles.advantages, { [className]: className })}>
    <SectionTitle
      title="Software development services we kick ass on"
      subtitle="If you wonder how a partnership with Yellow can benefit you, here are the main types of custom software development our team can help you with."
      styleTitle={styles.title}
      styleSubtitle={styles.subtitle}
      styleContainer={styles.container}
    />
    <AdvantagesItems />
  </section>
);

Advantages.defaultProps = {
  className: null,
};

Advantages.propTypes = {
  className: PropTypes.string,
};
