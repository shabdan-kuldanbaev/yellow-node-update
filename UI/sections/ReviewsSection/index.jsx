import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SwiperSlide } from 'swiper/react';
import Animated from 'components/Common/Animated';
import SectionTitle from 'UI/components/SectionTitle';
import CallToAction from 'UI/components/CallToAction';
import CustomSwiper from 'UI/containers/CustomSwiper';
import Review from 'UI/components/Cards/Review';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useReviewsSection from './utils/useReviewsSection';
import styles from './styles.module.scss';

const ReviewsSection = (props) => {
  const {
    reviews,
    type,
    title,
    description,
    ctaLink,
    handleOnCTAClick,
    swiperParams,
  } = useReviewsSection(props);

  return (
    <section className={cn(styles.reviews, styles[type])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <CustomSwiper
          swiperParams={swiperParams}
          isShowNavigation
        >
          {reviews?.map((review) => (
            <SwiperSlide>
              <Review
                className={styles.review}
                {...review}
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>

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
