import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { getSignatureProps } from 'containers/Signature/utils/helpers';
import SignatureGenerate from 'containers/Signature/SignatureGenerate';
import SignatureGenerated from 'containers/Signature/SignatureGenerated';
import { selectComponents } from 'redux/selectors/layout';
import styles from './styles.module.scss';

const SignatureGenerator = ({ pageData: { main } }) => {
  const formRef = useRef(null);
  const signatureContainer = useRef(null);
  const {
    signatureGeneratorTitle,
    inputsList,
    signatureGeneratedTitle,
    titledList,
    yellowUrl,
    telegramUrl,
    bottomText,
  } = getSignatureProps(main);

  const [
    currentSignatureTitle,
    setCurrentSignatureTitle,
  ] = useState(signatureGeneratorTitle);

  const isTitleChanged = currentSignatureTitle === signatureGeneratedTitle;

  return (
    <div className={cn(styles.signature, { [styles.signatureWithGenerated]: isTitleChanged })}>
      <h2 className={styles.signatureTitle}>
        {currentSignatureTitle}
      </h2>
      {isTitleChanged ? (
        <SignatureGenerated
          titledList={titledList}
          signatureContainer={signatureContainer}
          yellowUrl={yellowUrl}
          formRef={formRef}
          telegramUrl={telegramUrl}
          bottomText={bottomText}
        />

      )
        : (
          <SignatureGenerate
            formRef={formRef}
            setCurrentSignatureTitle={setCurrentSignatureTitle}
            signatureGeneratedTitle={signatureGeneratedTitle}
            inputsList={inputsList}
          />
        )}
    </div>
  );
};

SignatureGenerator.propTypes = {
  pageData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ pageData: selectComponents(state) }),
)(SignatureGenerator);
