import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
  Animated,
  PreviewImage,
  withScroll,
} from 'components';
import { ROUTES } from 'utils/constants';
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
    label: ROUTES.portfolio,
    nonInteraction: maxPosition.current < 50,
  }), []);

  useEffect(() => {
    maxPosition.current = maxScrollPosition;
  }, [maxScrollPosition]);

  const switchRender = ({ field }, work) => {
    switch (field) {
    case 'name':
      return <h1>{work.name}</h1>;
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
      {works && works.map((work, index) => (
        <div
          className={styles.work}
          key={`works/${work.name}`}
          data-index={index}
        >
          <div className={styles.workWrapper}>
            <div className={styles.desc}>
              {animatedFields && animatedFields.map((animated) => (
                <Animated {...animated}>
                  {switchRender(animated, work)}
                </Animated>
              ))}
            </div>
            <PreviewImage image={work.image} />
          </div>
        </div>
      ))}
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
