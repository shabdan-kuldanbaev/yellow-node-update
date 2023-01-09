import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addThousandsSeparators } from 'utils/helper';
import { budget as budgetData, marks } from './data';

export default (props) => {
  const {
    formKey,
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
      isDirty,
      isValid,
    },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  const [budget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);

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

    setFiles([]);
    setBudget(addThousandsSeparators(budgetData.min));
    reset({
      name: '',
      email: '',
      description: '',
    });
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
    formKey,
    isBudgetSlider,
    isDirty,
    isValid,
    contactFormError,
  };
};
