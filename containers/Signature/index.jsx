import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { getCurrentValue } from 'containers/Signature/utils/helpers';
import { SignatureButtonNames } from 'containers/Signature/utils/constants';
import { Svg } from 'components/Common/Svg';
import {
  getDocumentFields,
  getFileUrl,
} from 'utils/helper';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';

import styles from './styles.module.scss';

const get = require('lodash/get');

const SignatureGenerator = ({ pageData: { main } }) => {
  const formRef = useRef(null);
  const signatureContainer = useRef(null);
  const [, setUpdateTrigger] = useState({});

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
    text: content,
    title: signatureGeneratedTitle,
    contentList: titledList,
    images,
  } = getDocumentFields(
    main[1],
    [
      'title',
      'contentList',
      'text',
      'images',
    ],
  );
  const bottomText = get(content, [
    'content',
    '0',
    'content',
    '0',
    'value',
  ], '');
  const yellowUrl = getFileUrl(images[0]);
  const telegram = getFileUrl(images[1]);

  const selectElementContents = (el) => {
    let range;
    let sel;

    if (document.createRange && window.getSelection) {
      range = document.createRange(); sel = window.getSelection();
      sel.removeAllRanges();
      range.selectNode(el);
      sel.addRange(range);
    }

    document.execCommand('Copy');
    sel.removeAllRanges();
  };

  return (
    <div className={cn(styles.signature, { [styles['signature-with-generated']]: currentSignatureTitle === signatureGeneratedTitle })}>
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
                  className={cn(styles['signature-svg'], { [styles['signature-svg-hidden']]: !!(getCurrentValue(formRef, index)) })}
                  handleOnClick={() => {
                    formRef.current[index].value = '';
                    setUpdateTrigger({});
                  }}
                />
              </div>
            );
          })}
          <div className={styles['signature-requered-fields-container']}>
            <p className={styles['signature-requered-fields']}>
              * - Required fields
            </p>
          </div>
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
          <>
            <div
              className={styles['signature-generated']}
            >
              <div className={styles['signature-header']}>
                <Svg
                  className={styles['signature-header-browser']}
                  type="browser"
                />
                <div className={styles['signature-sub-header']}>
                  {titledList.map((title, index) => (
                    <span key={index}>
                      {title}
                      {index === 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
              <div
                ref={signatureContainer}
                className={styles['signature-container']}
              >
                <hr />
                <table>
                  <tr>
                    <td className={styles['signature-logo-container']}>
                      <a
                        target="_blank"
                        href="https://yellow.systems"
                        rel="noreferrer"
                      >
                        <img
                          width="64"
                          src={yellowUrl}
                          alt=""
                        />
                      </a>
                    </td>
                    <td className={styles['signature-data']}>
                      <p
                        className={styles['signature-data-employee']}
                      >
                        {getCurrentValue(formRef, 0)}
                      </p>
                      <p
                        className={styles['signature-data-job']}
                      >
                        {getCurrentValue(formRef, 1)}
                      </p>
                      <p
                        className={styles['signature-data-email']}
                      >
                        <a href={`mailto:${getCurrentValue(formRef, 2)}`}>
                          {getCurrentValue(formRef, 2)}
                        </a>
                      </p>
                      <p className={styles['signature-data-yellow']}>
                        <a
                          target="_blank"
                          href="https://yellow.systems"
                          rel="noreferrer"
                        >
                          https://yellow.systems
                        </a>
                      </p>
                      { getCurrentValue(formRef, 3)
                        && (
                          <a
                            href={`https://t.me/${getCurrentValue(formRef, 3).substring(1)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              width="24"
                              src={telegram}
                              alt=""
                            />
                          </a>
                        )}
                    </td>
                  </tr>
                </table>
                <hr />
                <br />
                <table className={styles['signature-bottom-container']}>
                  <td className={styles['signature-bottom']}>
                    {bottomText}
                  </td>
                </table>
              </div>
            </div>
            <button
              type="button"
              className={styles['signature-button']}
              onClick={() => selectElementContents(signatureContainer.current)}
            >
              {
                SignatureButtonNames[1]
              }
            </button>
          </>
        )}
    </div>
  );
};

export default connect(
  (state) => ({
    pageData: selectComponents(state),
    metaData: selectMetaData(state),
  }),
)(SignatureGenerator);
