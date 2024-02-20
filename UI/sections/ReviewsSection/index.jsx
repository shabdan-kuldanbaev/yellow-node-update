import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import SectionTitle from 'UI/components/SectionTitle';
import CustomSwiper from 'UI/containers/CustomSwiper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useReviewsSection from './utils/useReviewsSection';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));
const Review = dynamic(() => import('UI/components/Cards/Review'));

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
          {(reviews || []).map((review, i) => (
            <SwiperSlide key={`review/${i}`}>
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
              data={ctaLink}
              handleOnClick={handleOnCTAClick}
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </section>
  );
};

ReviewsSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default ReviewsSection;
