import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import FiguresItem from './FiguresItem';
import useFiguresProps from './utils/useFiguresProps';
import styles from './styles.module.scss';

export const Figures = (props) => {
  const {
    text,
    type,
    figures,
  } = useFiguresProps(props);

  if (!figures || !figures?.length) return null;

  return (
    <div className={styles[type]}>
      {text && (
        <div className={styles.text}>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <ContentfulParser document={text} />
          </Animated>
        </div>
      )}
      <div className={styles.figures}>
        {figures?.map((item, index) => (
          <FiguresItem
            key={`page-intro-figures/${index}`}
            type={type}
            index={index}
            figureData={item}
          />
        ))}
      </div>
    </div>
  );
};

Figures.propTypes = {
  figuresData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};
