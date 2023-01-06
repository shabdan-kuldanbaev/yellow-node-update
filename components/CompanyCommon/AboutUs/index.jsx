import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { CompanyFigures } from './CompanyFigures';
import { aboutUsText } from './utils/data';
import styles from './styles.module.scss';

const AboutUs = ({ aboutUsText: aboutUs }) => (
  <section className={styles.aboutUs}>
    <div className={styles.contentWrapper}>
      <div className={styles.aboutUsContent}>
        <SectionTitle
          title="About us"
          className={styles.titleStyle}
        />
        <div className={styles.aboutUsText}>
          {aboutUs?.map((paragraph, index) => (
            <Animated
              key={`paragraph${index}`}
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={80 * index}
            >
              <p>{paragraph}</p>
            </Animated>
          ))}
        </div>
      </div>
      <CompanyFigures />
    </div>
  </section>
);

AboutUs.defaultProps = {
  aboutUsText,
};

AboutUs.propTypes = {
  aboutUsText: PropTypes.instanceOf(Array),
};

export default AboutUs;
