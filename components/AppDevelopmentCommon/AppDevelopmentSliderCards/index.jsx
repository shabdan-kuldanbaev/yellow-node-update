import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';

import Animated from 'components/Common/Animated';
import CallToAction from 'components/Common/CallToAction';
import CardsSlider from 'components/Common/CardsSlider';
import CardImage from 'components/AppDevelopmentCommon/CardsSection/CardImage';
import LinkWrapper from 'components/Common/LinkWrapper';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { getCardsProps } from 'components/AppDevelopmentCommon/CardsSection/utils/cardsHelper';
import { selectIsMobileResolutions } from 'redux/selectors/layout';

import styles from './styles.module.scss';

const AppDevelopmentSliderCards = ({
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
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  if (!cardsList || !cardsList.length) {
    return null;
  }

  return (
    <section className={cn(styles[pageType], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <div className={cn(styles.cardsList, styles[sectionType])}>
          <CardsSlider isMobileResolution={isMobileResolution}>
            {cardsList.map((card, index) => {
              const {
                title: typeTitle,
                contentList,
                text,
                images,
                imagesBundles,
                contentModules,
              } = getDocumentFields(
                card,
                [
                  'title',
                  'description',
                  'contentList',
                  'text',
                  'images',
                  'imagesBundles',
                  'contentModules',
                ],
              );
              const imageUrl = getFileUrl(get(images, '[0]'));
              const svgType = get(contentList, '[0]');
              const url = get(contentModules, '[0].fields.url');

              // TODO: This looks awful but it works, I will rewrite it later, now I dont have enough time
              const Wrapper = url
                ? ((props) => <LinkWrapper {...props} />)
                // eslint-disable-next-line react/jsx-no-useless-fragment
                : (({ path, className, ...rest }) => <Fragment {...rest} />);

              return (
                <Wrapper
                  path={url}
                  className={styles.link}
                  key={`cards/${typeTitle}`}
                >
                  <Animated
                    {...animatedProps}
                    transitionDelay={400 + 50 * index}
                  >
                    <div className={styles.cardWrapper}>
                      <CardImage
                        imageUrl={imageUrl}
                        svgType={svgType}
                        className={styles.imageWrapper}
                      />
                      <div className={styles.cardContent}>
                        <h3 className={styles.typeTitle}>
                          {typeTitle}
                        </h3>
                        <ContentfulParser document={text} />
                      </div>
                      {imagesBundles && imagesBundles.map((image) => (
                        <img
                          src={getFileUrl(image)}
                          alt=""
                          className={styles.imagesBundle}
                        />
                      ))}
                    </div>
                  </Animated>
                </Wrapper>
              );
            })}
          </CardsSlider>
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
    </section>
  );
};

AppDevelopmentSliderCards.defaultProps = {
  handleOnCTAClick: () => {},
  withOverlay: false,
};

AppDevelopmentSliderCards.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
  sectionType: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
  withOverlay: PropTypes.bool,
};

export default AppDevelopmentSliderCards;
