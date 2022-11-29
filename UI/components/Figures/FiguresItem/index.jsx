import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import Svg from 'UI/components/Svg';
import { REVEAL_ANIMATION_PROPS, ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from 'UI/components/Figures/styles.module.scss';
import useFiguresItemProps from './utils/useFiguresItemProps';

const FiguresItem = (props) => {
  const {
    index,
    type,
    title,
    description,
  } = useFiguresItemProps(props);

  switch (type) {
  case ROUTES.customWebApp.slug: {
    return (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={400 + 90 * index * 2}
      >
        <div className={styles.circle}>
          <Svg
            className={styles.icon}
            type={SVG_IMAGES_TYPES.checkMark}
          />
        </div>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </Animated>
    );
  }
  case ROUTES.developmentServices.slug: {
    return (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={400 + 90 * index * 2}
      >
        <div className={styles.circle}>
          <Svg
            className={styles.icon}
            type={SVG_IMAGES_TYPES[title]}
          />
        </div>
        <div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.description}>
            {description}
          </div>
        </div>
      </Animated>
    );
  }
  default:
    return (
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={400 + 90 * index * 2}
      >
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </Animated>
    );
  }
};

FiguresItem.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  figureData: PropTypes.instanceOf(Object).isRequired,
};

export default FiguresItem;
