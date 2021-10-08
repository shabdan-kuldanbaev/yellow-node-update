import { rootUrl } from 'utils/helper';
import { ROUTES } from 'utils/constants';

export const ogMetaData = [
  {
    pageName: ROUTES.homepage.slug,
    metaTitle: 'Software Development for Startups | Yellow',
    metaDescription: '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!',
    url: rootUrl,
  },
  {
    pageName: ROUTES.portfolio.slug,
    metaTitle: 'Software Development Case Studies | Yellow',
    metaDescription: "✔ Over 40+ successfully delivered projects in our portfolio. ✔ Take a glance at the cool software products we've created!",
    url: `${rootUrl}${ROUTES.portfolio.path}`,
  },
  {
    pageName: ROUTES.process.slug,
    metaTitle: 'How we work, our process | Yellow',
    metaDescription: `
      Read about our software development process from the idea to launch. We kick ass on everything from mobile to AI. Click to learn how!
    `,
    url: `${rootUrl}${ROUTES.process.path}`,
  },
  {
    pageName: ROUTES.blog.slug,
    metaTitle: 'Software Development Blog | Yellow',
    metaDescription: 'Software development blog from the Yellow team about everything from engineering to design. Get a new post every 2 weeks!',
    url: `${rootUrl}${ROUTES.blog.path}`,
  },
  {
    pageName: ROUTES.company.slug,
    metaTitle: 'Company | Yellow',
    metaDescription: '✔ Meet the team behind our web and mobile apps. ✔ Skilled techies and great people. Yellow - we are the people!',
    url: `${rootUrl}${ROUTES.company.path}`,
  },
  {
    pageName: ROUTES.contact.slug,
    metaTitle: 'Contacts | Yellow',
    metaDescription: 'Do you have an awesome idea? Reach us for a free consultation on how to build a great software product for your business!',
    url: `${rootUrl}${ROUTES.contact.path}`,
  },
  {
    pageName: ROUTES.notFound.slug,
    metaTitle: 'Not Found | Yellow',
    metaDescription: "Whoops! Looks like something is wrong. The page you were looking for doesn't exist.",
    url: rootUrl,
  },
  {
    pageName: ROUTES.customChatApp.slug,
    metaTitle: 'Сhat app development company | Chat app developers | Yellow',
    metaDescription: `Yellow has more than 5+ years of dedication to the development of chat apps.
                  ✔ 10+ successfully delivered chat apps. ✔ Let's get in touch!`,
    url: `${rootUrl}${ROUTES.customChatApp.path}`,
  },
  {
    pageName: ROUTES.customMobileApp.slug,
    metaTitle: 'Custom mobile app development company | Yellow',
    metaDescription: 'The best talents for Mobile App Development are here. Hire an experienced team to work on your idea.',
    url: `${rootUrl}${ROUTES.customMobileApp.path}`,
  },
  {
    pageName: ROUTES.customWebApp.slug,
    metaTitle: 'Custom web application development company | Yellow',
    metaDescription: `Our team is ready to provide you with web development services.
    We are working with websites, PWAs, chatting applications, and landing pages.`,
    url: `${rootUrl}${ROUTES.customWebApp.path}`,
  },
  {
    pageName: ROUTES.designServices.slug,
    metaTitle: 'UI/UX design services | Yellow',
    metaDescription: `Visual content matters, that is where UI/UX design comes into play.
                      Users love good-looking software. Make mobile your app or website captivating with Yellow.`,
    url: `${rootUrl}${ROUTES.designServices.path}`,
  },
  {
    pageName: ROUTES.developmentServices.slug,
    metaTitle: 'iOS Mobile App Development Company | Yellow',
    metaDescription: 'Yellow can provide you with iOS development services. If you want to create an iPhone or iPad app, we are here to help.',
    url: `${rootUrl}${ROUTES.developmentServices.path}`,
  },
];
