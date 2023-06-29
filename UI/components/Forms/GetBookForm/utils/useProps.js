import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import downloadFile from 'utils/downloadFile';

const useProps = ({
  downloadLink,
  isOpen,
  ...props
}) => {
  const { query } = useRouter();
  const { slug } = query;

  const [
    subscribe,
    { data: { isSubscribed } = {}, isLoading },
  ] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const {
    register,
    handleSubmit,
    formState: {
      dirtyFields,
      isValid,
    },
    getValues,
  } = useForm({ reValidateMode: 'onBlur' });

  const handleButtonClick = handleSubmit(async (values) => {
    const {
      data: { isSubscribed: isSubscribedResult },
    } = await subscribe({ ...values, pathname: query });

    if (isSubscribedResult) {
      downloadFile(downloadLink);
    }
  });

  const buttonId = `${slug}/get-book-subscribed`;

  const isButtonDisabled = !getValues().name
  || !getValues().email
  || !isValid
  || isLoading;

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
