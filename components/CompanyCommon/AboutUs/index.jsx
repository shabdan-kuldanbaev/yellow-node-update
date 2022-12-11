import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import SectionTitle from 'UI/components/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { CompanyFigures } from './CompanyFigures';
import { aboutUsText } from './utils/data';
import styles from './styles.module.scss';

const AboutUs = ({ aboutUsText: aboutUs }) => {
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  return (
    <section className={styles.aboutUs}>
      <div className={styles.aboutUsContent}>
        <SectionTitle
          title="About us"
          className={styles.titleStyle}
        />
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

export default AboutUs;
