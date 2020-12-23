import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
  Animated,
  PreviewImage,
  withScroll,
} from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

const Portfolio = ({ works, maxScrollPosition }) => {
  useEffect(() => {
    console.log();

    return () => ReactGA.event({
      category: 'Scroll',
      action: `${maxScrollPosition}%`,
      label: '/portfolio',
      nonInteraction: maxScrollPosition < 50,
    });
  }, []);

  return (
    <div className={styles.worksContainer}>
      {works && works.map((work, index) => (
        <div
          className={styles.work}
          key={`works/${work.name}`}
          data-index={index}
        >
          <div className={styles.workWrapper}>
            <div className={styles.desc}>
              <Animated
                type={animatedType.isCustom}
                translateY="2.82352941em"
                opasityDuration={1}
                transformDuration={1}
                transitionDelay={300}
              >
                <h1>{work.name}</h1>
              </Animated>
              <Animated
                type={animatedType.isCustom}
                translateY="2.82352941em"
                opasityDuration={1}
                transformDuration={1}
                transitionDelay={350}
              >
                <p>{work.description}</p>
              </Animated>
              <Animated
                type={animatedType.isCustom}
                translateY="2.82352941em"
                opasityDuration={1}
                transformDuration={1}
                transitionDelay={400}
              >
                {/* TODO
              <LinkWrapper
                isLocalLink
                dynamicRouting="/portfolio/[project]"
                path={`/portfolio/${work.id}`}
                className={styles.buttonWrap}
              >
                <button type="button">See full case study</button>
              </LinkWrapper> */}
              </Animated>
            </div>
            <PreviewImage image={work.image} />
          </div>
        </div>
      ))}
    </div>
  );
};

Portfolio.propTypes = {
  works: PropTypes.instanceOf(Array).isRequired,
};

export default withScroll(Portfolio);
