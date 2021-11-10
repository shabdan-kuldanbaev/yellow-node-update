import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getEmployeeInfo } from 'containers/Signature/utils/helpers';
import { SIGNATURE_BUTTON_NAMES } from 'containers/Signature/utils/constants';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import styles from './styles.module.scss';

const SignatureGenerated = ({
  titledList,
  signatureContainer,
  yellowUrl,
  formRef,
  telegramUrl,
  bottomText,
}) => {
  const {
    employee,
    employeeJob,
    employeeMail,
    employeeTelegram,
  } = getEmployeeInfo(formRef);

  const selectElementContents = () => {
    let range;
    let sel;

    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      range.selectNode(signatureContainer.current);
      sel.addRange(range);
    }

    document.execCommand('Copy');
    sel.removeAllRanges();
  };

  return (
    <Fragment>
      <div
        className={styles.signatureGenerated}
      >
        <div className={styles.signatureHeader}>
          <Svg
            className={styles.signatureHeaderBrowser}
            type="browser"
          />
          <div className={styles.signatureSubHeader}>
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
          className={styles.signatureContainer}
        >
          <hr />
          <table>
            <tbody>
              <tr>
                <td className={styles.signatureLogoContainer}>
                  <LinkWrapper
                    isLocalLink={false}
                    path="https://yellow.systems"
                  >
                    <img
                      width="64"
                      src={yellowUrl}
                      alt="yellow logo"
                    />
                  </LinkWrapper>
                </td>
                <td className={styles.signatureData}>
                  <p
                    className={styles.signatureDataEmployee}
                  >
                    {employee}
                  </p>
                  <p
                    className={styles.signatureDataJob}
                  >
                    {employeeJob}
                  </p>
                  <p
                    className={styles.signatureDataEmail}
                  >
                    <LinkWrapper
                      isLocalLink={false}
                      path={`mailto:${employeeMail}`}
                    >
                      {employeeMail}
                    </LinkWrapper>
                  </p>
                  <p className={styles.signatureDataYellow}>
                    <LinkWrapper
                      isLocalLink={false}
                      path="https://yellow.systems"
                    >
                      https://yellow.systems
                    </LinkWrapper>
                  </p>
                  {employeeTelegram && (
                    <LinkWrapper
                      isLocalLink={false}
                      path={`https://t.me/${employeeTelegram.substring(1)}`}
                    >
                      <img
                        width="24"
                        src={telegramUrl}
                        alt="telegram"
                      />
                    </LinkWrapper>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <br />
          <table className={styles.signatureBottomContainer}>
            <tbody>
              <tr>
                <td className={styles.signatureBottom}>
                  {bottomText}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        type="button"
        className={styles.signatureButton}
        onClick={selectElementContents}
      >
        {SIGNATURE_BUTTON_NAMES[1]}
      </button>
    </Fragment>
  );
};

export default SignatureGenerated;

SignatureGenerated.defaultProps = {
  signatureContainer: null,
  formRef: null,
};

SignatureGenerated.propTypes = {
  titledList: PropTypes.instanceOf(Object).isRequired,
  signatureContainer: PropTypes.instanceOf(Object),
  formRef: PropTypes.instanceOf(Object),
  yellowUrl: PropTypes.string.isRequired,
  telegramUrl: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
};
