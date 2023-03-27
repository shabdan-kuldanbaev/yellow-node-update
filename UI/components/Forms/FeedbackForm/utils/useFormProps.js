import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addThousandsSeparators } from 'utils/helper';
import visitData from 'utils/gaMetrics/getGaMetrics';
import { CONTACT_CASH_KEY, useSendContactFormMutation } from 'redux/apis/dataSending';
import { budget as budgetData, marks } from './data';

export default ({
  className,
  isBudgetSlider,
  type,
}) => {
  const [sendForm, { isSuccess, isLoading, isError }] = useSendContactFormMutation({ fixedCacheKey: CONTACT_CASH_KEY });

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      dirtyFields,
      isValid,
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
    const sourceMetrics = visitData();

    const attachments = selectedFiles.map((file) => file.signedUrl);
    await sendForm({
      ...values,
      source: sourceMetrics?.source,
      medium: sourceMetrics?.medium,
      attachments,
      projectBudget: budget || '',
    });

    if (isSuccess) {
      setFiles([]);
      setBudget(addThousandsSeparators(budgetData.min));
      reset({
        name: '',
        email: '',
        description: '',
      });
    }
  });

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
    isFormPending: isLoading,
    className,
  };
};
