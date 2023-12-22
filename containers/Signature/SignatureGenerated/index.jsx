import PropTypes from 'prop-types';
import Image from 'next/legacy/image';
import cn from 'classnames';
import { getEmployeeInfo } from 'containers/Signature/utils/helpers';
import {
  SIGNATURE_BUTTON_NAMES,
  YELLOW_DOMAIN,
  YELLOW_LINK,
} from 'containers/Signature/utils';
import LinkWrapper from 'UI/components/LinkWrapper';
import { SOCIAL_MEDIA } from 'utils/constants/contacts';
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
                    <Image
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
                    {employee}
                  </p>
                  <p className={styles.signatureDataJob}>
                    {employeeJob}
                  </p>
                </td>
              </tr>
              <tr>
                <td className={cn(styles.signatureData, styles.signatureYellowContainer)}>
                  <LinkWrapper
                    isLocalLink={false}
                    path={YELLOW_LINK}
                    className={styles.signatureDataYellow}
                  >
                    {YELLOW_DOMAIN}
                  </LinkWrapper>
                </td>
              </tr>
              <tr>
                <td
                  className={cn(styles.signatureData, styles.signatureDataSocial)}
                  colSpan={2}
                >
                  <LinkWrapper
                    isLocalLink={false}
                    path={SOCIAL_MEDIA.linkedin.link}
                  >
                    <Image
                      src={images.linkedInImgUrl}
                      alt="linkedin logo"
                    />
                  </LinkWrapper>
                  <LinkWrapper
                    isLocalLink={false}
                    path={SOCIAL_MEDIA.instagram.link}
                  >
                    <Image
                      src={images.instagramImgUrl}
                      alt="instagram logo"
                    />
                  </LinkWrapper>
                  <LinkWrapper
                    isLocalLink={false}
                    path={SOCIAL_MEDIA.twitter.link}
                  >
                    <Image
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
