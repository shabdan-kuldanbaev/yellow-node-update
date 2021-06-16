import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Images = ({ data }) => (
  <Fragment>
    {data.images.map((image) => {
      const imageUrl = getFileUrl(image);

      return (
        <Animated
          key={imageUrl}
          type={ANIMATED_TYPE.isFade}
          delay={500}
          duration={1000}
        >
          <div className={styles.imagContainer}>
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

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Images;
