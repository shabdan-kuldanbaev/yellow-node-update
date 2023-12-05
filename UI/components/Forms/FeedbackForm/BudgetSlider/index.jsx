import dynamic from 'next/dynamic';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { addThousandsSeparators } from 'utils/helper';
import { budget as budgetData } from '../utils/data';
import { NewSliderComponent } from './utils/slider';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

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
      <NewSliderComponent
        className={styles.slider}
        {...sliderOptions}
      />
    </div>
  </Animated>
);

export default BudgetSlider;
