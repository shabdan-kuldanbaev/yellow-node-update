import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import LinkWrapper from 'components/Common/LinkWrapper';
import Illustration from 'UI/components/Illustration';
import { advantages, animatedFields } from './utils/data';
import styles from './styles.module.scss';

const AdvantagesItems = ({ advantages: advantagesList, animatedFields: animatedFieldsList }) => {
  const switchRender = ({ field }, adv) => { // TODO create separate component
    switch (field) {
    case 'img':
      return (
        <Illustration
          src={adv.image}
          alt={adv.title}
          layout="responsive"
          width={400}
          height={400}
          containerClasses={styles.imageContainer}
          isStatic
        />
      );
    case 'title':
      return (
        <p className={styles.title}>
          {adv.title}
        </p>
      );
    case 'desc':
      return (
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: adv.desc }}
        />
      );
    default:
      return null;
    }
  };

  return (
    <div className={styles.advantagesContainer}>
      {advantagesList?.map((adv) => {
        const items = animatedFieldsList?.map((animated, index) => (
          <Animated
            {...animated}
            transitionDelay={animated.transitionDelay(index)}
            key={`fields/${animated.field}/${adv.title}`}
          >
            {switchRender(animated, adv)}
          </Animated>
        ));

        return (
          <div
            className={styles.advItem}
            key={`advantages/${adv.title}`}
          >
            {adv.to ? (
              <LinkWrapper
                isLocalLink
                dynamicRouting={adv.to}
                path={adv.to}
              >
                {items}
              </LinkWrapper>
            ) : items}
          </div>
        );
      })}
    </div>
  );
};

AdvantagesItems.defaultProps = {
  advantages,
  animatedFields,
};

AdvantagesItems.propTypes = {
  advantages: PropTypes.instanceOf(Array),
  animatedFields: PropTypes.instanceOf(Array),
};

export default AdvantagesItems;
