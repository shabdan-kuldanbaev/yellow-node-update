import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
  Animated,
  PreviewImage,
  withScroll,
} from 'components';
import { routes } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { animatedFields } from './utils';
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
    label: routes.portfolio,
    nonInteraction: maxPosition.current < 50,
  }), []);

  useEffect(() => {
    maxPosition.current = maxScrollPosition;
  }, [maxScrollPosition]);

  const switchRender = ({ field }, work) => {
    switch (field) {
    case 'title':
      return <h1>{work.title}</h1>;
    case 'description':
      return <p>{work.description}</p>;
    // TODO case 'link':
    //   return (
    //     <LinkWrapper
    //       {...animated}
    //       className={styles.buttonWrap}
    //     >
    //       <button type="button">See full case study</button>
    //     </LinkWrapper>
    //   );
    default:
      return null;
    }
  };

  return (
    <div className={styles.worksContainer}>
      {works && works.map((work, index) => {
        const workData = getDocumentFields(work);
        const { image } = getDocumentFields(work, ['image']);
        const imageUrl = getFileUrl(image);

        return (
          <div
            className={styles.work}
            key={`works/${workData.title}`}
            data-index={index}
          >
            <div className={styles.workWrapper}>
              <div className={styles.desc}>
                {animatedFields && animatedFields.map((animated) => (
                  <Animated {...animated}>
                    {switchRender(animated, workData)}
                  </Animated>
                ))}
              </div>
              <PreviewImage image={imageUrl} />
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
