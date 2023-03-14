import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import get from 'lodash/get';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import Animated from 'components/Common/Animated';
import CardsSlider from 'components/Common/CardsSlider';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { getCardsProps } from './utils/cardsHelper';
import styles from './styles.module.scss';

const CaseStudyOverlayProcess = ({ data, type }) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  if (!data?.contentModules) {
    return null;
  }

  const {
    cardsList,
    animatedProps,
  } = getCardsProps(data);

  return (
    <div className={cn(styles[type])}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={cn(styles.cardsList)}>
        <CardsSlider
          isMobileResolution={isMobileResolution}
          type={type}
        >
          {cardsList.map((card, index) => {
            const {
              title: cardTitle,
              text,
              images,
            } = getDocumentFields(
              card,
              [
                'title',
                'text',
                'images',
              ],
            );
            const imageUrl = getFileUrl(get(images, '[0]'));

            return (
              <Animated
                {...animatedProps}
                transitionDelay={400 + 50 * index}
                key={`cards/${cardTitle}`}
              >
                <div className={styles.cardContainer}>
                  <div className={styles.imageContainer}>
                    <Illustration
                      className={styles.image}
                      src={imageUrl}
                      alt={cardTitle}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.typeTitle}>
                      {cardTitle}
                    </h3>
                  </div>
                  <div className={styles.overlay}>
                    <h3 className={styles.typeTitle}>
                      {cardTitle}
                    </h3>
                    <ContentfulParser document={text} />
                  </div>
                </div>
              </Animated>
            );
          })}
        </CardsSlider>
      </div>
    </div>
  );
};

CaseStudyOverlayProcess.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseStudyOverlayProcess;
