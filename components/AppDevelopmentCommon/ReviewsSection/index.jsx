import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import Animated from 'components/Common/Animated';
import CallToAction from 'components/Common/CallToAction';
import { Reviews } from 'components/AppDevelopmentCommon/ReviewsSection/Reviews';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getReviewsProps } from './utils/reviewsHelper';
import styles from './styles.module.scss';

const ReviewsSection = ({
  data,
  type,
  handleOnCTAClick,
}) => {
  const {
    title,
    description,
    reviews,
    link,
  } = getReviewsProps(data);

  if (!reviews.length) {
    return null;
  }

  return (
    <section className={cn(styles.reviews, styles[type])}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <Reviews
        reviews={reviews}
        type={type}
      />
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

export default ReviewsSection;
