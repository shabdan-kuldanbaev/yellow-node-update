import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useParallaxProps from './utils/useParallaxProps';
import styles from './styles.module.scss';

const CaseParallax = (props) => {
  const {
    title,
    subtitle,
    description,
    imageUrl,
    contentList,
    className,
  } = useParallaxProps(props);

  return (
    <section className={className}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        titleStyle={styles.titleStyle}
      >
        {!!contentList.length
          && (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={50}
            >
              <ul className={styles.listContainer}>
                {contentList.map((item) => (
                  <li className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </Animated>
          )}
      </SectionTitle>
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
