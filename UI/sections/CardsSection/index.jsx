import CallToAction from 'components/Common/CallToAction';
import SectionTitle from 'UI/components/SectionTitle';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Card from 'UI/components/Cards/Card';
import useCardsSection from './utils/useCardsSection';
import styles from './CardsSection.module.scss';

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
  } = useCardsSection(props);

  return (
    <section className={className}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <div className={styles.cardList}>
          {cardList.map((card, i) => (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              delay={50 * i}
            >
              <Card
                key={i}
                className={styles.card}
                {...card}
              />
            </Animated>
          ))}
        </div>

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

export default CardsSection;
