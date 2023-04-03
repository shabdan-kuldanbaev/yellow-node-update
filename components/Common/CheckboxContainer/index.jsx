import PropTypes from 'prop-types';
import LinkWrapper from 'components/Common/LinkWrapper';
import styles from './styles.module.scss';

const CheckboxContainer = ({
  text,
  isThereLink,
  linkText,
  handleOnChange,
}) => {
  const handleOnChangeCheckbox = (e) => handleOnChange(e);

  return (
    <label
      className={styles.checkbox}
      htmlFor="checkbox"
    >
      <span>{text}</span>
      {isThereLink && (
        <span className={styles.link}>
          <LinkWrapper
            path="/privacy-policy"
            isLocalLink
          >
            {linkText}
          </LinkWrapper>
        </span>
      )}
      <input
        id="checkbox"
        type="checkbox"
        onChange={handleOnChangeCheckbox}
      />
      <span className={styles.checkmark} />
    </label>
  );
};

CheckboxContainer.defaultProps = {
  isThereLink: false,
  linkText: '',
  handleOnChange: null,
};

CheckboxContainer.propTypes = {
  text: PropTypes.string.isRequired,
  isThereLink: PropTypes.bool,
  linkText: PropTypes.string,
  handleOnChange: PropTypes.func,
};

export default CheckboxContainer;
