'use client';

import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Button from 'UI/components/Button';
import { Figures } from 'UI/components/Figures';
import CallToAction from 'UI/components/CallToAction';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const ContentfulParser = dynamic(() => import('components/BlogCommon/Article/ContentfulParser'));

const PlainTextSection = (props) => {
  const {
    title,
    description,
    subtitle,
    view,
    type,
    text,
    hasSeeMoreButton,
    onClickMoreButton,
    isSeeMore,
    figuresData,
    handleOnCTAClick,
    ctaLink,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.plainText, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <SectionTitle
            title={title}
            subtitle={subtitle}
            description={description}
            titleStyle={styles.titleStyle}
          />
          {text && (
            <Animated {...REVEAL_ANIMATION_PROPS}>
              <div className={cn(styles.text, { [styles.seeMore]: isSeeMore })}>
                <ContentfulParser document={text} />
              </div>
            </Animated>
          )}
          {hasSeeMoreButton && (
            <Button
              className={styles.seeMoreButton}
              onClick={onClickMoreButton}
            >
              See more
            </Button>
          )}
          {figuresData && (
            <Figures
              type={type}
              figuresData={figuresData}
            />
          )}
        </div>

        {!!Object.keys(ctaLink).length && (
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

PlainTextSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlainTextSection;
