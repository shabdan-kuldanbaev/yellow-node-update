import React, {
  Fragment,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSpring, a } from '@react-spring/web';
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded';
import { connect } from 'react-redux';
import { setIsFormDataSent } from 'redux/actions/contact';
import { selectIsFormDataSent } from 'redux/selectors/contact';
import { Svg } from 'components';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const FormContainer = ({
  children,
  formRef,
  isFormDataSent,
  clearForm,
  setIsFormDataSent: setFormDataSent,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrontShown, setIsFrontShown] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: {
      mass: 5,
      tension: 300,
      friction: 80,
    },
  });

  const handleOnCloseClick = () => {
    setIsFlipped(false);
    setIsFrontShown(true);
    setFormDataSent(false);
  };

  useEffect(() => {
    if (isFormDataSent) {
      setIsFlipped(true);
      setIsFrontShown(false);
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormDataSent]);

  return (
    <Fragment>
      <a.form
        className={cn(styles.form, styles.animation)}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          zIndex: isFrontShown ? 1 : -1,
        }}
        ref={formRef}
      >
        {children}
      </a.form>
      <a.section
        className={cn(styles.alertBlock, styles.animation)}
        style={{
          opacity,
          transform,
          rotateY: '180deg',
          zIndex: isFrontShown ? -1 : 1,
        }}
      >
        <Svg
          type={SVG_IMAGES_TYPES.closeSvg}
          handleOnClick={handleOnCloseClick}
        />
        <div className={styles.content}>
          <p>
            We have received your request
            <br />
            We will be back in a flash
            <FlashOnRoundedIcon
              color="primary"
              fontSize="large"
              className={styles.flashIcon}
            />
          </p>
        </div>
      </a.section>
    </Fragment>
  );
};

FormContainer.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  formRef: PropTypes.instanceOf(Object).isRequired,
  isFormDataSent: PropTypes.bool.isRequired,
  clearForm: PropTypes.func.isRequired,
  setIsFormDataSent: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ isFormDataSent: selectIsFormDataSent(state) }),
  { setIsFormDataSent },
)(FormContainer);
