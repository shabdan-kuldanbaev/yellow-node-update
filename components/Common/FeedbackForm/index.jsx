import React, {
  useState,
  Fragment,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { selectError } from 'redux/selectors/contact';
import {
  Upload,
  AnimatedInput,
  ButtonMore,
  Animated,
} from 'components';
import { ANIMATED_TYPE, ROUTES } from 'utils/constants';
import { addThousandsSeparators } from 'utils/helper';
import { API } from 'utils/api';
import { withValidateEmail } from 'hocs';
import { SliderWrapper } from './SliderWrapper';
import FormContainer from './FormContainer';
import { budget, marks } from './utils/data';
import styles from './styles.module.scss';

const FeedbackForm = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  isChooseBudget,
  budget: budgetData,
  handleOnClick,
  formKey,
  contactError,
}) => {
  const { asPath } = useRouter();
  const formRef = useRef(null);
  const sliderRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const [projectDescription, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [formHeight, setFormHeight] = useState('500px'); // TODO rework it later
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

    handleOnClick(
      fullName,
      email.value,
      projectDescription,
      filesUrls,
      projectBudget,
    );
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
    <div className={styles.feedbackForm} style={{ height: `${formHeight}` }}>
      <FormContainer formRef={formRef} clearForm={clearForm}>
        <div className={styles.inputs}>
          <Animated {...animatedProps} transitionDelay={500}>
            <AnimatedInput
              value={fullName}
              handleOnChange={handleOnNameChange}
              placeholder="Name *"
              isValidate
              isWithoutLabel
              isContactPage={isContactPage}
            />
          </Animated>
          <Animated {...animatedProps} transitionDelay={550}>
            <AnimatedInput
              value={email.value}
              handleOnChange={handleOnEmailChange}
              placeholder="Email *"
              type="email"
              isValidate={email.isValidate}
              handleOnBlurEmail={handleOnBlurEmail}
              isWithoutLabel
            />
          </Animated>
        </div>
        {isChooseBudget && (
          <Animated {...animatedProps} transitionDelay={600}>
            <div className={cn(styles.budget, { [styles.initialBudget]: projectBudget.length === 1 })}>
              {projectBudget.length > 1
                ? (
                  <Fragment>
                    <span>Your budget is up to </span>
                    <span className={styles.price}>{`$ ${projectBudget}`}</span>
                    {projectBudget === addThousandsSeparators(budgetData.max) && <span> or more</span>}
                  </Fragment>
                )
                : <span>Your budget</span>}
              <SliderWrapper {...sliderSettings} ref={sliderRef} />
            </div>
          </Animated>
        )}
        <Animated {...animatedProps} transitionDelay={650}>
          <Upload
            projectDescription={projectDescription}
            selectedFiles={selectedFiles}
            handleOnDescriptionChange={handleOnDescriptionChange}
            handleOnSelectedFilesChange={handleOnSelectedFilesChange}
            handleOnUnpinFile={handleOnUnpinFile}
            formKey={formKey}
            updateSelectedFileInfo={updateSelectedFileInfo}
          />
        </Animated>
        {contactError && <span className={styles.errorMessage}>There was an error trying to send your request. Please try again later</span>}
        <Animated {...animatedProps} transitionDelay={700}>
          <ButtonMore
            href="/"
            title="SEND"
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
};

FeedbackForm.propTypes = {
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  isChooseBudget: PropTypes.bool,
  budget: PropTypes.instanceOf(Object),
  handleOnClick: PropTypes.func.isRequired,
  formKey: PropTypes.string,
  error: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    contactError: selectError(state),
  }),
)(withValidateEmail(FeedbackForm));
