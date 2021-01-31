import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
  Animated,
  PreviewImage,
  withScroll,
} from 'components';
import { ROUTES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { animatedFields } from './utils';
import { FieldsWrapper } from './FieldsWrapper';
import styles from './styles.module.scss';

const Portfolio = ({
  works,
  maxScrollPosition,
  animatedFields,
}) => {
  const maxPosition = useRef(0);

  useEffect(() => () => ReactGA.event({
    category: 'Scroll',
    action: `${maxPosition.current}%`,
    label: ROUTES.portfolio,
    nonInteraction: maxPosition.current < 50,
  }), []);

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
                {animatedFields && animatedFields.map((animated) => (
                  <Animated {...animated}>
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
