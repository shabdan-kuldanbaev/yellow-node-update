import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  MetaTags,
  Animated,
  ButtonMore,
} from 'components';
import { ANIMATED_TYPE, PAGES } from 'utils/constants';
import json from './json/Idea.json';
import styles from './styles.module.scss';

export const PageNotFound = ({ animation }) => {
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
    percentIntersection: 0.1,
  };

  return (
    <Fragment>
      <MetaTags page={PAGES.notFound} />
      {animation && (
        <div className={styles.pageNotFound}>
          <Animated
            {...animatedProps}
            transitionDelay={300}
          >
            <Animated
              type={ANIMATED_TYPE.isJSON}
              jsonFile={animation}
              className={styles.jsonWrapper}
            />
          </Animated>
          <Animated
            {...animatedProps}
            transitionDelay={250}
          >
            <p>This page could not be found</p>
          </Animated>
          <Animated
            {...animatedProps}
            transitionDelay={200}
          >
            <ButtonMore
              title="BACK TO HOME"
              buttonStyle={styles.button}
              href="/"
            />
          </Animated>
        </div>
      )}
    </Fragment>
  );
};

PageNotFound.defaultProps = {
  animation: json,
};

PageNotFound.propTypes = {
  animation: PropTypes.instanceOf(Object),
};
