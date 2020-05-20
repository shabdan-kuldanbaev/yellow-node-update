import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Works,
  SectionTitle,
  ButtonMore,
} from 'components';
import cn from 'classnames';
import styles from './styles.module.scss';
import { blockNumbers } from './utils/data';

export const Portfolio = () => {
  const [backgroundColor, setBackgroundColor] = useState('firstBlock');
  const [blockNumber, setBlockNumber] = useState(0);
  const refs = [useRef(null), useRef(null), useRef(null)];

  const handleOnScroll = () => {
    const halfHeight = refs[0].current.getBoundingClientRect().height / 2;
    const [
      firstBottom,
      secondBottom,
      thirdBottom,
    ] = [
      refs[0].current.getBoundingClientRect().bottom,
      refs[1].current.getBoundingClientRect().bottom,
      refs[2].current.getBoundingClientRect().bottom,
    ];

    if (firstBottom < halfHeight && (secondBottom > halfHeight && thirdBottom > halfHeight)) setBlockNumber(1);
    else if (secondBottom < halfHeight) setBlockNumber(2);
    else setBlockNumber(0);
  };

  useEffect(() => {
    setBackgroundColor(blockNumbers[blockNumber]);
  }, [blockNumber]);

  useEffect(() => {
    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <section className={cn(styles.portfolio, styles[backgroundColor])}>
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
          title="Explore our portfolio"
          buttonStyle={styles.portfolioButton}
        />
      </div>
    </section>
  );
};
