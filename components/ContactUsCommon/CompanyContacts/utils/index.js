import { animatedType } from 'utils/constants';

const animatedProps = {
  type: animatedType.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

export const animatedFields = [
  {
    field: 'contact',
    ...animatedProps,
    transitionDelay: 100,
  },
  {
    field: 'locationAdress',
    ...animatedProps,
    transitionDelay: 150,
  },
  {
    field: 'phones',
    ...animatedProps,
    transitionDelay: 200,
  },
  {
    field: 'phoneNumber',
    ...animatedProps,
    transitionDelay: 250,
  },
  {
    field: 'emailTitle',
    ...animatedProps,
    transitionDelay: 300,
  },
  {
    field: 'email',
    ...animatedProps,
    transitionDelay: 350,
  },
];
