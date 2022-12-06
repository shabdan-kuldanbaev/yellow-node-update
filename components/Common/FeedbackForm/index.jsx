import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Animated from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import Upload from 'components/Common/Upload';
import Input from 'UI/components/Input';
import { selectError } from 'redux/selectors/contact';
import { sendEmail } from 'redux/actions/contact';
import { ANIMATED_TYPE, ROUTES } from 'utils/constants';
import { addThousandsSeparators } from 'utils/helper';
import { API } from 'utils/api';
import { withValidateEmail } from 'hocs/withValidateEmail';
import FormContainer from './FormContainer';
import { SliderWrapper } from './SliderWrapper';
import { budget, marks } from './utils/data';
import styles from './styles.module.scss';

const FeedbackForm = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  isChooseBudget,
  budget: budgetData,
  formKey,
  contactFormError,
  type,
  sendEmail: sendFeedback,
}) => {
  const { asPath } = useRouter();
  const formRef = useRef(null);
  const sliderRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const [projectDescription, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [formHeight, setFormHeight] = useState(500);
  const sliderSettings = {
    ...budgetData,
    defaultValue: budgetData.min,
    step: 20000,
    onChange: (event, value) => setBudget(addThousandsSeparators(value)),
    marks,
  };
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };
  const isContactPage = asPath === ROUTES.contact.path;
  const isAllFilesUploaded = !selectedFiles.some((file) => !file.isUploaded);

  const updateSelectedFileInfo = (signedUrl) => {
    const filesArray = selectedFiles.map((file) => {
      if (file.signedUrl === signedUrl) {
        file.isUploaded = true;
      }

      return file;
    });

    setFiles([...filesArray]);
  };
  const clearForm = () => {
    setFullName('');
    setBudget(addThousandsSeparators(budgetData.min));
    setFiles([]);
    setDescription('');
    setIsDisabled(false);
    handleOnEmailChange({ target: { value: '' } });

    if (sliderRef && sliderRef.current) {
      sliderRef.current.getElementsByClassName('MuiSlider-thumb')[0].style.left = '0%';
      sliderRef.current.getElementsByClassName('MuiSlider-track')[0].style.width = '0%';
    }
  };
  const handleOnNameChange = ({ target: { value } }) => setFullName(value);
  const handleOnDescriptionChange = ({ target: { value } }) => setDescription(value);
  const handleOnSelectedFilesChange = async ({ target: { files } }) => {
    try {
      const arrFiles = [];

      for (let i = 0; i < files.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const { data: signedUrl } = await API.getFileSignedURL(files[i].name);

        arrFiles.push({
          file: files[i],
          signedUrl,
          isUploaded: false,
        });
      }

      setFiles([...selectedFiles, ...arrFiles]);
    } catch (error) {
      console.error('Error in the handleOnSelectedFilesChange function', { error });
    }
  };
  const handleOnUnpinFile = ({ target: { dataset } }) => {
    setFiles(selectedFiles.filter((selectedFile) => selectedFile.file.name !== dataset.fileName));
  };
  const handleOnSubmitClick = (e) => {
    e.preventDefault();

    const filesUrls = selectedFiles.map((file) => file.signedUrl);

    sendFeedback({
      name: fullName,
      email: email.value,
      description: projectDescription,
      attachments: filesUrls,
      projectBudget: projectBudget || '',
    });
  };

  useEffect(() => {
    if (formRef && formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, [
    selectedFiles,
    projectDescription,
    formRef,
  ]);

  useEffect(() => {
    // TODO rework this check
    if (!fullName || !email.value || !email.isValidate || !projectDescription || (selectedFiles.length && !isAllFilesUploaded)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    email,
    fullName,
    projectDescription,
    isAllFilesUploaded,
    selectedFiles.length,
  ]);

  // TODO move <div className={styles.feedbackForm} ref={feedbackFormBlockRef}> to the FormContainer
  return (
    <div
      className={styles.feedbackForm}
      style={{ height: `${formHeight}px` }}
    >
      <FormContainer
        formRef={formRef}
        clearForm={clearForm}
      >
        <div className={styles.inputs}>
          <Animated
            {...animatedProps}
            transitionDelay={500}
          >
            <Input
              value={fullName}
              handleOnChange={handleOnNameChange}
              placeholder="Name *"
              type="text"
              isRequired
              isWithoutLabel
              isContactPage={isContactPage}
              style={type}
            />
          </Animated>
          <Animated
            {...animatedProps}
            transitionDelay={550}
          >
            <Input
              value={email.value}
              handleOnChange={handleOnEmailChange}
              placeholder="Email *"
              isRequired
              type="email"
              handleOnBlurEmail={handleOnBlurEmail}
              isWithoutLabel
              style={type}
            />
          </Animated>
        </div>
        {isChooseBudget && (
          <Animated
            {...animatedProps}
            transitionDelay={600}
          >
            <div className={cn(styles.budget, {
              [styles.initialBudget]: projectBudget.length === 1,
            })}
            >
              {projectBudget.length > 1
                ? (
                  <>
                    <span>Your budget is up to </span>
                    <span className={styles.price}>
                      {`$ ${projectBudget}`}
                    </span>
                    {projectBudget === addThousandsSeparators(budgetData.max) && <span> or more</span>}
                  </>
                )
                : <span>Your budget</span>}
              <SliderWrapper
                {...sliderSettings}
                ref={sliderRef}
              />
            </div>
          </Animated>
        )}
        <Animated
          {...animatedProps}
          transitionDelay={650}
        >
          <Upload
            projectDescription={projectDescription}
            selectedFiles={selectedFiles}
            handleOnDescriptionChange={handleOnDescriptionChange}
            handleOnSelectedFilesChange={handleOnSelectedFilesChange}
            handleOnUnpinFile={handleOnUnpinFile}
            formKey={formKey}
            updateSelectedFileInfo={updateSelectedFileInfo}
            style={type}
          />
        </Animated>
        {contactFormError && (
          <span className={styles.errorMessage}>
            There was an error trying to send your message. Please try again later
          </span>
        )}
        <Animated
          {...animatedProps}
          transitionDelay={700}
        >
          <ButtonMore
            href="/"
            title="Contact Us"
            buttonStyle={styles.submit}
            handleOnClick={handleOnSubmitClick}
            isDisabled={isDisabled}
            disabledButtonStyle={styles.disabled}
          />
        </Animated>
      </FormContainer>
    </div>
  );
};

FeedbackForm.defaultProps = {
  isChooseBudget: false,
  budget,
  formKey: '',
  contactFormError: '',
  type: '',
};

FeedbackForm.propTypes = {
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  isChooseBudget: PropTypes.bool,
  budget: PropTypes.instanceOf(Object),
  formKey: PropTypes.string,
  contactFormError: PropTypes.string,
  type: PropTypes.string,
  sendEmail: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ contactFormError: selectError(state) }),
  { sendEmail },
)(withValidateEmail(FeedbackForm));
