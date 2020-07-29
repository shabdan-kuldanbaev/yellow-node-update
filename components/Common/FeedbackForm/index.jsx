import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import cn from 'classnames';
import {
  Upload,
  AnimatedInput,
  ButtonMore,
  CheckboxContainer,
} from 'components';
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
}) => {
  const [fullName, setFullName] = useState('');
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budgetData.min));

  const handleOnNameChange = ({ target: { value } }) => setFullName(value);
  const handleOnSliderChange = (value) => setBudget(addThousandsSeparators(value));

  const sliderSettings = {
    ...budgetData,
    defaultValue: budgetData.min,
    step: 20000,
    onChange: handleOnSliderChange,
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <AnimatedInput
          value={fullName}
          handleOnChange={handleOnNameChange}
          placeholder="Name"
          isValidate
          isWithoutLabel
          isRequired
        />
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
      </div>
      {isChooseBudget && (
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
      )}
      <Upload />
      <div className={styles.checkboxContainer}>
        <CheckboxContainer
          text="I accept your"
          isThereLink
          linkText="Privacy Policy"
        />
        <CheckboxContainer text="Send me NDA" isThereLink={false} />
      </div>
      <ButtonMore
        href="/"
        title="SEND"
        buttonStyle={styles.submit}
      />
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
