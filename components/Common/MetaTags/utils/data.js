import { rootUrl } from 'utils/helper';
import { ROUTES } from 'utils/constants';

export const ogMetaData = [
  {
    pageName: ROUTES.homepage.slug,
    title: 'Yellow',
    description: 'We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: rootUrl,
  },
  {
    pageName: ROUTES.portfolio.slug,
    title: 'Portfolio | Yellow',
    description: 'Take a glance at the cool products we\'ve created. Web and mobile applications that we love',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: `${rootUrl}${ROUTES.portfolio.path}`,
  },
  {
    pageName: ROUTES.process.slug,
    title: 'Process | Yellow',
    description: 'We kick ass on everything from mobile to AI. Seriously. Click to learn how!',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: `${rootUrl}${ROUTES.process.path}`,
  },
  {
    pageName: ROUTES.blog.slug,
    title: 'Blog | Yellow',
    description: 'Tech blog from the Yellow team about everything from engineering to design. Get a new post every 2 weeks!',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: `${rootUrl}${ROUTES.blog.path}`,
  },
  {
    pageName: ROUTES.company.slug,
    title: 'Company | Yellow',
    description: 'Meet the team behind our web and mobile apps. Skilled techies and great people. Yellow - we are the people!',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: `${rootUrl}${ROUTES.company.path}`,
  },
  {
    pageName: ROUTES.contact.slug,
    title: 'Contact | Yellow',
    description: 'Reach out for a free consultation on how to build a great app!',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: `${rootUrl}${ROUTES.contact.path}`,
  },
  {
    pageName: ROUTES.notFound.slug,
    title: '404 | Yellow',
    description: 'Whoops! Looks like something is wrong. The page you were looking for doesnt exist',
    keywords: 'Yellow, We build great web and mobile apps for startups and businesses. Reach out for a free consultation!',
    url: rootUrl,
  },
];
