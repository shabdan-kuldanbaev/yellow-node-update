import { getStaticImages } from 'utils/helper';

const {
  techCrunch,
  time,
  productHunt,
  esquire,
  theWeek,
} = getStaticImages().partnersIcons;

export const partners = [
  {
    title: 'tech-crunch',
    image: techCrunch,
  },
  {
    title: 'time',
    image: time,
  },
  {
    title: 'product-hunt',
    image: productHunt,
  },
  {
    title: 'esquire',
    image: esquire,
  },
  {
    title: 'the-week',
    image: theWeek,
  },
];
