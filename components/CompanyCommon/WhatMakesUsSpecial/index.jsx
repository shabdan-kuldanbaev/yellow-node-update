import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'components/Common/SectionTitle';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const WhatMakesUsSpecial = ({ makingUsSpecial }) => makingUsSpecial && (
  <section className={styles.makingUsSpecial}>
    <SectionTitle
      title="What makes us special"
      className={styles.titleStyle}
    />
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
            <div className={styles.title}>
              <Illustration
                layout="fill"
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
