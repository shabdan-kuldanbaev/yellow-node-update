import { useSelector } from 'react-redux';
import { selectIsSubscribed } from 'redux/selectors/subscribe';

const useProps = ({ ...props }) => {
  const subscribed = useSelector(selectIsSubscribed);

  return ({
    subscribed,
    ...props,
  });
};

export default useProps;
