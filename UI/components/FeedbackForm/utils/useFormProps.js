import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { addThousandsSeparators } from 'utils/helper';
import { budget as budgetData, marks } from './data';

export default (props) => {
  const {
    isBudgetSlider,
    type,
    sendEmail,
    contactFormError,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      dirtyFields,
      isValid,
      isSubmitSuccessful,
    },
  } = useForm();

  const [budget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const router = useRouter();

  const sliderOptions = {
    ...budgetData,
    defaultValue: budgetData.min,
    step: 20000,
    onChange: (event, value) => setBudget(addThousandsSeparators(value)),
    marks,
  };

  const submitHandler = handleSubmit((values) => {
    const attachments = selectedFiles.map((file) => file.signedUrl);
    sendEmail({
      ...values,
      attachments,
      projectBudget: budget || '',
    });

    if (isSubmitSuccessful) {
      setFiles([]);
      setBudget(addThousandsSeparators(budgetData.min));
      reset({
        name: '',
        email: '',
        description: '',
      });

      router.push('/');
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
    contactFormError,
  };
};
