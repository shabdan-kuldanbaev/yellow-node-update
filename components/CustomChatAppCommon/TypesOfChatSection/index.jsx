import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'components/Common/Svg';
import ButtonMore from 'components/Common/ButtonMore';
import { SectionTitle } from 'components/CustomChatAppCommon/SectionTitle';
import { chatTypesData } from './utils/data';
import styles from './styles.module.scss';

export const TypesOfChatSection = ({ chatTypesData: chatTypes }) => (
  <div className={styles.typesOfChatSectionContainer}>
    <div className={styles.typesOfChatSection}>
      <SectionTitle
        title="What types of chat do we develop?"
        text="Technically, any type!
          We always delve into the specifics of the client&apos;s business and help implement the most suitable solutions at a minimum cost."
      />
      <div className={styles.typesList}>
        {chatTypes.map((type) => (
          <div className={styles.item}>
            <Svg type={type.icon} />
            <p className={styles.typeTitle}>
              {type.title}
            </p>
            <p className={styles.typeSubtitle}>
              {type.subtitle}
            </p>
          </div>
        ))}
      </div>
      <ButtonMore
        href="/contact"
        title="Request proposal"
        buttonStyle={styles.button}
      />
    </div>
  </div>
);

TypesOfChatSection.defaultProps = {
  chatTypesData,
};

TypesOfChatSection.propTypes = {
  chatTypesData: PropTypes.instanceOf(Array),
};
