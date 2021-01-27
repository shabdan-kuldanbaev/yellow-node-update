import { ANIMATED_TYPE } from 'utils/constants';
import {
  AI,
  chats,
  cloud,
  mobile,
} from '../images';

export const advantages = [
  {
    title: 'Mobile',
    desc: '<span>Killer features all over the place</span>',
    image: mobile,
  },
  {
    title: 'Cloud',
    desc: '<span>Sky is the limit</span>',
    image: cloud,
  },
  {
    title: 'AI',
    desc: '<span>Making machines smart again</span>',
    image: AI,
  },
  {
    title: 'Chats',
    desc: 'Our speciality is everything real-time:</br><span>chats, bots, voice, video and what have you</span>',
    image: chats,
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
