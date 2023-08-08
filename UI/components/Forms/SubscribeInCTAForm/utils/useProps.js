import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import usePageClusters from 'hooks/usePageClusters';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';

const useProps = ({ ...props }) => {
  const [subscribe, { data, isLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const pageClusters = usePageClusters(props.slug);

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
