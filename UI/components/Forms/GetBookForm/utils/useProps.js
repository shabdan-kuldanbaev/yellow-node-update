import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from 'redux/actions/subscribe';
import { selectIsSubscribed, selectSubscribeError, selectSubscribeMessage } from 'redux/selectors/subscribe';

const useProps = ({ downloadLink, onSent, ...props }) => {
  const { query } = useRouter();

  const dispatch = useDispatch();

  const message = useSelector(selectSubscribeMessage);
  const subscribed = useSelector(selectIsSubscribed);

  useEffect(() => {
    if (!subscribed) {
      return;
    }

    window.open(downloadLink, '_newtab');
  }, [subscribed, downloadLink]);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      dirtyFields,
      isValid,
    },
    getValues,
  } = useForm({ reValidateMode: 'onBlur' });

  const handleButtonClick = handleSubmit((values) => {
    dispatch(subscribe({ ...values, pathname: query }));
  });

  const isButtonDisabled = !getValues().name || !getValues().email || !isValid;

  return {
    ...props,
    register,
    dirtyFields,
    isButtonDisabled,
    message,
    handleButtonClick,
  };
};

export default useProps;
