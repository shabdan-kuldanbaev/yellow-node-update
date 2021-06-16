import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const Wireframe = ({ data, type }) => {
  const { images } = data;

  return (
    <Fragment>
      {images && images.map((image) => {
        const imageUrl = getFileUrl(image);

        return (
          <Animated
            key={imageUrl}
            type={ANIMATED_TYPE.isFade}
            delay={500}
            duration={1000}
          >
            <div className={cn(styles.imagesContainer, styles[type])}>
              <img
                className={styles.image}
                src={imageUrl}
                alt={imageUrl}
              />
            </div>
          </Animated>
        );
      })}
    </Fragment>
  );
};

Wireframe.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;
