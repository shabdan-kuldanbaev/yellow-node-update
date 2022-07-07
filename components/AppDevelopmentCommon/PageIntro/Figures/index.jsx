import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATED_TYPE } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import FiguresItem from './FiguresItem';
import styles from './styles.module.scss';

export const Figures = ({ type, figuresData }) => {
  const {
    contentModules: figures,
    text,
  } = getDocumentFields(
    figuresData,
    ['contentModules', 'text'],
  );
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  if (!figures || !figures.length) {
    return null;
  }

  return (
    <div className={styles[type]}>
      {text && (
        <div className={styles.text}>
          <Animated
            {...animatedProps}
            transitionDelay={600}
          >
            <ContentfulParser document={text} />
          </Animated>
        </div>
      )}
      <div className={styles.figures}>
        {figures.map((item, index) => {
          const {
            title,
            description,
          } = getDocumentFields(
            item,
            ['title', 'description'],
          );

          const figureContent = (
            <Fragment>
              <div className={styles.title}>
                {title}
              </div>
              <div className={styles.description}>
                {description}
              </div>
            </Fragment>
          );

          return (
            <Animated
              key={`page-intro-figures/${title}`}
              {...animatedProps}
              transitionDelay={400 + 90 * index * 2}
            >
              <FiguresItem
                title={title}
                type={type}
                figureContent={figureContent}
              />
            </Animated>
          );
        })}
      </div>
    </div>
  );
};

Figures.propTypes = {
  figuresData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
