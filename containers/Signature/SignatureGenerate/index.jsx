import React from 'react';
import PropTypes from 'prop-types';
import { getInputsData } from 'containers/Signature/utils/helpers';
import { SIGNATURE_BUTTON_NAMES } from 'containers/Signature/utils/constants';
import SignatureInput from 'containers/Signature/SignatureInput';
import styles from './styles.module.scss';

const SignatureGenerate = ({
  formRef,
  setCurrentSignatureTitle,
  signatureGeneratedTitle,
  inputsList,
}) => {
  const onFormSubmit = (event) => {
    event.preventDefault();
    setCurrentSignatureTitle(signatureGeneratedTitle);
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
    >
      {inputsList.map((inputItem, index) => {
        const { placeholder, type } = getInputsData(inputItem);

        return (
          <SignatureInput
            key={index}
            type={type}
            placeholder={placeholder}
            formRef={formRef}
            index={index}
          />
        );
      })}
      <div className={styles.signatureRequeredFieldsContainer}>
        <p className={styles.signatureRequeredFields}>
          * - Required fields
        </p>
      </div>
      <div className={styles.signatureButtonContainer}>
        <button
          type="submit"
          className={styles.signatureButton}
        >
          {SIGNATURE_BUTTON_NAMES[0]}
        </button>
      </div>
    </form>
  );
};

export default SignatureGenerate;

SignatureGenerate.defaultProps = {
  formRef: null,
};

SignatureGenerate.propTypes = {
  formRef: PropTypes.instanceOf(Object),
  setCurrentSignatureTitle: PropTypes.func.isRequired,
  signatureGeneratedTitle: PropTypes.string.isRequired,
  inputsList: PropTypes.instanceOf(Object).isRequired,
};
