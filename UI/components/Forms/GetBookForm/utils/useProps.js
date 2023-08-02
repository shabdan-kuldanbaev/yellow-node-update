import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useGetArticleQuery } from 'redux/apis/blog';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import { useFetchPageQuery } from 'redux/apis/page';
import downloadFile from 'utils/downloadFile';
import { getDocumentFields } from 'utils/helper';

const useProps = ({
  downloadLink,
  isOpen,
  ...props
}) => {
  const { query } = useRouter();
  const { slug } = query;

  const { data: { article } = {} } = useGetArticleQuery({ slug: props.slug });
  const { clusters: articleClusters } = getDocumentFields(article, ['clusters']);
  const { data: pageData = {} } = useFetchPageQuery(props.slug);
  const { clusters: pageClusters } = pageData;

  const clusters = [
    ...(articleClusters || []),
    ...(pageClusters || []),
  ];

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
      pathname: query,
      pageClusters: clusters,
    });

    if (isSubscribedResult) {
      downloadFile(downloadLink);
    }
  });

  const buttonId = `${slug}/get-book-subscribed`;

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
