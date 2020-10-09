import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import cn from 'classnames';
import {
  Upload,
  AnimatedInput,
  ButtonMore,
  CheckboxContainer,
  Animated,
} from 'components';
import { animatedType } from 'utils/constants';
import { addThousandsSeparators } from 'utils/helper';
import { withValidateEmail } from 'hocs';
import { budget } from './utils/data';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

const FeedbackForm = ({
  email,
  handleOnEmailChange,
  handleOnBlurEmail,
  isChooseBudget,
  budget: budgetData,
  handleOnSubmit,
}) => {
  const [fullName, setFullName] = useState('');
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budgetData.min));
  const [selectedFiles, setFiles] = useState([]);
  const [projectDescription, setDescription] = useState('');


  const handleOnNameChange = ({ target: { value } }) => setFullName(value);
  const handleOnSliderChange = (value) => setBudget(addThousandsSeparators(value));
  const handleOnDescriptionChange = ({ target: { value } }) => setDescription(value);
  const handleOnSelectedFilesChange = ({ target: { files } }) => {
    const arrFiles = [];
    for (let i = 0; i < files.length; i += 1) arrFiles.push(files[i]);
    setFiles(arrFiles);
  };
  const handleOnUnpinFile = ({ target: { dataset } }) => {
    setFiles(selectedFiles.filter((file) => file.name !== dataset.fileName));
  };

  const sliderSettings = {
    ...budgetData,
    defaultValue: budgetData.min,
    step: 20000,
    onChange: handleOnSliderChange,
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={500}
        >
          <AnimatedInput
            value={fullName}
            handleOnChange={handleOnNameChange}
            placeholder="Name"
            isValidate
            isWithoutLabel
            isRequired
          />
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={550}
        >
          <AnimatedInput
            value={email.value}
            handleOnChange={handleOnEmailChange}
            placeholder="Email"
            type="email"
            isValidate={email.isValidate}
            handleOnBlurEmail={handleOnBlurEmail}
            isWithoutLabel
            isRequired
          />
        </Animated>
      </div>
      {isChooseBudget && (
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={600}
        >
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
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={650}
      >
        <Upload
          projectDescription={projectDescription}
          selectedFiles={selectedFiles}
          handleOnDescriptionChange={handleOnDescriptionChange}
          handleOnSelectedFilesChange={handleOnSelectedFilesChange}
          handleOnUnpinFile={handleOnUnpinFile}
        />
      </Animated>
      <div className={styles.checkboxContainer}>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={700}
        >
          <CheckboxContainer
            text="I accept your"
            isThereLink
            linkText="Privacy Policy"
          />
        </Animated>
        <Animated
          type={animatedType.isCustom}
          translateY="2.82352941em"
          opasityDuration={1}
          transformDuration={1}
          transitionDelay={750}
        >
          <CheckboxContainer text="Send me NDA" isThereLink={false} />
        </Animated>
      </div>
      <Animated
        type={animatedType.isCustom}
        translateY="2.82352941em"
        opasityDuration={1}
        transformDuration={1}
        transitionDelay={800}
      >
        <ButtonMore
          href="/"
          title="SEND"
          buttonStyle={styles.submit}
          handleOnClick={() => {
            handleOnSubmit(fullName, email.value, projectDescription, selectedFiles, projectBudget);
          }}
        />
      </Animated>
    </form>
  );
};

FeedbackForm.defaultProps = {
  isChooseBudget: false,
  budget,
};

FeedbackForm.propTypes = {
  email: PropTypes.instanceOf(Object).isRequired,
  handleOnEmailChange: PropTypes.func.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  isChooseBudget: PropTypes.bool,
  budget: PropTypes.instanceOf(Object),
};

export default withValidateEmail(FeedbackForm);
