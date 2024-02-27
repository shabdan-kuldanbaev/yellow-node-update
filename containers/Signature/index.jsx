'use client';

import Head from 'next/head';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { getSignatureProps } from 'containers/Signature/utils/helpers';
import SignatureGenerate from 'containers/Signature/SignatureGenerate';
import SignatureGenerated from 'containers/Signature/SignatureGenerated';
import styles from './styles.module.scss';

const SignatureGenerator = async ({ data: main }) => {
  const formRef = useRef(null);
  const signatureContainer = useRef(null);
  const {
    signatureGeneratorTitle,
    inputsList,
    signatureGeneratedTitle,
    titledList,
    images,
  } = getSignatureProps(main.contentModules);

  const [
    currentSignatureTitle,
    setCurrentSignatureTitle,
  ] = useState(signatureGeneratorTitle);

  const isTitleChanged = currentSignatureTitle === signatureGeneratedTitle;

  return (
    <>
      <Head>
        <meta
          name="robots"
          content="noindex,follow"
        />
        <title>Signature generator</title>
      </Head>
      <div className={cn(styles.signature, { [styles.signatureWithGenerated]: isTitleChanged })}>
        <h2 className={styles.signatureTitle}>
          {currentSignatureTitle}
        </h2>
        {isTitleChanged ? (
          <SignatureGenerated
            titledList={titledList}
            signatureContainer={signatureContainer}
            formRef={formRef}
            images={images}
          />
        ) : (
          <SignatureGenerate
            formRef={formRef}
            setCurrentSignatureTitle={setCurrentSignatureTitle}
            signatureGeneratedTitle={signatureGeneratedTitle}
            inputsList={inputsList}
          />
        )}
      </div>
    </>
  );
};

export default SignatureGenerator;
