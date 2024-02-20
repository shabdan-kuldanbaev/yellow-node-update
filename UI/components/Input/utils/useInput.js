import {
  useEffect,
  useRef,
  useState,
} from 'react';
import autosize from 'autosize';
import cn from 'classnames';
import { errorMessages, patterns } from './patterns';
import styles from '../styles.module.scss';

export default (props) => {
  const {
    handleOnChange,
    isAttached,
    isTextArea,
    isRequired,
    isWithoutLabel,
    handleOnBlurEmail,
    style,
    value,
    type = 'text',
    placeholder,
    ...rest
  } = props;

  const Component = isTextArea ? 'textarea' : 'input';
  const errorText = isRequired && value.length === 0 ? errorMessages.required : errorMessages[type];

  const inputRef = useRef();
  const [isFocus, setFocus] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const className = cn(props.className, styles.input, {
    [styles[style]]: style,
    [styles.isAttached]: isAttached,
    [styles.isFocus]: isFocus,
    [styles.isDirty]: isDirty,
    [styles.isWithLabel]: !isWithoutLabel,
  });

  const handleOnFocus = () => {
    inputRef.current?.focus();
    setFocus(true);
    setIsDirty(true);
  };

  const handleOnBlur = () => {
    setFocus(false);

    if (type === 'email' && value !== '' && handleOnBlurEmail) handleOnBlurEmail(value);
  };

  const inputOptions = {
    value,
    id: value,
    ref: inputRef,
    type: type || 'text',
    onChange: handleOnChange,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    required: isRequired,
    placeholder: isWithoutLabel && placeholder,
    pattern: type in patterns ? patterns[type] : null,
  };

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current) autosize(inputRef.current);
  }, [isTextArea]);

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current && value === '') {
      if (inputRef.current?.style.height !== '24px') inputRef.current.style.height = '24px';
    }
  }, [value, isTextArea]);

  return ({
    Component,
    className,
    inputOptions,
    type,
    value,
    placeholder,
    isWithoutLabel,
    isRequired,
    errorText,
    ...rest,
  });
};
