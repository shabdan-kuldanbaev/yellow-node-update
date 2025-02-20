import { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const SignatureInput = ({
  type,
  placeholder,
  formRef,
  index,
}) => {
  const [isSvgVisible, setSvgVisible] = useState(false);

  const onResetSvgClick = () => {
    if (formRef.current && formRef.current[index]) {
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

SignatureInput.propTypes = {
  formRef: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default SignatureInput;
