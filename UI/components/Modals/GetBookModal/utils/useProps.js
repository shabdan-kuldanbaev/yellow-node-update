import { SUBSCRIPTION_CASH_KEY, useSubscribeMutation } from 'redux/apis/dataSending';

const useProps = ({
  downloadLink,
  show,
  ...props
}) => {
  const [_, { data: { isSubscribed } = {} }] = useSubscribeMutation({ fixedCacheKey: SUBSCRIPTION_CASH_KEY });

  return ({
    isSubscribed,
    show,
    downloadLink,
    ...props,
  });
};

export default useProps;
