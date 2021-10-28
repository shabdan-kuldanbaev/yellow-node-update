import { SignatureButtonNames } from 'containers/Signature/utils/constants';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const get = require('lodash/get');

const SignatureGenerator = ({ pageData: { main } }) => {
  const {
    title: signatureGeneratorTitle = '',
    contentModules: inputsList = [],
  } = getDocumentFields(
    main[0],
    [
      'title',
      'contentModules',
    ],
  );
  const [CurrentSignatureTitle,
    setCurrentSignatureTitle,
  ] = useState(signatureGeneratorTitle);
  const {
    title: SignatureGeneratedTitle,
    contentList: titledList,
  } = getDocumentFields(
    main[1],
    [
      'title',
      'contentList',
    ],
  );

  return (
    <div className={styles.signature}>
      <h2 className={styles['signature-title']}>
        {CurrentSignatureTitle}
      </h2>
      <form>
        {inputsList.map((element) => {
          const {
            title: placeholder,
            text,
          } = getDocumentFields(
            element,
            [
              'title',
              'text',
            ],
          );
          const type = get(text, [
            'content',
            '0',
            'content',
            '0',
            'value',
          ], 'text');

          return (
            <input
              className={styles['signature-input']}
              type={type}
              placeholder={placeholder}
            />
          );
        })}
      </form>
      <p className={styles['signature-requered-fields']}>
        * - Required fields
      </p>
      <div className={styles['signature-button-container']}>
        <button className={styles['signature-button']}>
          {
            CurrentSignatureTitle === signatureGeneratorTitle
              ? SignatureButtonNames[0]
              : SignatureButtonNames[1]
          }
        </button>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(SignatureGenerator);
