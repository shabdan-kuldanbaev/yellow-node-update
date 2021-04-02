import React from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitle,
  ButtonMore,
  Animated,
} from 'components';
import { ANIMATED_TYPE, ROUTES } from 'utils/constants';
import { CompanyFigures } from './CompanyFigures';
import { aboutUsText } from './utils/data';
import styles from './styles.module.scss';

export const AboutUs = ({ aboutUsText: aboutUs }) => {
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <section className={styles.aboutUs}>
      <div>
        <SectionTitle title="About us" isMainTitle />
        <div className={styles.aboutUsText}>
          {aboutUs && aboutUs.map((paragraph, index) => (
            <Animated
              key={`paragraph${index}`}
              {...animatedProps}
              transitionDelay={495 + 80 * index}
            >
              <p>{paragraph}</p>
            </Animated>
          ))}
        </div>
        <div className={styles.buttons}>
          <Animated {...animatedProps} transitionDelay={1100 + 80}>
            <ButtonMore
              href={ROUTES.portfolio.path}
              dynamicRouting={ROUTES.portfolio.dynamicPath}
              title="WHAT WE DO"
              buttonStyle={styles.submit}
            />
          </Animated>
          <Animated {...animatedProps} transitionDelay={1100 + 80}>
            <ButtonMore
              href={ROUTES.process.path}
              dynamicRouting={ROUTES.process.dynamicPath}
              title="HOW WE DO IT"
              buttonStyle={styles.submit}
            />
          </Animated>
        </div>
      </div>
      <CompanyFigures />
    </section>
  );
};

AboutUs.defaultProps = {
  aboutUsText,
};

AboutUs.propTypes = {
  aboutUsText: PropTypes.instanceOf(Array),
};
