import React from 'react';
import {
  SectionTitle,
  ButtonMore,
  Animated,
} from 'components';
import { animatedType } from 'utils/constants';
import { CompanyFigures } from './CompanyFigures';
import { aboutUsText } from './utils/data';
import styles from './styles.module.scss';

export const AboutUs = ({ aboutUsText }) => (
  <section className={styles.aboutUs}>
    <div>
      <SectionTitle title="About us" />
      <div className={styles.aboutUsText}>
        {aboutUsText && aboutUsText.map((paragraph, index) => (
          <Animated
            key={`paragraph${index}`}
            type={animatedType.isCustom}
            translateY={20}
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={495 + 80 * index}
          >
            <p>{paragraph}</p>
          </Animated>
        ))}
      </div>
      <div className={styles.buttons}>
        <Animated
          type={animatedType.isCustom}
          translateY={20}
          opasityDuration={0.8}
          transformDuration={0.8}
          transitionDelay={495 + 80}
        >
          <ButtonMore
            href="/"
            title="WHAT WE DO"
            buttonStyle={styles.submit}
          />
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY={20}
          opasityDuration={0.8}
          transformDuration={0.8}
          transitionDelay={495 + 250}
        >
          <ButtonMore
            href="/"
            title="HOW WE DO IT"
            buttonStyle={styles.submit}
          />
        </Animated>
      </div>
    </div>
    <CompanyFigures />
  </section>
);

AboutUs.defaultProps = {
  aboutUsText,
};
