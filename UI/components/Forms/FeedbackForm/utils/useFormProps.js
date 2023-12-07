import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addThousandsSeparators } from 'utils/helper';
import { CONTACT_CASH_KEY, useSendContactFormMutation } from 'redux/apis/dataSending';
import { budget as budgetData, marks } from './data';

export default ({
  className,
  isBudgetSlider,
  type,
  extraDescription,
  ...restProps
}) => {
  const [sendForm, { isSuccess, isLoading, isError }] = useSendContactFormMutation({ fixedCacheKey: CONTACT_CASH_KEY });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: {
      dirtyFields,
      isSubmitting,
    },
  } = useForm();
  const [budget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const sliderOptions = {
    ...budgetData,
    defaultValue: budgetData.min,
    step: 20000,
    onChange: (event, value) => setBudget(addThousandsSeparators(value)),
    marks,
  };

  const submitHandler = handleSubmit(async (values, event) => {
    event.preventDefault();

    const attachments = selectedFiles.map((file) => file.signedUrl);
    const attachmentsRaw = selectedFiles.map((file) => file.file);

    await sendForm({
      ...values,
      attachments,
      attachmentsRaw,
      projectBudget: budget || '',
      description: extraDescription ? `${values.description} ${extraDescription}` : values.description,
    });

    if (isSuccess) {
      setFiles([]);
      setBudget(addThousandsSeparators(budgetData.min));
      reset({
        name: '',
        email: '',
        description: '',
        phone: '',
      });
    }
  });

  const isValid = () => {
    const {
      description,
      email,
    } = getValues();

    return !!description && !!email;
  };

  return {
    type,
    register,
    submitHandler,
    dirtyFields,
    sliderOptions,
    budget,
    selectedFiles,
    setFiles,
    isBudgetSlider,
    isValid,
    contactFormError: isError,
    isDataSubmitted: isSuccess,
    isLoading,
    className,
    ...restProps,
  };
};
