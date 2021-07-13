import { ANIMATED_TYPE } from 'utils/constants';

const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

export const animatedFields = [
  {
    field: 'phones',
    ...animatedProps,
    transitionDelay: 100,
  },
  {
    field: 'phoneNumber',
    ...animatedProps,
    transitionDelay: 150,
  },
  {
    field: 'emailTitle',
    ...animatedProps,
    transitionDelay: 200,
  },
  {
    field: 'email',
    ...animatedProps,
    transitionDelay: 250,
  },
  {
    field: 'followTitle',
    ...animatedProps,
    transitionDelay: 300,
  },
  {
    field: 'follow',
    ...animatedProps,
    transitionDelay: 350,
  },
];
