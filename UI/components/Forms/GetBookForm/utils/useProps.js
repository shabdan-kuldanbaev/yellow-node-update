import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';
import usePageClusters from 'hooks/usePageClusters';
import downloadFile from 'utils/downloadFile';

const useProps = ({
  downloadLink,
  isOpen,
  ...props
}) => {
  const pathname = usePathname();

  const pageClusters = usePageClusters();

  const [
    subscribe,
    {
      data: { isSubscribed } = {},
      isLoading,
      error: axiosError,
    },
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
      data: { isSubscribed: isSubscribedResult } = {},
    } = await subscribe({
      ...values,
      pathname,
      pageClusters,
    });

    if (isSubscribedResult) {
      downloadFile(downloadLink);
    }
  });

  const buttonId = `${pathname}/get-book-subscribed`;

  const isButtonDisabled = !getValues().name
  || !getValues().email
  || !isValid
  || isLoading;

  const errorMessage = axiosError?.response?.data;

  return {
    ...props,
    register,
    dirtyFields,
    isButtonDisabled,
    handleButtonClick,
    isSubscribed,
    buttonId,
    errorMessage,
  };
};

export default useProps;
