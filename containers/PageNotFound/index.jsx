'use client';

import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import ButtonMore from 'components/Common/ButtonMore';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import json from './json/Idea.json';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const PageNotFound = () => (
  <div className={styles.pageNotFound}>
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={300}
    >
      <Animated
        type={ANIMATED_TYPE.isJSON}
        jsonFile={json}
        className={styles.jsonWrapper}
      />
    </Animated>
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={250}
    >
      <p>This page could not be found</p>
    </Animated>
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={200}
    >
      <ButtonMore
        title="BACK TO HOME"
        buttonStyle={styles.button}
        href="/"
      />
    </Animated>
  </div>
);

PageNotFound.propTypes = {
  animation: PropTypes.instanceOf(Object),
};

export default PageNotFound;
