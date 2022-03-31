import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import { CallToAction } from 'components/Common/CallToAction';
import CardImage from 'components/AppDevelopmentCommon/CardsSection/CardImage';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { getCardsProps } from './utils/cardsHelper';
import styles from './styles/styles.module.scss';

export const CardsSection = ({
  sectionData,
  handleOnCTAClick,
  pageType,
  sectionType,
}) => {
  const {
    title,
    description,
    subtitle,
    cardsList,
    link,
    view,
    animatedProps,
  } = getCardsProps(sectionData);

  if (!cardsList || !cardsList.length) {
    return null;
  }

  return (
    <div className={cn(styles[pageType], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <div className={cn(styles.cardsList, styles[sectionType])}>
          {cardsList.map((card, index) => {
            const {
              title: typeTitle,
              contentList,
              text,
              images,
              imagesBundles,
            } = getDocumentFields(
              card,
              [
                'title',
                'description',
                'contentList',
                'text',
                'images',
                'imagesBundles',
              ],
            );
            const imageUrl = getFileUrl(get(images, '[0]'));
            const svgType = get(contentList, '[0]');

            return (
              <Animated
                key={`cards/${typeTitle}`}
                {...animatedProps}
                transitionDelay={400 + 50 * index}
              >
                <CardImage
                  imageUrl={imageUrl}
                  svgType={svgType}
                  className={styles.imageWrapper}
                />
                <div className={styles.cardContent}>
                  <div className={styles.typeTitle}>
                    {typeTitle}
                  </div>
                  <ContentfulParser document={text} />
                </div>
                {imagesBundles && imagesBundles.map((image) => (
                  <img
                    src={getFileUrl(image)}
                    alt=""
                    className={styles.imagesBundle}
                  />
                ))}
              </Animated>
            );
          })}
        </div>
        {link && (
          <Animated
            {...animatedProps}
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
      </div>
    </div>
  );
};

CardsSection.defaultProps = {
  handleOnCTAClick: () => {},
};

CardsSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
  sectionType: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};
