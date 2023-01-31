import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import subscribe from 'redux/reducers/subscribe';

const useProps = ({ onSubmit, ...props }) => {
  const { query } = useRouter();

  const dispatch = useDispatch();

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
    dispatch(subscribe({ ...values, pathname: query }));
    reset();
    onSubmit();
  });

  const isButtonDisabled = !getValues().email || !isValid;

  return ({
    register,
    dirtyFields,
    handleButtonClick,
    isButtonDisabled,
    ...props,
  });
};

export default useProps;
