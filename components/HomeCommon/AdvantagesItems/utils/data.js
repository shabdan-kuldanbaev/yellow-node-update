import { ANIMATED_TYPE } from 'utils/constants';
import { staticImagesUrls } from 'utils/helper';

const {
  ai,
  chats,
  cloud,
  mobile,
} = staticImagesUrls.advantagesIcons;

export const advantages = [
  {
    title: 'Mobile',
    desc: '<span>Killer features all over the place</span>',
    image: mobile,
    to: '/mobile-app-development-company',
  },
  {
    title: 'Cloud',
    desc: '<span>Sky is the limit</span>',
    image: cloud,
  },
  {
    title: 'AI',
    desc: '<span>Making machines smart again</span>',
    image: ai,
  },
  {
    title: 'Chats',
    desc: 'Our speciality is everything real-time:</br><span>chats, bots, voice, video and what have you</span>',
    image: chats,
    to: '/chat-app-development-company',
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
