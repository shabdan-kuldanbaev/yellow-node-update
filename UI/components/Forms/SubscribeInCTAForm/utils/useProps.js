import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionFetchingStarted } from 'redux/reducers/subscribe';
import { selectIsSubscribed, selectSubcibePending } from 'redux/selectors/subscribe';

const useProps = ({ onSubmit, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: {
      dirtyFields,
      isValid,
    },
    getValues,
  } = useForm({ reValidateMode: 'onBlur' });

  const { query } = useRouter();

  const isFormPending = useSelector(selectSubcibePending);
  const isSubscribed = useSelector(selectIsSubscribed);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSubscribed || isFormPending) {
      return;
    }

    onSubmit();
  }, [isFormPending, isSubscribed, onSubmit]);

  const handleButtonClick = handleSubmit((values) => {
    dispatch(subscriptionFetchingStarted({ ...values, pathname: query }));
  });

  const isButtonDisabled = !getValues().email || !isValid || isFormPending;

  return ({
    register,
    dirtyFields,
    handleButtonClick,
    isButtonDisabled,
    ...props,
  });
};

export default useProps;
