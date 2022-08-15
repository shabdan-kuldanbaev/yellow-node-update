import { ANIMATED_TYPE } from 'utils/constants';

export const advantages = [
  {
    title: 'Web application development',
    desc: 'Custom web business software solutions to meet your needs',
    icon: 'mobileDevelopmentIllustration',
    to: '/web-app-development-company',
  },
  {
    title: 'UI/UX design services',
    desc: 'Beautiful, functional, eye-pleasing, and user-friendly',
    icon: 'uiUxDevelopmentIllustration',
    to: '/ui-ux-services',
  },
  {
    title: 'Mobile',
    desc: 'Killer features all over the place',
    icon: 'mobileDevelopmentIllustration',
    to: '/mobile-app-development-company',
  },
  {
    title: 'Machine learning development',
    desc: 'Making machines smart again',
    icon: 'mlDevelopmentIllustration',
    to: '/machine-learning-development-services',
  },
  {
    title: 'MVP app development',
    desc: 'A small start is a good start',
    icon: 'mvpDevelopmentIllustration',
    to: '/mvp-app-development-company',
  },
  {
    title: 'Cloud application development',
    desc: 'The sky\'s the limit',
    icon: 'cloudDevelopmentIllustration',
    to: '/cloud-based-app-development-services',
  },
  {
    title: 'Chat app development',
    desc: 'Chats, bots, calls, and whatever you may have',
    icon: 'chatsDevelopmentIllustration',
    to: '/chat-app-development-company',
  },
  {
    title: 'Software development',
    icon: 'softDevelopmentIllustration',
    desc: 'Any software development services you need',
  },
];

const animatedProps = {
  type: ANIMATED_TYPE.isCustom,
  translateY: '2.82352941em',
  opasityDuration: 1,
  transformDuration: 1,
};

export const animatedFields = [
  {
    field: 'img',
    ...animatedProps,
    transitionDelay: (index) => 100 + 100 * index,
  },
  {
    field: 'title',
    ...animatedProps,
    transitionDelay: (index) => 100 + 100 * index,
  },
  {
    field: 'desc',
    ...animatedProps,
    transitionDelay: (index) => 100 + 100 * index,
  },
];
