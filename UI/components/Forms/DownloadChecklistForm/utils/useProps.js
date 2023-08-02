import { useForm } from 'react-hook-form';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import { useFetchPageQuery } from 'redux/apis/page';

const useProps = ({
  downloadLink,
  pageSlug,
  ...props
}) => {
  const { data: pageData = {} } = useFetchPageQuery(pageSlug);
  const { clusters: pageClusters = [] } = pageData;

  const [subscribe, {
    data,
    error,
    isLoading,
  }] = useSubscribeMutation({
    fixedCacheKey: SUBSCRIPTION_CASH_KEY,
  });

  const message = data?.message?.data || error?.message || error;

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      touchedFields,
      isValid,
      isDirty,
    },
  } = useForm({ reValidateMode: 'onBlur' });

  const handleButtonClick = handleSubmit(async (values) => {
    await subscribe({
      ...values,
      pathname: 'white_paper_mvp',
      pageClusters,
    });

    if (error) {
      return;
    }

    reset();
    window.open(downloadLink, '_newtab');
  });

  const isButtonDisabled = !isDirty || isLoading || !isValid;

  return {
    ...props,
    register,
    touchedFields,
    isButtonDisabled,
    message,
    handleButtonClick,
  };
};

export default useProps;
