import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Svg from 'components/Common/Svg';
import { ROUTES, SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const FiguresItem = ({
  type,
  figureContent,
  title,
}) => {
  switch (type) {
  case ROUTES.customWebApp.slug: {
    return (
      <Fragment>
        <div className={styles.checkMarkWrapper}>
          <div className={styles.checkMark}>
            <Svg
              className={styles.icon}
              type={SVG_IMAGES_TYPES.checkMark}
            />
          </div>
        </div>
        {figureContent}
      </Fragment>
    );
  }
  case ROUTES.developmentServices.slug: {
    return (
      <div className={styles.figuresIos}>
        <Svg
          className={styles.icon}
          type={SVG_IMAGES_TYPES[title]}
        />
        {figureContent}
      </div>
    );
  }
  default: {
    return figureContent;
  }
  }
};

FiguresItem.propTypes = {
  type: PropTypes.string.isRequired,
  figureContent: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FiguresItem;
