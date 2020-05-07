import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollAnimation from 'react-animate-on-scroll';
import cn from 'classnames';
import { works } from './utils/data';
import styles from './styles.module.scss';

const Works = ({ refs, backgroundColor }) => {
// TODO const refs = [useRef(null), useRef(null), useRef(null)];

  // TODO const handleOnScroll = () => {
  //   if (refs[0].current.getBoundingClientRect().top < 0) {
  //     refs[1].current.style.position = 'fixed';
  //     refs[1].current.style.top = 0;
  //     refs[1].current.style.zIndex = 3;
  //     refs[2].current.style.position = 'fixed';
  //     refs[2].current.style.top = 0;
  //     refs[2].current.style.zIndex = 2;
  //   } else {
  //     refs[1].current.style.position = 'relative';
  //     refs[2].current.style.position = 'relative';
  //   }

  //   if (refs[0].current.getBoundingClientRect().bottom < 0) {
  //     refs[1].current.style.position = 'relative';
  //   }

  //   if (refs[1].current.getBoundingClientRect().bottom < 0) {
  //     refs[2].current.style.position = 'relative';
  //   }
  // };

  // TODO useEffect(() => {
  //   handleOnScroll();
  //   window.addEventListener('scroll', handleOnScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleOnScroll);
  //   };
  // }, []);

  // TODO const [state, set] = useState(null);

  // useEffect(() => {

  // }, []);

  return (
    <div className={styles.worksContainer}>
      {works.map((work, index) => (
        <div
          className={styles.work}
          key={`works/${work.name}`}
          data-index={index}
          ref={refs[index]}
        >
          <div className={styles.desc}>
            <ScrollAnimation
              delay={10}
              animateIn="fadeInUp"
              animateOnce
              offset={10}
            >
              <h1>{work.name}</h1>
              {/* <p dangerouslySetInnerHTML={{ __html: work.description }} /> */}
              <p>{work.description}</p>
              <button type="button">See full case study</button>
            </ScrollAnimation>
          </div>
          <div className={cn(styles.imgWrapper, styles.animationOfAppearanceBefore, { [styles.animationOfAppearance]: true })}>
            <ScrollAnimation
              delay={700}
              animateIn="zoomIn"
              animateOnce
              offset={10}
            >
              {/* <div> */}
              <img src={work.image} alt={work.image} />
              {/* </div> */}
            </ScrollAnimation>
          </div>
        </div>
      ))}
    </div>
  );
};

Works.propTypes = {
  refs: PropTypes.instanceOf(Object).isRequired,
};

export default Works;
