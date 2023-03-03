import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionFetchingStarted } from 'redux/reducers/subscription';
import { selectSubscribeMessage } from 'redux/selectors/subscription';

const useProps = ({ downloadLink, ...props }) => {
  const dispatch = useDispatch();

  const message = useSelector(selectSubscribeMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      dirtyFields,
      isValid,
    },
    getValues,
  } = useForm({ reValidateMode: 'onBlur' });

  const handleButtonClick = handleSubmit((values) => {
    dispatch(subscriptionFetchingStarted({ ...values, pathname: 'white_paper_mvp' }));
    reset();
    window.open(downloadLink, '_newtab');
  });

  const isButtonDisabled = !getValues().name || !getValues().lastName || !getValues().email || !isValid;

  return {
    ...props,
    register,
    dirtyFields,
    isButtonDisabled,
    message,
    handleButtonClick,
  };
};

export default useProps;
