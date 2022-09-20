import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getEmployeeInfo } from 'containers/Signature/utils/helpers';
import {
  SIGNATURE_BUTTON_NAMES,
  YELLOW_DOMAIN,
  YELLOW_LINK,
} from 'containers/Signature/utils/constants';
import LinkWrapper from 'components/Common/LinkWrapper';
import Svg from 'components/Common/Svg';
import styles from './styles.module.scss';

const SignatureGenerated = ({
  titledList,
  signatureContainer,
  formRef,
  images,
}) => {
  const {
    employee,
    employeeJob,
    employeeMail,
    employeePhone,
  } = getEmployeeInfo(formRef);

  const selectElementContents = () => {
    let range;
    let sel;

    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();

      if (signatureContainer.current) {
        range.selectNode(signatureContainer.current);
      }

      sel.addRange(range);
    }

    document.execCommand('Copy');
    sel.removeAllRanges();
  };

  return (
    <>
      <div className={styles.signatureGenerated}>
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
          <table>
            <tbody>
              <tr>
                <td
                  rowSpan={4}
                  className={styles.signatureLogoContainer}
                >
                  <LinkWrapper
                    isLocalLink={false}
                    path={YELLOW_LINK}
                  >
                    <img
                      src={images.yellowUrl}
                      alt="yellow logo"
                    />
                  </LinkWrapper>
                </td>
                <td
                  className={styles.signatureData}
                  colSpan={2}
                >
                  <p className={styles.signatureDataEmployee}>
                    {`${employee}, `}
                    <span className={styles.signatureDataJob}>
                      {employeeJob}
                    </span>
                  </p>
                  <p className={styles.signatureDataJob}>
                    {employeeMail}
                  </p>
                </td>
              </tr>
              <tr>
                <td className={cn(styles.signatureData, styles.signaturePhoneContainer)}>
                  <p className={styles.signatureataPhone}>
                    {employeePhone}
                  </p>
                </td>
                <td className={styles.signatureData}>
                  <p className={styles.signatureDataYellow}>
                    <LinkWrapper
                      isLocalLink={false}
                      path={YELLOW_LINK}
                    >
                      {YELLOW_DOMAIN}
                    </LinkWrapper>
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  className={cn(styles.signatureData, styles.signatureDataSocial)}
                  colSpan={2}
                >
                  <LinkWrapper
                    isLocalLink={false}
                    path="https://www.linkedin.com/company/yellow-systems/"
                  >
                    <img
                      src={images.linkedInImgUrl}
                      alt="linkedin logo"
                    />
                  </LinkWrapper>
                  <LinkWrapper
                    isLocalLink={false}
                    path="https://www.instagram.com/yellow.systems/"
                  >
                    <img
                      src={images.instagramImgUrl}
                      alt="instagram logo"
                    />
                  </LinkWrapper>
                  <LinkWrapper
                    isLocalLink={false}
                    path="https://twitter.com/yellow_systems"
                  >
                    <img
                      src={images.twitterImgUrl}
                      alt="twitter logo"
                    />
                  </LinkWrapper>
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
        {SIGNATURE_BUTTON_NAMES.copySignature}
      </button>
    </>
  );
};

SignatureGenerated.propTypes = {
  titledList: PropTypes.instanceOf(Object).isRequired,
  signatureContainer: PropTypes.instanceOf(Object).isRequired,
  formRef: PropTypes.instanceOf(Object).isRequired,
  images: PropTypes.instanceOf(Object).isRequired,
};

export default SignatureGenerated;
