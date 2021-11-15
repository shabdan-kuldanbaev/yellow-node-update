import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Svg } from 'components';
import styles from './styles.module.scss';

const SignatureInput = ({
  type,
  placeholder,
  formRef,
  index,
}) => {
  const [isSvgVisible, setSvgVisible] = useState(false);

  const onResetSvgClick = () => {
    if (formRef.current) {
      formRef.current[index].value = '';
      setSvgVisible(false);
    }
  };

  const onInputChange = (event) => {
    setSvgVisible(!!event.currentTarget.value);
  };

  return (
    <div className={styles.signatureInputContainer}>
      <input
        className={styles.signatureInput}
        type={type}
        placeholder={placeholder}
        onChange={onInputChange}
        required={index !== 3}
      />
      <Svg
        type="cross"
        className={cn(styles.signatureSvg, {
          [styles.signatureSvgVisible]: isSvgVisible,
        })}
        handleOnClick={onResetSvgClick}
      />
    </div>
  );
};

export default SignatureInput;

SignatureInput.defaultProps = {
  formRef: null,
};

SignatureInput.propTypes = {
  formRef: PropTypes.instanceOf(Object),
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
