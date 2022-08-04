import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Slider from 'rc-slider';
import Upload from 'components/Common/Upload';
import SectionTitle from 'components/Common/SectionTitle';
import AnimatedInput from 'components/Common/AnimatedInput';
import { addThousandsSeparators } from 'utils/helper';
import { services, budget } from './utils/data';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

const FeedbackForm = () => {
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budget.min));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const budgetClassName = cn({
    [`${styles.budget}`]: true,
    [`${styles.initialBudget}`]: projectBudget.length === 1,
  });

  const handleOnClick = ({ target: { classList } }) => {
    classList.toggle(styles.selected);
  };

  const handleOnSliderChange = (value) => {
    setBudget(addThousandsSeparators(value));
  };

  const handleOnNameChange = ({ target: { value } }) => {
    setFullName(value);
  };

  const handleOnEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const sliderSettings = {
    ...budget,
    defaultValue: budget.min,
    step: 20000,
    onChange: handleOnSliderChange,
  };

  return (
    <div className={styles.formContainer}>
      <SectionTitle title="LET’S MOVE FORWARD" />
      <p>
        Fill in this form or
        <a
          href="mailto:hi@yellow.systems"
          target="_blank"
          rel="noopener noreferrer"
        >
          send us an e-email
        </a>
      </p>
      <form className={styles.form}>




        <div className={styles.services}>
          <span>Pick necessary services (optional)</span>
          <div className={styles.serviceOptions}>
            {services.map(service => (
              <button
                key={`service/${service}`}
                type="button"
                className={styles.service}
                onClick={handleOnClick}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
        <div className={budgetClassName}>
          {projectBudget.length > 1
            ? (
              <Fragment>
                <span>Your budget is up to </span>
                <span className={styles.price}>{`$ ${projectBudget}`}</span>
                {projectBudget === addThousandsSeparators(budget.max) && <span> or more</span>}
              </Fragment>
            )
            : <span>Your budget</span>
          }
          <Slider {...sliderSettings} />
        </div>




        <div className={styles.inputs}>
          <AnimatedInput
            value={fullName}
            handleOnChange={handleOnNameChange}
            placeholder="Your full name"
          />
          <AnimatedInput
            value={email}
            handleOnChange={handleOnEmailChange}
            placeholder="Your email"
          />
        </div>
        <Upload />
        <div className={styles.checkboxContainer}>
          <label className={styles.checkbox}>
            <span>I accept your</span>
            <Link href="/privacy-policy">
                <span className={styles.link}>Privacy Policy</span>
            </Link>
            <input type="checkbox" />
            <span className={styles.checkmark} />
          </label>
          <label className={styles.checkbox}>
            <span>Send me NDA</span>
            <input type="checkbox" />
            <span className={styles.checkmark} />
          </label>
        </div>
        <button type="submit" className={styles.submit}>Send</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
