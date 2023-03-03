import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsSubscribed, selectSubcibePending } from 'redux/selectors/subscription';
import downloadFile from 'utils/downloadFile';

const useProps = ({ downloadLink, show, ...props }) => {
  const isSubscribed = useSelector(selectIsSubscribed);
  const isPending = useSelector(selectSubcibePending);

  useEffect(() => {
    if (!isSubscribed || !show || isPending) {
      return;
    }

    downloadFile(downloadLink);
  }, [isSubscribed, isPending, show, downloadLink]);

  return ({
    isSubscribed,
    show,
    ...props,
  });
};

export default useProps;
