import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'UI/components/Typography';
import {
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_TAGS,
} from 'UI/components/Typography/utils/useTypography';
import Button from 'UI/components/Button';
import FullScreenEstimation from 'components/Common/FullScreenEstimation';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Dropdown from 'UI/components/Dropdown';
import { useSoftwarePriceForm } from './utils/useSoftwarePriceForm';
import styles from './styles.module.scss';

const SoftwarePriceForm = (props) => {
  const {
    title,
    list,
    first,
    second,
    firstValue,
    secondValue,
    descriptionValue,
    isFullscreenEstimationOpen,
    setFirstValue,
    setSecondValue,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  } = useSoftwarePriceForm(props);

  return (
    <div className={styles.softwarePriceForm}>
      <Animated {...REVEAL_ANIMATION_PROPS}>
        <Typography
          variant={TYPOGRAPHY_TAGS.p}
          size={TYPOGRAPHY_SIZE.headline24}
          className={styles.title}
          isBold
        >
          {title}
        </Typography>
        <Typography
          variant={TYPOGRAPHY_TAGS.p}
          size={TYPOGRAPHY_SIZE.paragrapgh16}
          className={styles.listTitle}
        >
          It includes:
        </Typography>
        <ul className={styles.list}>
          {list.map((listItem, index) => (
            <li
              key={`software-price-list/${index}`}
              className={styles.listItem}
            >
              {listItem}
            </li>
          ))}
        </ul>
      </Animated>
      <form className={styles.form}>
        <Dropdown
          className={styles.dropdown}
          selected={firstValue}
          setSelected={setFirstValue}
          placeholder={first.placeholder}
          options={first.values}
        />
        <Dropdown
          className={styles.dropdown}
          selected={secondValue}
          setSelected={setSecondValue}
          placeholder={second.placeholder}
          options={second.values}
        />
        <Button
          className={styles.button}
          onClick={openFullscreenEstimation}
          disabled={!firstValue || !secondValue}
        >
          Get a quote
        </Button>
      </form>
      <FullScreenEstimation
        isFullscreenEstimation={isFullscreenEstimationOpen}
        closeFullscreenEstimation={closeFullscreenEstimation}
        extraDescription={descriptionValue}
      />
    </div>
  );
};

SoftwarePriceForm.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default SoftwarePriceForm;
