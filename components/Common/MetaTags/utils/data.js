import { rootUrl } from 'utils/helper';
import { ROUTES } from 'utils/constants';

export const ogMetaData = [
  {
    pageName: ROUTES.homepage.slug,
    title: 'Software Development for Startups | Yellow',
    description: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
    url: rootUrl,
  },
  {
    pageName: ROUTES.portfolio.slug,
    title: 'Software Development Case Studies | Yellow',
    description: "✔ Over 40+ successfully delivered projects in our portfolio. ✔ Take a glance at the cool software products we've created!",
    url: `${rootUrl}${ROUTES.portfolio.path}`,
  },
  {
    pageName: ROUTES.process.slug,
    title: 'How we work, our process | Yellow',
    description: `
      Read about our software development process from the idea to launch. We kick ass on everything from mobile to AI. Click to learn how!
    `,
    url: `${rootUrl}${ROUTES.process.path}`,
  },
  {
    pageName: ROUTES.blog.slug,
    title: 'Software Development Blog | Yellow',
    description: 'Software development blog from the Yellow team about everything from engineering to design. Get a new post every 2 weeks!',
    url: `${rootUrl}${ROUTES.blog.path}`,
  },
  {
    pageName: ROUTES.company.slug,
    title: 'Company | Yellow',
    description: '✔ Meet the team behind our web and mobile apps. ✔ Skilled techies and great people. Yellow - we are the people!',
    url: `${rootUrl}${ROUTES.company.path}`,
  },
  {
    pageName: ROUTES.contact.slug,
    title: 'Contacts | Yellow',
    description: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
    url: `${rootUrl}${ROUTES.contact.path}`,
  },
  {
    pageName: ROUTES.notFound.slug,
    title: 'Not Found | Yellow',
    description: "Whoops! Looks like something is wrong. The page you were looking for doesn't exist.",
    url: rootUrl,
  },
];
