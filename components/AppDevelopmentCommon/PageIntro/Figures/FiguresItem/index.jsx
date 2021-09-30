import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { routes as ROUTING } from 'utils/routes';
import styles from './styles.module.scss';

const FiguresItem = ({ type, figureContent, title }) => {
  switch (type) {
  case ROUTING.customWebApp.slug: {
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
  case ROUTING.developmentServices.slug: {
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
  type: PropTypes.string,
  figureContent: PropTypes.node,
  title: PropTypes.string,
};

export default FiguresItem;
