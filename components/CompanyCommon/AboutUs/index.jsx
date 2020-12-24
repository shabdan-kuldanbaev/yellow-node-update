import React from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitle,
  ButtonMore,
  Animated,
} from 'components';
import { animatedType } from 'utils/constants';
import { CompanyFigures } from './CompanyFigures';
import { aboutUsText } from './utils/data';
import styles from './styles.module.scss';

export const AboutUs = ({ aboutUsText }) => {
  const animatedProps = {
    type: animatedType.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <section className={styles.aboutUs}>
      <div>
        <SectionTitle title="About us" />
        <div className={styles.aboutUsText}>
          {aboutUsText && aboutUsText.map((paragraph, index) => (
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
              href="/portfolio"
              title="WHAT WE DO"
              buttonStyle={styles.submit}
            />
          </Animated>
          <Animated {...animatedProps} transitionDelay={1100 + 250}>
            <ButtonMore
              href="/process"
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
