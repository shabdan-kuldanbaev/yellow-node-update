import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  ParallaxContainer,
  LinkWrapper,
} from 'components';
import { mobileResolution, horizontalPhone } from 'utils/helper';
import { animatedType } from 'utils/constants';
import { works } from './utils/data';
import styles from './styles.module.scss';
import ImageWithController from './ImageWithController';

export const Works = ({ refs }) => {
  const [width, setWidth] = useState(null);
  const [parallaxValues, setParallaxValues] = useState({ yTop: 130, yBottom: 130 });

  useEffect(() => {
    setWidth(window.innerWidth);
    if (window.innerWidth < mobileResolution || window.innerHeight < horizontalPhone) {
      setParallaxValues({ yTop: 50, yBottom: 50 });
    }
  }, [width]);

  return (
    <div className={styles.worksContainer}>
      {works.map((work, index) => (
        <div
          className={styles.work}
          key={`works/${work.name}`}
          data-index={index}
          ref={refs[index + 1]}
        >
          <div className={styles.desc}>
            <Animated
              // TODO type={animatedType.isFade}
              // delay={10}
              // distance="60px"
              // bottom
              // effect="fadeInUp"
              // offset={10}

              type={animatedType.isCastom}
              translateY={50}
              opasityDuration={1}
              transformDuration={1}
              transitionDelay={270}
            >
              {/* TODO <div> */}
                <h1>{work.name}</h1>
                <p>{work.description}</p>
                <LinkWrapper
                  isLocalLink
                  dynamicRouting="/"
                  path="/"
                  className={styles.buttonWrap}
                >
                  <button type="button">See full case study</button>
                </LinkWrapper>
              {/* </div> */}
            </Animated>
          </div>
          <ParallaxContainer
            yTop={parallaxValues.yTop}
            yBottom={parallaxValues.yBottom}
            className={styles.parallax}
          >
            <div className={styles.imgWrapper}>
              <ImageWithController src={work.image} alt={work.image} />
            </div>
          </ParallaxContainer>
        </div>
      ))}
    </div>
  );
};

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
};
