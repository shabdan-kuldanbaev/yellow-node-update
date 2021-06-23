import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { technologiesData } from './utils/data';
import styles from './styles.module.scss';

export const TechnologiesSection = ({ technologiesData: technologies }) => (
  <div className={styles.technologiesSection}>
    <SectionTitle
      title="What technologies do we use for chat app development?"
      text="Our team always gives preference to the most cutting-edge and reliable technologies and integrations."
    />
    <div className={styles.technologiesList}>
      {technologies.map((technology) => (
        <div className={styles.item}>
          <Svg type={technology} />
        </div>
      ))}
    </div>
  </div>
);

TechnologiesSection.defaultProps = {
  technologiesData,
};

TechnologiesSection.propTypes = {
  technologiesData: PropTypes.instanceOf(Array),
};
