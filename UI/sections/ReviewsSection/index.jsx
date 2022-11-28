import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import Animated from 'components/Common/Animated';
import CallToAction from 'components/Common/CallToAction';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';
import useReviewsSection from './utils/useReviewsSection';

const ReviewsSection = (props) => {
  const {
    reviews,
    type,
    title,
    description,
    ctaLink,
    handleOnCTAClick,
  } = useReviewsSection(props);

  return (
    <section className={cn(styles.reviews, styles[type])}>
      <div className="contentContainer">
        <SectionTitle
          title={title}
          description={description}
          titleStyle={styles.titleStyle}
        />

        {ctaLink && (
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50}
          >
            <CallToAction
              type="card"
              title={ctaLink.title}
              buttonTitle={ctaLink.buttonTitle}
              handleOnClick={handleOnCTAClick}
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
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
