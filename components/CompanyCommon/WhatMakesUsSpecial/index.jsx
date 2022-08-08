import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from 'components/Common/SectionTitle';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const WhatMakesUsSpecial = ({ makingUsSpecial }) => makingUsSpecial && (
  <section className={styles.makingUsSpecial}>
    <SectionTitle title="What makes us special" />
    <div className={styles.specialThings}>
      {makingUsSpecial && makingUsSpecial.map((special, index) => {
        const { image, title } = getDocumentFields(
          special,
          ['image', 'title'],
        );
        const imageUrl = getFileUrl(image);

        return (
          <Animated
            key={`special/${title}`}
            type={ANIMATED_TYPE.isCustom}
            translateY="100px"
            opasityDuration={0.8}
            transformDuration={0.8}
            transitionDelay={100 + 150 * index}
          >
            <div>
              <img
                src={imageUrl}
                alt={title}
              />
            </div>
            <span>{title}</span>
          </Animated>
        );
      })}
    </div>
  </section>
);

WhatMakesUsSpecial.defaultProps = {
  makingUsSpecial: [],
};

WhatMakesUsSpecial.propTypes = {
  makingUsSpecial: PropTypes.instanceOf(Array),
};

export default WhatMakesUsSpecial;
