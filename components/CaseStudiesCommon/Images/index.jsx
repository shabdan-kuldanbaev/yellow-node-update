import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Images = ({ data }) => {
  const { images } = data;

  return (
    <Fragment>
      {images && images.map((image) => {
        const imageUrl = getFileUrl(image);

        return (
          <Animated
            key={imageUrl}
            delay={500}
            {...ANIMATION_CASE_STUDY_PROPS}
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
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Images;
