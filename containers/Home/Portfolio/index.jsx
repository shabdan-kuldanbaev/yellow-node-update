import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { selectHomepageProjectsPreview } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import SectionTitle from 'components/Common/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import { ANIMATED_TYPE, ROUTES } from 'utils/constants';
import { blockNumbers } from './utils/data';
import styles from './styles.module.scss';

const Advantages = dynamic(() => import('containers/Home/Advantages'));
const Works = dynamic(() => import('components/HomeCommon/Works'));

const Portfolio = ({ gradientRef, projects }) => {
  const [backgroundColor, setBackgroundColor] = useState('firstBlock');
  const [blockNumber, setBlockNumber] = useState(0);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const portfolioRef = useRef(null);
  const [currentNumber, setCurrentNumber] = useState(4);
  const { contentModules } = getDocumentFields(projects, ['contentModules']);

  const changeStyle = (index) => {
    refs[0].current.classList.remove(styles[blockNumbers[index + 1]]);
    portfolioRef.current.classList.remove(styles[blockNumbers[index + 1]]);

    refs[0].current.classList.add(styles[blockNumbers[index]]);
    portfolioRef.current.classList.add(styles[blockNumbers[index]]);
  };

  const handleOnScroll = () => {
    const isWorksRefsExist = !refs.reduce((acc, ref) => {
      acc.push(!!get(ref, 'current', false));

      return acc;
    }, []).includes(false);
    const halfHeight = isWorksRefsExist && refs[1].current.getBoundingClientRect().height / 2;

    if (isWorksRefsExist) {
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
        if (currentNumber !== 1) {
          setBlockNumber(0);
          changeStyle(1);
          setCurrentNumber(1);
        }
      } else if (firstBottom < halfHeight && (secondBottom > halfHeight && thirdBottom > halfHeight)) {
        if (currentNumber !== 2) {
          setBlockNumber(1);
          changeStyle(2);
          setCurrentNumber(2);
        }
      } else if (secondBottom < halfHeight) {
        if (currentNumber !== 3) {
          setBlockNumber(2);
          changeStyle(3);
          setCurrentNumber(3);
        }
      } else if (currentNumber !== 0) {
        setBlockNumber(1);
        changeStyle(0);
        setCurrentNumber(0);
      }
    }
  };

  useEffect(() => {
    setBackgroundColor(blockNumbers[blockNumber]);
  }, [blockNumber]);

  useEffect(() => {
    handleOnScroll();

    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.gradient}
      ref={gradientRef}
    >
      {Advantages && (
        <Advantages
          refs={refs}
          className={styles[backgroundColor]}
        />
      )}
      <section
        ref={portfolioRef}
        className={cn(styles.portfolio, styles[backgroundColor])}
      >
        {Works && (
          <Works
            refs={refs}
            works={contentModules}
          />
        )}
        <div className={styles.bottomOfPortfolio}>
          <SectionTitle
            title="Check out more works by Yellow"
            styleTitle={styles.title}
            subtitle="We brainstorm, contribute, and grow your product together. Every step of the way."
            styleSubtitle={styles.subtitle}
          />
          <Animated
            type={ANIMATED_TYPE.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={350}
          >
            <ButtonMore
              href={ROUTES.portfolio.path}
              dynamicRouting={ROUTES.portfolio.dynamicPath}
              title="EXPLORE OUR WORKS"
              buttonStyle={styles.portfolioButton}
            />
          </Animated>
        </div>
      </section>
    </div>
  );
};

Portfolio.defaultProps = {
  projects: {},
};

Portfolio.propTypes = {
  gradientRef: PropTypes.instanceOf(Object).isRequired,
  projects: PropTypes.instanceOf(Object),
};

export default connect(
  (state) => ({ projects: selectHomepageProjectsPreview(state) }),
)(Portfolio);
