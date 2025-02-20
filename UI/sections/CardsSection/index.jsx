import cn from 'classnames';
import { SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useCardsSection from './utils/useCardsSection';
import styles from './CardsSection.module.scss';

const Card = dynamic(() => import('UI/components/Cards/Card'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));
const Animated = dynamic(() => import('UI/containers/Animated'));
const Illustration = dynamic(() => import('UI/components/Illustration'));
const CustomSwiper = dynamic(() => import('UI/containers/CustomSwiper'), { ssr: false });

const CardsSection = (props) => {
  const {
    title,
    subtitle,
    description,
    cardList,
    ctaLink,
    withSlider,
    className,
    handleOnCTAClick,
    withoutBackground,
    withOverlay,
    swiperProps,
    isShowNavigation,
    images,
  } = useCardsSection(props);

  return (
    <section className={className}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          className={styles.title}
        />

        {withSlider && (
          <CustomSwiper
            className={styles.swiperList}
            swiperParams={swiperProps}
            isShowNavigation={isShowNavigation}
            navigationClassName={styles.navigation}
          >
            {cardList.map((card, i) => (
              <SwiperSlide key={i}>
                <Card
                  className={cn(
                    styles.card,
                    styles[`card-${i + 1}`],
                  )}
                  withoutBackground={withoutBackground}
                  {...card}
                />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        )}

        {!withSlider && (
          <div className={styles.cardList}>
            {cardList.map((card, i) => (
              <Animated
                {...REVEAL_ANIMATION_PROPS}
                delay={50 * i}
                key={`card/${i}`}
              >
                <Card
                  key={i}
                  className={cn(
                    styles.card,
                    styles[`card-${i + 1}`],
                    {
                      [styles.withOverlay]: withOverlay,
                    },
                  )}
                  withoutBackground={withoutBackground}
                  {...card}
                />
              </Animated>
            ))}
          </div>
        )}

        {!!images.length
          && images.map((image) => (
            <Illustration
              src={image.url}
              key={image.url}
              className={styles.image}
            />
          ))}

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

export default CardsSection;
