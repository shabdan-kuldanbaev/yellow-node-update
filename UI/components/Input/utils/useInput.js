import {
  useEffect,
  useRef,
  useState,
} from 'react';
import autosize from 'autosize';
import cn from 'classnames';
import styles from '../styles.module.scss';

export default (props) => {
  const {
    handleOnChange,
    isAttached,
    isTextArea,
    isRequired,
    isWithoutLabel,
    isValid,
    handleOnBlurEmail,
    errorMessage,
    style,
    value,
    type,
    placeholder,
    ...rest
  } = props;
  const Component = isTextArea ? 'textarea' : 'input';

  const inputRef = useRef();
  const [isActive, setActive] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const className = cn(props.className, styles.input, {
    [styles[style]]: style,
    [styles.isAttached]: isRequired || isAttached,
    [styles.isActive]: isActive,
    [styles.isFocus]: isFocus,
    [styles.isValid]: isDirty && !isValid,
  });

  const handleOnFocus = () => setFocus(true);

  const handleOnClick = () => {
    inputRef.current?.focus();
    setIsDirty(true);
    setActive(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
    setActive(false);

    if (type === 'email' && value !== '' && handleOnBlurEmail) handleOnBlurEmail(value);
  };

  const inputOptions = {
    value,
    id: value,
    ref: inputRef,
    type: type || 'text',
    onChange: handleOnChange,
    onClick: handleOnClick,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    placeholder: isWithoutLabel && placeholder,
  };

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current) autosize(inputRef.current);
  }, [isTextArea]);

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current && value === '') {
      if (inputRef.current?.style.height !== 'auto') inputRef.current.style.height = 'auto';
    }
  }, [value, isTextArea]);

  return ({
    Component,
    className,
    inputOptions,
    errorMessage,
    isRequired,
    isValid,
    type,
    value,
    placeholder,
    isWithoutLabel,
    ...rest,
  });
};
