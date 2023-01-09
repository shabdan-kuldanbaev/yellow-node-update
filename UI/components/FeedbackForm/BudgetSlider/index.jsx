import React from 'react';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { addThousandsSeparators } from 'utils/helper';
import { budget as budgetData } from '../utils/data';
import { SliderComponent } from './utils/slider';
import styles from './styles.module.scss';

const BudgetSlider = ({ budget, sliderOptions }) => (
  <Animated
    {...REVEAL_ANIMATION_PROPS}
    transitionDelay={100}
  >
    <div className={styles.budgetSlider}>
      {budget?.length > 1
        ? (
          <>
            <span>Your budget is up to </span>
            <span className={styles.budget}>
              {`$ ${budget}`}
            </span>
            {budget === addThousandsSeparators(budgetData.max) && <span> or more</span>}
          </>
        )
        : <span>Your budget</span>}
      <SliderComponent {...sliderOptions} />
    </div>
  </Animated>
);

export default BudgetSlider;
