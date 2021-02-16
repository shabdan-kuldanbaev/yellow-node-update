import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import { advantages, animatedFields } from './utils/data';
import styles from './styles.module.scss';

export const AdvantagesItems = ({ advantages, animatedFields }) => {
  const switchRender = ({ field }, adv) => { // TODO create separate component
    switch (field) {
    case 'img':
      return <img src={adv.image} alt={adv.title} />;
    case 'title':
      return <p className={styles.title}>{adv.title}</p>;
    case 'desc':
      return <p className={styles.desc} dangerouslySetInnerHTML={{ __html: adv.desc }} />;
    default:
      return null;
    }
  };

  return (
    <div className={styles.advantagesContainer}>
      {advantages && advantages.map((adv, index) => (
        <div className={styles.advItem} key={`advantages/${adv.title}`}>
          {animatedFields && animatedFields.map((animated, index) => (
            <Animated
              {...animated}
              transitionDelay={animated.transitionDelay(index)}
              key={`fields/${index}/${adv.title}`}
            >
              {switchRender(animated, adv)}
            </Animated>
          ))}
        </div>
      ))}
    </div>
  );
};

AdvantagesItems.defaultProps = {
  advantages,
  animatedFields,
};

AdvantagesItems.propTypes = {
  advantages: PropTypes.instanceOf(Array),
  animatedFields: PropTypes.instanceOf(Array),
};
