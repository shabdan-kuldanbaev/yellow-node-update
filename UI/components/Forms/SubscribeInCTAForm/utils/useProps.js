import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useGetArticleQuery } from 'redux/apis/blog';
import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';
import { useFetchPageQuery } from 'redux/apis/page';
import { getDocumentFields } from 'utils/helper';

const useProps = ({ ...props }) => {
  const [subscribe, { data, isLoading }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  const { data: { article } = {} } = useGetArticleQuery({ slug: props.slug });
  const { clusters: articleClusters } = getDocumentFields(article, ['clusters']);
  const { data: pageData = {} } = useFetchPageQuery(props.slug);
  const { clusters: pageClusters } = pageData;

  const clusters = [
    ...(articleClusters || []),
    ...(pageClusters || []),
  ];

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
      pageClusters: clusters,
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
