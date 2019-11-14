import React, { useState } from 'react';
import Slider from 'rc-slider';
import { addThousandsSeparators } from 'utils/helper';
import { services, budget } from './utils/data';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

const FeedbackForm = () => {
  const [selectedFiles, setFile] = useState([]);
  const [projectBudget, setBudget] = useState(addThousandsSeparators(budget.min));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleOnChange = ({ target: { files } }) => {
    const arrFiles = [];
    for (let i = 0; i < files.length; i += 1) arrFiles.push(files[i]);
    setFile(arrFiles);
  };

  const handleOnClick = ({ target: { classList } }) => {
    classList.toggle(styles.selected);
  };

  const handleOnUnpinFile = ({ target: { dataset } }) => {
    setFile(selectedFiles.filter(file => file.name !== dataset.fileName));
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
    step: null,
    onChange: handleOnSliderChange,
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <input
          type="text"
          placeholder="Your full name"
          value={fullName}
          onChange={handleOnNameChange}
        />
        <input
          type="text"
          placeholder="Your email address"
          value={email}
          onChange={handleOnEmailChange}
        />
      </div>
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
      <div className={styles.budget}>
        <span>Your budget is up to </span>
        <span className={styles.price}>{`$ ${projectBudget}`}</span>
        <Slider {...sliderSettings} />
      </div>
      <div className={styles.uploadFile}>
        <div className={styles.attachmentManage}>
          <input type="text" placeholder="About your project" />
          <label htmlFor="files">Attach</label>
          <input
            id="files"
            type="file"
            onChange={handleOnChange}
            multiple
            className={styles.hide}
          />
        </div>
        <div className={styles.attachedFiles}>
          {selectedFiles.map((file, index) => (
            <div className={styles.file} key={`file/${index}`}>
              <span>{file.name}</span>
              <span>{file.size}</span>
              <button
                data-file-name={file.name}
                type="button"
                onClick={handleOnUnpinFile}
              >
                X
              </button>
            </div> 
          ))}
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
