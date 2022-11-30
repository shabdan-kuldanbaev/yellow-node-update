import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'UI/components/Svg';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from 'UI/components/Figures/styles.module.scss';
import Typography from 'UI/components/Typography';
import useFiguresItemProps from './utils/useFiguresItemProps';

const FiguresItem = (props) => {
  const {
    type,
    title,
    description,
  } = useFiguresItemProps(props);

  switch (type) {
  case ROUTES.customWebApp.slug: {
    return (
      <>
        <div className={styles.circle}>
          <Svg
            className={styles.icon}
            type={SVG_IMAGES_TYPES.checkMark}
          />
        </div>
        <Typography
          variant="h4"
          className={styles.title}
        >
          {title}
        </Typography>
        <Typography
          variant="p"
          className={styles.description}
        >
          {description}
        </Typography>
      </>
    );
  }
  case ROUTES.developmentServices.slug: {
    return (
      <>
        <div className={styles.circle}>
          <Svg
            className={styles.icon}
            type={SVG_IMAGES_TYPES[title]}
          />
        </div>
        <div>
          <Typography
            variant="h4"
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography
            variant="p"
            className={styles.description}
          >
            {description}
          </Typography>
        </div>
      </>
    );
  }
  default:
    return (
      <>
        <Typography
          variant="h4"
          className={styles.title}
        >
          {title}
        </Typography>
        <Typography
          variant="p"
          className={styles.description}
        >
          {description}
        </Typography>
      </>
    );
  }
};

FiguresItem.propTypes = {
  type: PropTypes.string.isRequired,
  figureData: PropTypes.instanceOf(Object).isRequired,
};

export default FiguresItem;
