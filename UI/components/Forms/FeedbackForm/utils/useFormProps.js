import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addThousandsSeparators } from 'utils/helper';
import visitData from 'utils/gaMetrics/getGaMetrics';
import { budget as budgetData, marks } from './data';

export default ({
  className,
  isBudgetSlider,
  type,
  sendEmail,
  contactFormError,
  isDataSubmitted,
  isFormPending,
}) => {
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
    sendEmail({
      ...values,
      source: sourceMetrics?.source,
      medium: sourceMetrics?.medium,
      attachments,
      projectBudget: budget || '',
    });
  });

  useEffect(() => {
    if (isDataSubmitted) {
      setFiles([]);
      setBudget(addThousandsSeparators(budgetData.min));
      reset({
        name: '',
        email: '',
        description: '',
      });
    }
  }, [isDataSubmitted, reset]);

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
    contactFormError,
    isDataSubmitted,
    isFormPending,
    className,
  };
};
