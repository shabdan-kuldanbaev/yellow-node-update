import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { advantagesData } from './utils/data';
import styles from './styles.module.scss';

export const AdvantagesSection = ({ advantagesData: advantages }) => (
  <div className={styles.advantagesSection}>
    <SectionTitle
      title="Advantages of a chat app development"
      text="If you&apos;re still wondering if your business needs a chat app, here are the main benefits of instant messages both for you and users:"
    />
    <div className={styles.advantagesList}>
      {advantages.map((advantage) => (
        <div className={styles.item}>
          <div>
            <Svg type={SVG_IMAGES_TYPES.checkMark} />
          </div>
          <p className={styles.advantageTitle}>
            {advantage}
          </p>
        </div>
      ))}
    </div>
  </div>
);

AdvantagesSection.defaultProps = {
  advantagesData,
};

AdvantagesSection.propTypes = {
  advantagesData: PropTypes.instanceOf(Array),
};
