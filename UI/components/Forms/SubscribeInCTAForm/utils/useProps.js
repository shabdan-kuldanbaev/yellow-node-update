import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import usePageClusters from 'hooks/usePageClusters';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'store/apis/dataSending';

const useProps = ({ onSubscriptionFinished, ...props }) => {
  const [subscribe, { data, isLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const pageClusters = usePageClusters();

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

  const isSubscribed = data?.isSubscribed;

  const handleButtonClick = handleSubmit((values) => {
    subscribe({
      ...values,
      pathname: query,
      pageClusters,
    });

    onSubscriptionFinished();
  });

  const isButtonDisabled = !getValues().email || !isValid || isLoading;

  return ({
    register,
    dirtyFields,
    handleButtonClick,
    isButtonDisabled,
    isSubscribed,
    ...props,
  });
};

export default useProps;
