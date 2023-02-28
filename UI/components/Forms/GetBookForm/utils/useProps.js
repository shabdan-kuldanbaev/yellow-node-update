import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from 'redux/actions/subscribe';
import { selectIsSubscribed, selectSubcibePending } from 'redux/selectors/subscribe';

const useProps = ({
  downloadLink,
  onSubmit,
  isOpen,
  ...props
}) => {
  const { query } = useRouter();
  const { slug } = query;

  const dispatch = useDispatch();

  const isPending = useSelector(selectSubcibePending);
  const isSubscribed = useSelector(selectIsSubscribed);

  useEffect(() => {
    if (!isSubscribed || !isOpen || isPending) {
      return;
    }

    onSubmit();
  }, [
    isSubscribed,
    isPending,
    onSubmit,
    isOpen,
  ]);

  const {
    register,
    handleSubmit,
    formState: {
      dirtyFields,
      isValid,
    },
    getValues,
  } = useForm({ reValidateMode: 'onBlur' });

  const handleButtonClick = handleSubmit((values) => {
    dispatch(subscribe({ ...values, pathname: query }));
  });

  const buttonId = `${slug}/get-book-subscribed`;

  const isButtonDisabled = !getValues().name
  || !getValues().email
  || !isValid
  || isPending;

  return {
    ...props,
    register,
    dirtyFields,
    isButtonDisabled,
    handleButtonClick,
    isSubscribed,
    buttonId,
  };
};

export default useProps;
