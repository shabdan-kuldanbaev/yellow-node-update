import React, {
  useState,
  Fragment,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import cn from 'classnames';
import {
  Upload,
  AnimatedInput,
  ButtonMore,
  Animated,
} from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { addThousandsSeparators } from 'utils/helper';
import { withValidateEmail } from 'hocs';
import { budget } from './utils/data';
import styles from './styles.module.scss';
import 'rc-slider/assets/index.css';

const FeedbackForm = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  isChooseBudget,
  budget: budgetData,
  handleOnClick,
  formKey,
}) => {
  const [fullName, setFullName] = useState('');
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const [projectDescription, setDescription] = useState('');
  const [isSendNDAChecked, setIsSendNDAChecked] = useState(false); // TODO check it and remove from here if unused
  const [isDisabled, setIsDisabled] = useState(false);
  const sliderSettings = {
    ...budgetData,
    defaultValue: budgetData.min,
    step: 20000,
    onChange: (value) => setBudget(addThousandsSeparators(value)),
  };
  const animatedProps = {
    type: ANIMATED_TYPE.isCustom,
    translateY: '2.82352941em',
    opasityDuration: 1,
    transformDuration: 1,
  };

  const handleOnNameChange = ({ target: { value } }) => setFullName(value);
  const handleOnDescriptionChange = ({ target: { value } }) => setDescription(value);
  const handleOnSelectedFilesChange = ({ target: { files } }) => {
    const arrFiles = [];
    for (let i = 0; i < files.length; i += 1) arrFiles.push(files[i]);
    setFiles(arrFiles);
  };
  const handleOnUnpinFile = ({ target: { dataset } }) => {
    setFiles(selectedFiles.filter((file) => file.name !== dataset.fileName));
  };
  const handleOnSubmitClick = () => handleOnClick(
    fullName,
    email.value,
    projectDescription,
    selectedFiles,
    isSendNDAChecked,
    projectBudget,
  );

  useEffect(() => {
    if (!fullName || !email.value || !projectDescription) setIsDisabled(true);
    else setIsDisabled(false);
  }, [email, fullName, projectDescription]);

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <Animated {...animatedProps} transitionDelay={500}>
          <AnimatedInput
            value={fullName}
            handleOnChange={handleOnNameChange}
            placeholder="Name *"
            isValidate
            isWithoutLabel
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
            <Slider {...sliderSettings} />
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
    </form>
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
};

export default withValidateEmail(FeedbackForm);
