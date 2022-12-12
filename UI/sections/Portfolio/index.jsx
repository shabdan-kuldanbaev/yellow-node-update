import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import Button from 'UI/components/Button';
import SectionTitle from 'UI/components/SectionTitle';
import Works from 'components/HomeCommon/Works';
import { REVEAL_ANIMATION_PROPS, ROUTES } from 'utils/constants';
import { usePortfolio } from './utils/usePortfolio';
import styles from './styles.module.scss';

const Portfolio = (props) => {
  const {
    refs,
    title,
    description,
    portfolioRef,
    contentModules,
  } = usePortfolio(props);

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
          titleStyle={styles.secondTitleStyle}
        />
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={350}
        >
          <Button
            dark
            href={ROUTES.portfolio.path}
            className={styles.portfolioButton}
          >
            Explore more works by Yellow
          </Button>
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
