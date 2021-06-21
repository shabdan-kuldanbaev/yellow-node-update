import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import {
  ButtonMore,
  AnimatedInput,
  Animated,
} from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { withValidateEmail } from 'hocs/withValidateEmail';
import styles from './styles.module.scss';

const Subscribe = ({
  isMobileResolution,
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
}) => {
  const placeholderText = 'Email';
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholderText);
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  const handleOnFocus = () => setCurrentPlaceholder('');
  const handleOnBlur = () => setCurrentPlaceholder(placeholderText);

  return (
    <section className={styles.subscribeBlock}>
      <div className={styles.subscribe}>
        <div className={styles.content}>
          <Animated
            {...animatedProps}
            transitionDelay={100}
          >
            <span className={styles.title}>
              Don&apos;t want to miss anything?
            </span>
          </Animated>
          <Animated
            {...animatedProps}
            transitionDelay={150}
          >
            <span className={styles.subtitle}>
              Get weekly updates on the newest design stories, case studies and tips right in your mailbox.
            </span>
          </Animated>
          <div className={styles.inputBlock}>
            <Animated
              {...animatedProps}
              transitionDelay={200}
            >
              {!isMobileResolution
                ? (
                  <input
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className={styles.input}
                    type="email"
                    placeholder={currentPlaceholder}
                    value={email.value}
                    onChange={handleOnEmailChange}
                  />
                )
                : (
                  <AnimatedInput
                    value={email.value}
                    handleOnChange={handleOnEmailChange}
                    placeholder={placeholderText}
                    type="email"
                    isValidate={email.isValidate}
                    handleOnBlurEmail={handleOnBlurEmail}
                  />
                )}
            </Animated>
            <Animated
              {...animatedProps}
              transitionDelay={250}
            >
              <ButtonMore
                href="/blog"
                title="Submit"
                buttonStyle={styles.button}
              />
            </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

Subscribe.defaultProps = {
  isMobileResolution: false,
};

Subscribe.propTypes = {
  isMobileResolution: PropTypes.bool,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
};

export default compose(
  connect((state) => ({ isMobileResolution: selectIsMobileResolutions(state) })),
  withValidateEmail,
)(Subscribe);
