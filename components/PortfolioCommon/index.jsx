import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  PreviewImage,
  withScroll,
} from 'components';
import { ROUTES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  gaSend,
} from 'utils/helper';
import { animatedFields } from './utils';
import { FieldsWrapper } from './FieldsWrapper';
import styles from './styles.module.scss';

const Portfolio = ({
  works,
  maxScrollPosition,
  animatedFields: animatedFieldsList,
}) => {
  const maxPosition = useRef(0);

  useEffect(() => () => {
    gaSend(
      'event',
      'Scroll',
      `${maxPosition.current}%`,
      ROUTES.portfolio.path,
      {
        nonInteraction: maxPosition.current < 50,
      },
    );
  }, []);

  useEffect(() => {
    maxPosition.current = maxScrollPosition;
  }, [maxScrollPosition]);

  return (
    <div className={styles.worksContainer}>
      {works && works.map((work, index) => {
        const { previewImage, title, description } = getDocumentFields(
          work,
          ['previewImage', 'title', 'description'],
        );

        return (
          <div
            className={styles.work}
            key={`works/${title}`}
            data-index={index}
          >
            <div className={styles.workWrapper}>
              <div className={styles.desc}>
                {animatedFieldsList && animatedFieldsList.map((animated) => (
                  <Animated {...animated} key={`fields/${title}/${animated.field}`}>
                    <FieldsWrapper
                      animated={animated}
                      title={title}
                      description={description}
                    />
                  </Animated>
                ))}
              </div>
              <PreviewImage image={getFileUrl(previewImage)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

Portfolio.defaultProps = {
  animatedFields,
};

Portfolio.propTypes = {
  works: PropTypes.instanceOf(Array).isRequired,
  animatedFields: PropTypes.instanceOf(Array),
  maxScrollPosition: PropTypes.number.isRequired,
};

export default withScroll(Portfolio);
