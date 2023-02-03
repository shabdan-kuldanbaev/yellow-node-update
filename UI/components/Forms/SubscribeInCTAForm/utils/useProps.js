import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from 'redux/actions/subscribe';
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
    dispatch(subscribe({ ...values, pathname: query }));
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
