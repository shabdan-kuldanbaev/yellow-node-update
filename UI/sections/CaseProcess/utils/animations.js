import { CASE_STUDIES, BOUNCE_ANIMATION_PROPS } from 'utils/constants';

export const STEP_TITLE_ANIMATION = {
  [CASE_STUDIES.mobileBudgetingApp]: {
    secondSectionView: {
      type: 'counter',
    },
  },
};

export const CARD_ANIMATION = {
  [CASE_STUDIES.mobileBudgetingApp]: {
    secondSectionView: {
      ...BOUNCE_ANIMATION_PROPS,
    },
    thirdSectionView: {
      ...BOUNCE_ANIMATION_PROPS,
    },
    fourthSectionView: {
      ...BOUNCE_ANIMATION_PROPS,
    },
  },
  'why-us': {
    firstSectionView: {
      ...BOUNCE_ANIMATION_PROPS,
    },
  },
  [CASE_STUDIES.kitchenEquipment]: {
    firstSectionView: {
      ...BOUNCE_ANIMATION_PROPS,
    },
  },
};
