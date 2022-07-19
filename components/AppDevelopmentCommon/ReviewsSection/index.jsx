import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { Animated } from 'components/Common/Animated';
import { CallToAction } from 'components/Common/CallToAction';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getReviewsProps } from './utils/reviewsHelper';
import { Reviews } from './Reviews';
import styles from './styles.module.scss';

export const ReviewsSection = ({ data, type, handleOnCTAClick }) => {
  const {
    title,
    reviews,
    link,
  } = getReviewsProps(data);

  if (!reviews.length) {
    return null;
  }

  return (
    <section className={styles[type]}>
      <SectionTitle
        title={title}
        titleStyle={styles.title}
      />
      <Reviews reviews={reviews} />
      {link && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={550}
        >
          <CallToAction
            type="card"
            title={link.title}
            buttonTitle={link.buttonTitle}
            handleOnClick={handleOnCTAClick}
            className={styles.callToAction}
          />
        </Animated>
      )}
    </section>
  );
};

ReviewsSection.defaultProps = {
  handleOnCTAClick: () => {},
};

ReviewsSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};
