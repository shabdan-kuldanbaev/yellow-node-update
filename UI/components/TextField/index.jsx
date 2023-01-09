import React from 'react';
import PropTypes from 'prop-types';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const TextField = (props) => {
  const {
    Component,
    className,
    options,
    errorMessage,
  } = useProps(props);

  return (
    <div
      className={className}
      role="textbox"
      tabIndex="0"
    >
      <Component {...options} />
      <span className={styles.error}>
        {errorMessage}
      </span>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
  errorMessage: 'Fill empty field',
};

TextField.propTypes = {
  register: PropTypes.func.isRequiredIf((props) => !props.onChange),
  onChange: PropTypes.func.isRequiredIf((props) => !props.register),
  value: PropTypes.string.isRequiredIf((props) => !props.register),
  style: PropTypes.string,
  textarea: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  classname: PropTypes.string,
  pattern: PropTypes.string,
  errorMessage: PropTypes.string,
  attached: PropTypes.bool,
};

export default TextField;
