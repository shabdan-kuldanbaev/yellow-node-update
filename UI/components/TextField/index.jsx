'use client';

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
    >
      <Component {...options} />
      <span
        className={styles.error}
        tabIndex="-1"
      >
        {errorMessage}
      </span>
    </div>
  );
};

TextField.propTypes = {
  register: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.func,
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
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

export default TextField;
