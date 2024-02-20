import { useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'store/selectors/layout';
import AnimatedInput from 'components/Common/AnimatedInput';
import ButtonMore from 'components/Common/ButtonMore';
import { ANIMATED_TYPE } from 'utils/constants';
import { withValidateEmail } from 'hocs/withValidateEmail';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Subscribe = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
}) => {
  const isMobileResolution = useSelector(selectIsMobile);

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

Subscribe.propTypes = {
  isMobileResolution: PropTypes.bool,
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
};

export default withValidateEmail(Subscribe);
