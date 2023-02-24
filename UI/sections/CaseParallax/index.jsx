import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import useParallaxProps from './utils/useParallaxProps';
import styles from './styles.module.scss';

const CaseParallax = (props) => {
  const {
    title,
    subtitle,
    description,
    imageUrl,
    className,
  } = useParallaxProps(props);

  return (
    <section className={className}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={styles.parallaxImage}
      />
    </section>
  );
};

CaseParallax.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseParallax;
