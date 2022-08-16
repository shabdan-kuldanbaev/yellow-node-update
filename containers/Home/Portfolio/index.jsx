import React, {
  useState,
  useRef,
  useEffect,
  createRef,
  useCallback,
} from 'react';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import Works from 'components/HomeCommon/Works';
import { getDocumentFields } from 'utils/helper';
import { REVEAL_ANIMATION_PROPS, ROUTES } from 'utils/constants';
import { blockNumbers } from './utils/data';
import styles from './styles.module.scss';

const Portfolio = ({ sectionData }) => {
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(sectionData);
  const [currentPosition, setCurrentPosition] = useState(0);

  const portfolioRef = useRef(null);
  const refs = useRef(contentModules.map(() => createRef()));

  const handleOnScroll = useCallback(() => {
    const isWorksRefsExist = refs.current.reduce((acc, ref) => acc && ref.current, true);

    if (!isWorksRefsExist) {
      return;
    }

    const halfHeight = window.innerHeight / 2;

    const [
      firstTop,
      secondTop,
      thirdTop,
    ] = refs.current.map((ref) => ref.current.getBoundingClientRect().top);

    if (firstTop > halfHeight && currentPosition) {
      return setCurrentPosition(0);
    }

    if (firstTop < halfHeight && secondTop > halfHeight) {
      return setCurrentPosition(1);
    }

    if (secondTop < halfHeight && thirdTop > halfHeight) {
      return setCurrentPosition(2);
    }

    if (thirdTop - halfHeight < 10) {
      return setCurrentPosition(3);
    }
  }, [currentPosition]);

  useEffect(() => {
    portfolioRef.current.classList.remove(styles[blockNumbers[currentPosition + 1]]);

    portfolioRef.current.classList.add(styles[blockNumbers[currentPosition]]);
  }, [currentPosition]);

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleOnScroll, 500));

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [handleOnScroll]);

  return (
    <section
      ref={portfolioRef}
      className={styles.portfolio}
    >
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <Works
        refs={refs}
        works={contentModules}
      />
      <div className={styles.bottomOfPortfolio}>
        <SectionTitle
          title="Developing custom software for your business idea"
          titleStyle={styles.titleStyle}
        />
        <Animated
          {...REVEAL_ANIMATION_PROPS}
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
  );
};

Portfolio.defaultProps = {
  sectionData: {},
};

Portfolio.propTypes = {
  sectionData: PropTypes.instanceOf(Object),
};

export default Portfolio;
