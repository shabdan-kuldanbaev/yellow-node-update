import React, {
  // TODO useState,
  useRef,
  useEffect,
  Fragment,
} from 'react';
// TODO import cn from 'classnames';
import { Advantages } from 'containers';
import {
  Works,
  SectionTitle,
  ButtonMore,
} from 'components';
// TODO import { blockNumbers } from './utils/data';
import styles from './styles.module.scss';

export const Portfolio = () => {
  // TODO const [backgroundColor, setBackgroundColor] = useState('firstBlock');
  // TODO const [blockNumber, setBlockNumber] = useState(0);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const portfolioRef = useRef(null);
  const currentNumber = 4;

  const handleOnScroll = () => {
    const halfHeight = refs && refs[1].current.getBoundingClientRect().height / 2;
    const [
      zeroBlock,
      firstBottom,
      secondBottom,
      thirdBottom,
    ] = [
      refs[0].current.getBoundingClientRect().bottom,
      refs[1].current.getBoundingClientRect().bottom,
      refs[2].current.getBoundingClientRect().bottom,
      refs[3].current.getBoundingClientRect().bottom,
    ];

    if (zeroBlock < halfHeight && (firstBottom > halfHeight && secondBottom > halfHeight && thirdBottom > halfHeight)) {
      // if (currentNumber !== 1) {
      //   // TODO setBlockNumber(1);
      //   refs[0].current.classList.remove(styles[blockNumbers[2]]);
      //   portfolioRef.current.classList.remove(styles[blockNumbers[2]]);

      //   refs[0].current.classList.add(styles[blockNumbers[1]]);
      //   portfolioRef.current.classList.add(styles[blockNumbers[1]]);

      //   currentNumber = 1;
      // }
    } else if (firstBottom < halfHeight && (secondBottom > halfHeight && thirdBottom > halfHeight)) {
      // if (currentNumber !== 2) {
      //   // TODO setBlockNumber(2);
      //   refs[0].current.classList.remove(styles[blockNumbers[3]]);
      //   portfolioRef.current.classList.remove(styles[blockNumbers[3]]);

      //   refs[0].current.classList.add(styles[blockNumbers[2]]);
      //   portfolioRef.current.classList.add(styles[blockNumbers[2]]);

      //   currentNumber = 2;
      // }
    } else if (secondBottom < halfHeight) {
      // if (currentNumber !== 3) {
      //   // TODO setBlockNumber(3);
      //   refs[0].current.classList.add(styles[blockNumbers[3]]);
      //   portfolioRef.current.classList.add(styles[blockNumbers[3]]);

      //   currentNumber = 3;
      // }
    } else if (currentNumber !== 0) {
      // // TODO setBlockNumber(0);
      // refs[0].current.classList.remove(styles[blockNumbers[1]]);
      // portfolioRef.current.classList.remove(styles[blockNumbers[1]]);

      // refs[0].current.classList.add(styles[blockNumbers[0]]);
      // portfolioRef.current.classList.add(styles[blockNumbers[0]]);
      // currentNumber = 0;
    }

    // TODO if (firstBottom < halfHeight && (secondBottom > halfHeight && thirdBottom > halfHeight)) setBlockNumber(1);
    // else if (secondBottom < halfHeight) setBlockNumber(2);
    // else setBlockNumber(0);
  };
  // TODO console.log('changed');
  // useEffect(() => {
  //   setBackgroundColor(blockNumbers[blockNumber]);
  // }, [blockNumber]);

  useEffect(() => {
    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <Fragment>
      <div className={styles.gradient}>
        <Advantages
          refs={refs}
          // TODO className={styles[backgroundColor]}
        />
        <section
          ref={portfolioRef}
          className={styles.portfolio}
          // TODO className={cn(styles.portfolio, styles[backgroundColor])}
        >
          <Works refs={refs} />
          <div className={styles.bottomOfPortfolio}>
            <SectionTitle
              title="Check out more works by Yellow"
              styleTitle={styles.title}
              subtitle="We brainstorm, contribute, and grow your product together. Every step of the way."
              styleSubtitle={styles.subtitle}
            />
            <ButtonMore
              href="/portfolio"
              title="EXPLORE OUR PORTFOLIO"
              buttonStyle={styles.portfolioButton}
            />
          </div>
        </section>
      </div>
    </Fragment>
  );
};
