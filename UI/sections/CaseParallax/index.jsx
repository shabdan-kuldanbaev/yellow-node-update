import React from 'react';
import SectionTitle from 'UI/components/SectionTitle';
import useParallaxProps from './utils/useParallaxProps';
import styles from './styles.module.scss';

const CaseParallax = (props) => {
  const {
    title,
    subtitle,
    imageUrl,
    className,
  } = useParallaxProps(props);

  return (
    <section className={className}>
      {(title || subtitle) && (
        <SectionTitle
          title={title}
          subtitle={subtitle}
          titleStyle={styles.titleStyle}
        />
      )}
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={styles.parallaxImage}
      />
    </section>
  );
};

export default CaseParallax;
