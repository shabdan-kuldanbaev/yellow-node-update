import cn from 'classnames';
import React, { useRef, useState } from 'react';
import { SignatureButtonNames } from 'containers/Signature/utils/constants';
import { Svg } from 'components/Common/Svg';
import { connect } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const get = require('lodash/get');

const SignatureGenerator = ({ pageData: { main } }) => {
  const formRef = useRef(null);
  const [updateTrigger, setUpdateTrigger] = useState({});
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
  const [currentSignatureTitle,
    setCurrentSignatureTitle,
  ] = useState(signatureGeneratorTitle);
  const {
    title: signatureGeneratedTitle,
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
        {currentSignatureTitle}
      </h2>
      {currentSignatureTitle === signatureGeneratorTitle ? (
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentSignatureTitle(signatureGeneratedTitle);
          }}
        >
          {inputsList.map((element, index) => {
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
              <div className={styles['signature-input-container']}>
                <input
                  className={styles['signature-input']}
                  type={type}
                  placeholder={placeholder}
                  onChange={() => {
                    setUpdateTrigger({});
                  }}
                  required={index !== 3}
                />
                <Svg
                  type="cross"
                  className={cn(styles['signature-svg'], { [styles['signature-svg-hidden']]: !!(formRef.current && formRef.current[index].value) })}
                  handleOnClick={(e) => {
                    formRef.current[index].value = '';
                    setUpdateTrigger({});
                  }}
                />
              </div>
            );
          })}
          <p className={styles['signature-requered-fields']}>
            * - Required fields
          </p>
          <div className={styles['signature-button-container']}>
            <button
              type="submit"
              className={styles['signature-button']}
            >
              {
                SignatureButtonNames[0]
              }
            </button>
          </div>
        </form>
      )
        : (
          <div>
            <button
              className={styles['signature-button']}
            >
              {
                SignatureButtonNames[1]
              }
            </button>
          </div>
        )}
      <div>
        <Svg
          type="browser"
        />
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
