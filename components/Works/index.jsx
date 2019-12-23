import React, { useState, useRef, useEffect } from 'react';

// need if color change animation

// import variables from 'styles/utils/_variables.scss';
import { works } from './utils/data';
import screenContent from './images/screenContent.png';

import styles from './styles.module.scss';

const Works = () => {
  // const colors = [...Object.values(variables)];
  let animateItemsFrom = 300;
  // const [backgroundColor, setColor] = useState(colors[0]);
  const refs = [useRef(null), useRef(null), useRef(null)];

  const handleOnScroll = () => {
    // refs.forEach((ref, index) => {
    //   const refY = ref.current.getBoundingClientRect().top;
    //   if (refY < 300) {
    //     setColor(colors[index]);
    //   };
    // });

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


    if (refs[0].current.getBoundingClientRect().top < animateItemsFrom) {
      refs[0].current.classList.add(styles.firstIsActive);
    } else {
      refs[0].current.classList.remove(styles.firstIsActive);
    };

    if (refs[0].current.getBoundingClientRect().bottom < 0) {
      refs[1].current.style.position = 'relative';
    };

    if (refs[0].current.getBoundingClientRect().bottom < animateItemsFrom) {
      refs[1].current.classList.add(styles.secondIsActive);
    } else {
      refs[1].current.classList.remove(styles.secondIsActive);
    }

    if (refs[1].current.getBoundingClientRect().bottom < 0) {
      refs[2].current.style.position = 'relative';
    };

    if (refs[1].current.getBoundingClientRect().bottom < animateItemsFrom) {
      refs[2].current.classList.add(styles.thirdIsActive);
    } else {
      refs[2].current.classList.remove(styles.thirdIsActive);
    };
  };

  useEffect(() => {
    animateItemsFrom = refs[0].current.getBoundingClientRect().height / 2;
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
          className={styles.work}
          key={`works/${work.name}`}
          data-index={index}
          ref={refs[index]}
        >
          <div className={styles.desc}>
            <h1>{work.name}</h1>
            <p dangerouslySetInnerHTML={{ __html: work.description }} />
            <button type="button">See full case study</button>
          </div>
          <div className={styles.imgWrapper}>
            <img src={work.image} alt={work.image} />
            <img className={styles.content} src={screenContent} alt="content" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Works;
