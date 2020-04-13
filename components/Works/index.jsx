import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { works } from './utils/data';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './styles.module.scss';

const Works = () => {
  const refs = [useRef(null), useRef(null), useRef(null)];

  const handleOnScroll = () => {
    if (refs[0].current.getBoundingClientRect().top < 0) {
      refs[1].current.style.position = 'fixed';
      refs[1].current.style.top = 0;
      refs[1].current.style.zIndex = 3;
      refs[2].current.style.position = 'fixed';
      refs[2].current.style.top = 0;
      refs[2].current.style.zIndex = 2;
    } else {
      refs[1].current.style.position = 'relative';
      refs[2].current.style.position = 'relative';
    };

    if (refs[0].current.getBoundingClientRect().bottom < 0) {
      refs[1].current.style.position = 'relative';
    };

    if (refs[1].current.getBoundingClientRect().bottom < 0) {
      refs[2].current.style.position = 'relative';
    };
  };

  useEffect(() => {
    handleOnScroll();
    window.addEventListener('scroll', handleOnScroll);

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <div className={styles.worksContainer}>
      {works.map((work, index) => (
        <div
          className={cn(styles.work, {
            [`${styles.firstIsActive}`]: index === 0,
            [`${styles.secondIsActive}`]: index === 1,
            [`${styles.thirdIsActive}`]: index === 2,
          })}
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
              <p dangerouslySetInnerHTML={{ __html: work.description }} />
              <button type="button">See full case study</button>
            </ScrollAnimation>
          </div>
          <div className={styles.imgWrapper}>
            <ScrollAnimation
                delay={700}
                animateIn="zoomIn"
                animateOnce
                offset={10}
              >
                <img src={work.image} alt={work.image} />
                {/* TODO <img className={styles.content} src={screenContent} alt="content" /> */}
            </ScrollAnimation>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Works;
