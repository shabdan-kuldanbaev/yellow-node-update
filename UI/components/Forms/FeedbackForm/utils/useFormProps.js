import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { formSendingStarted } from 'redux/reducers/contact';
import {
  selectError,
  selectIsFormDataSent,
  selectIsFormPending,
} from 'redux/selectors/contact';
import { addThousandsSeparators } from 'utils/helper';
import visitData from 'utils/gaMetrics/getGaMetrics';
import { budget as budgetData, marks } from './data';

export default ({
  className,
  isBudgetSlider,
  type,
}) => {
  const dispatch = useDispatch();
  const contactFormError = useSelector(selectError);
  const isDataSubmitted = useSelector(selectIsFormDataSent);
  const isFormPending = useSelector(selectIsFormPending);

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
    dispatch(formSendingStarted({
      ...values,
      source: sourceMetrics?.source,
      medium: sourceMetrics?.medium,
      attachments,
      projectBudget: budget || '',
    }));
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
