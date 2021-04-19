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
import delay from 'lodash/delay';
import { useSpring, a } from '@react-spring/web';
import FlashOnRoundedIcon from '@material-ui/icons/FlashOnRounded';
import { setIsCcontactsSent } from 'redux/actions/contact';
import { selectIsContactsSent } from 'redux/selectors/contact';
import {
  Upload,
  AnimatedInput,
  ButtonMore,
  Animated,
} from 'components';
import { ANIMATED_TYPE, ROUTES } from 'utils/constants';
import { addThousandsSeparators, staticImagesUrls } from 'utils/helper';
import { getFileSignedUrl } from 'utils/fileUploadingUtils';
import { withValidateEmail } from 'hocs';
import { SliderWrapper } from './SliderWrapper';
import { budget, marks } from './utils/data';
import styles from './styles.module.scss';

const FeedbackForm = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  setEmail,
  isChooseBudget,
  budget: budgetData,
  handleOnClick,
  formKey,
  isContactsSent,
  setIsCcontactsSent: setContactSent,
}) => {
  const { asPath } = useRouter();
  const formRef = useRef(null);
  const sliderRef = useRef(null);
  const feedbackFormBlockRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const [projectDescription, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrontShown, setIsFrontShown] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 300, friction: 80 },
  });
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
  const isAllFilesUploaded = selectedFiles.reduce((previousValue, file) => file.isUploaded, false);

  const getFilesUrls = () => selectedFiles.map((file) => file.signedUrl);
  const updateSelectedFilesInfo = (signedUrl) => {
    const filesArray = [...selectedFiles];
    const filesUploading = [...selectedFiles];

    filesArray.forEach((file, index) => {
      if (file.signedUrl === signedUrl) {
        file.isUploaded = true;
      }
    });

    setFiles([...filesUploading]);
  };
  const clearForm = () => {
    setFullName('');
    setBudget(addThousandsSeparators(budgetData.min));

    if (sliderRef && sliderRef.current) {
      sliderRef.current.getElementsByClassName('MuiSlider-thumb')[0].style.left = '0%';
      sliderRef.current.getElementsByClassName('MuiSlider-track')[0].style.width = '0%';
    }

    setFiles([]);
    setDescription('');
    setIsDisabled(false);
    setEmail({ value: '', isValidate: true });
  };
  const handleOnNameChange = ({ target: { value } }) => setFullName(value);
  const handleOnDescriptionChange = ({ target: { value } }) => setDescription(value);
  const handleOnSelectedFilesChange = async ({ target: { files } }) => {
    const arrFiles = [];

    for (let i = 0; i < files.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const signedUrl = await getFileSignedUrl(files[i].name);

      arrFiles.push({ file: files[i], signedUrl, isUploaded: false });
    }

    setFiles([...selectedFiles, ...arrFiles]);
  };
  const handleOnUnpinFile = ({ target: { dataset } }) => {
    setFiles(selectedFiles.filter((file) => file.file.name !== dataset.fileName));
  };
  const handleOnSubmitClick = (e) => {
    e.preventDefault();

    handleOnClick(
      fullName,
      email.value,
      projectDescription,
      getFilesUrls(),
      projectBudget,
    );
  };
  const handleOnCloseClick = () => {
    setIsFlipped(false);
    setIsFrontShown(true);
    setContactSent(false);
  };

  useEffect(() => {
    if (isContactsSent) {
      setIsFlipped(true);
      setIsFrontShown(false);
      delay(() => clearForm(), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContactsSent]);

  useEffect(() => {
    if (feedbackFormBlockRef && feedbackFormBlockRef.current && formRef && formRef.current) {
      const newHeight = formRef.current.offsetHeight;
      feedbackFormBlockRef.current.style.height = `${newHeight}px`;
    }
  });

  useEffect(() => {
    if (!fullName || !email.value || !projectDescription || (selectedFiles.length && !isAllFilesUploaded)) setIsDisabled(true);
    else setIsDisabled(false);
  }, [email, fullName, projectDescription, isAllFilesUploaded, selectedFiles.length]);

  return (
    <div className={styles.feedbackForm} ref={feedbackFormBlockRef}>
      <a.form
        className={cn(styles.form, styles.c)}
        style={{ opacity: opacity.to((o) => 1 - o), transform, zIndex: isFrontShown ? 1 : -1 }}
        ref={formRef}
      >
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
            updateSelectedFilesInfo={updateSelectedFilesInfo}
          />
        </Animated>
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
      </a.form>
      <a.section
        className={cn(styles.alertBlock, styles.c)}
        style={{
          opacity,
          transform,
          rotateY: '180deg',
          zIndex: isFrontShown ? -1 : 1,
        }}
      >
        <img
          onClick={handleOnCloseClick}
          src={staticImagesUrls.closeIcon}
          alt="Close"
        />
        <div className={styles.content}>
          <p>
            We have received your request
            {' '}
            <br />
            We will be back in a flash
            <FlashOnRoundedIcon color="primary" fontSize="large" className={styles.flashIcon} />
          </p>
        </div>
      </a.section>
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
  setEmail: PropTypes.func.isRequired,
  isChooseBudget: PropTypes.bool,
  budget: PropTypes.instanceOf(Object),
  handleOnClick: PropTypes.func.isRequired,
  formKey: PropTypes.string,
  isContactsSent: PropTypes.bool.isRequired,
  setIsCcontactsSent: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ isContactsSent: selectIsContactsSent(state) }),
  { setIsCcontactsSent },
)(withValidateEmail(FeedbackForm));
