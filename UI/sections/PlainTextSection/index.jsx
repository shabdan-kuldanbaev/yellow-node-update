import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Button from 'UI/components/Button';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';
import { Figures } from '../../components/Figures';

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
      </div>
    </section>
  );
};

PlainTextSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlainTextSection;
