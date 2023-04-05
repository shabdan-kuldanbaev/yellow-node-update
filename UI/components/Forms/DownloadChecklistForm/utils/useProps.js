import { useForm } from 'react-hook-form';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';

const useProps = ({ downloadLink, ...props }) => {
  const [subscribe, { data, isSuccess, error }] = useSubscribeMutation({
    fixedCacheKey: SUBSCRIPTION_CASH_KEY,
  });

  const message = data?.message?.data || error?.message || error;

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

  const handleButtonClick = handleSubmit(async (values) => {
    await subscribe({ ...values, pathname: 'white_paper_mvp' });

    if (error) {
      return;
    }

    reset();
    window.open(downloadLink, '_newtab');
  });

  const isButtonDisabled = !isSuccess && (!getValues().name || !getValues().lastName || !getValues().email || !isValid);

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
