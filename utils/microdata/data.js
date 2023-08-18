import { rootUrl } from 'utils/helper';
import { IMAGES, ROUTES } from 'utils/constants';
import {
  ADDRESS,
  EMAIL_LINK,
  PHONE_NUMBER,
  SOCIAL_MEDIA,
} from 'utils/constants/contacts';
import { getPageUrl, context } from './utils';

const defaultDescription = '✔ We provide software development services for startups and businesses. ✔ Reach out for a free consultation!';

const nameData = {
  name: 'Yellow',
  alternateName: 'Yellow Systems',
};

const SERVICE_CATEGORY = {
  fintech: 'Fintech Development Services',
  mobile: 'Mobile Development Services',
  web: 'Web Development Services',
};

export const logoUrl = `${rootUrl}${IMAGES.roundLogo}`;

export const addresses = [
  {
    '@type': 'PostalAddress',
    ...ADDRESS.us,
    telephone: PHONE_NUMBER.us,
  },
  {
    '@type': 'PostalAddress',
    ...ADDRESS.cy,
  },
  {
    '@type': 'PostalAddress',
    ...ADDRESS.ar,
  },
  {
    '@type': 'PostalAddress',
    ...ADDRESS.pl,
  },
];

export const CATEGORY = {
  [ROUTES.lendingSoftwareDevelopment.slug]: SERVICE_CATEGORY.fintech,
  [ROUTES.mvpDevelopment.slug]: SERVICE_CATEGORY.mobile,
  [ROUTES.cloudDevelopment.slug]: SERVICE_CATEGORY.web,
  [ROUTES.tradingSoftwareDevelopment.slug]: SERVICE_CATEGORY.fintech,
  [ROUTES.aiDevelopment.slug]: SERVICE_CATEGORY.web,
  [ROUTES.mlDevelopment.slug]: SERVICE_CATEGORY.web,
  [ROUTES.dataScienceDevelopment.slug]: SERVICE_CATEGORY.web,
  [ROUTES.discoveryPhase.slug]: SERVICE_CATEGORY.web,
  [ROUTES.erpDevelopment.slug]: SERVICE_CATEGORY.web,
  [ROUTES.customChatApp.slug]: SERVICE_CATEGORY.web,
};

export const OFFERS = {
  [ROUTES.lendingSoftwareDevelopment.slug]: [
    {
      name: 'P2P lending solutions development',
      description: 'Empower your P2P lending platform with our top-notch software development services, '
      + 'designed to enhance user experience and maximize profitability.',
    }, {
      name: 'Crowdfunding platforms development',
      description: 'Transform your crowdfunding vision into reality with our expert software development '
      + 'services that deliver seamless and secure platforms tailored to your unique needs.',
    }, {
      name: 'Credit risk reporting',
      description: 'Optimize your credit risk management strategy with our comprehensive credit risk reporting '
      + 'software, designed to provide accurate insights and actionable recommendations.',
    }, {
      name: 'Mortgage solutions development ',
      description: 'Streamline the mortgage process and improve customer experience with our customized '
      + 'software development solutions for mortgage lenders and brokers.',
    }, {
      name: 'Document management software development',
      description: 'Efficiently manage your documents with our robust and scalable software development '
      + 'solutions that automate document processing, storage, and retrieval.',
    }, {
      name: 'Loans management software development',
      description: 'Take control of your loan portfolio with our flexible and secure software development '
      + 'solutions that streamline loan origination, servicing, and collections. ',
    },
  ],
  [ROUTES.mvpDevelopment.slug]: [
    {
      name: 'Business analysis',
      description: 'Prior to the MVP creation process, our team researches your app idea, business model, '
      + 'target audience, and competitors in order to assess the market demands and preferences.',
    }, {
      name: 'MVP prototyping',
      description: 'A prototype is essential for the development of a real-world MVP. It reveals the '
      + 'potential errors in the core design so that the team can fix them quickly and economically.',
    }, {
      name: 'MVP UI/UX design',
      description: 'An MVP may not be a full product, but it still requires design work so that users can '
      + 'try it and provide substantive feedback.',
    }, {
      name: 'MVP development',
      description: 'We will support you in the creation, launch, and post-release support of an MVP. '
      + "Then, if you decide to continue working toward a full-scale project, we'll be ready.",
    }, {
      name: 'MVP quality assurance',
      description: "Your product's MVP will be tested with the same set of tools we use for full-scale "
      + "projects. That way, we'll ensure that the MVP functions correctly.",
    }, {
      name: 'MVP launch and support',
      description: 'The Yellow team is ready to help you enter the market with your MVP so that you can '
      + 'smoothly and efficiently up-scale the project to meet your needs.',
    },
  ],
  [ROUTES.cloudDevelopment.slug]: [
    {
      name: 'Cloud migration',
      description: 'Our specialists work closely with your team to migrate apps and infrastructures to '
      + "the cloud. We use proven and trusted migration methods to ensure your data's integrity and safety.",
    }, {
      name: 'Cloud-native development',
      description: 'Integrating cloud technology into your business will positively affect the core metrics '
      + 'and facilitate scaling up and maintenance. We will help you realize the maximum potential of cloud-based solutions.',
    }, {
      name: 'Cloud Computing Architecture',
      description: 'Proper cloud architecture ensures all critical processes are correctly connected with '
      + 'one another. We create service-oriented architectures to organize data flows.',
    }, {
      name: 'Cloud app UI/UX design ',
      description: 'If your cloud app needs to be designed from scratch or requires a redesign to meet user '
      + 'needs and optimize flow, our team will take care of it.',
    }, {
      name: 'Cloud app testing',
      description: 'We plan the testing process and conduct both manual and automated tests to make sure '
      + 'your cloud application will function as it should when delivered to the market.',
    }, {
      name: 'Cloud app management',
      description: 'Efficient management and maintenance of a cloud app is a key factor in its success. '
      + 'We are prepared to organize the ideal management solutions to help you easily scale up your business.',
    },
  ],
  [ROUTES.tradingSoftwareDevelopment.slug]: [
    {
      name: 'Automated trading software development',
      description: 'Allows financial institutions and professionals to profit from a wider range of '
      + 'financial markets more quickly and easily',
    }, {
      name: 'Stock trading software development',
      description: 'Our trading system development is user-friendly, secure, and compatible with '
      + 'multiple operating systems and devices by request.',
    }, {
      name: 'Security and data protection strategies',
      description: 'To ensure that your business meets all requirements in the fast-changing and '
      + 'extremely challenging world of FinTech.',
    }, {
      name: 'Custom investment software development ',
      description: 'With cutting-edge development tools developed by Yellow, you can make sure '
      + 'your client satisfaction ratings and the number of great investment decisions will grow.',
    }, {
      name: 'Data analysis',
      description: 'Data is the new gold, especially in the FinTech market. Our custom solutions '
      + 'make it comprehensive, which helps you make better trading decisions.',
    }, {
      name: 'Cloud Computing',
      description: 'Going cloud means more security and ease of use for your product. Many businesses '
      + 'opt for cloud computing instead of worrying about hardware updates and get access online within seconds. ',
    },
  ],
  [ROUTES.aiDevelopment.slug]: [
    {
      name: 'Natural Language Processing',
      description: 'This AI development service can be used to build voice assistants, gather data '
      + 'about meaning and emotions, and build a more efficient communication strategy.',
    }, {
      name: 'Custom AI applications',
      description: 'Whether you want to analyze medical data, prepare a recommendation list for users, '
      + 'predict prices for sales and marketing strategy, and reach any other of your business goals, our '
      + 'specialists will analyze your requirements and create a perfect custom solution for them.',
    }, {
      name: 'Computer vision',
      description: 'Computer vision works almost like a human eye. It enables a machine to identify, '
      + 'process, recognize, and understand all types of objects in images and videos. Yellow’s AI software '
      + 'developers will help you integrate computer vision into your application, website, or platform.',
    }, {
      name: 'Data analytics',
      description: 'The process of structuring and analyzing data can be significantly sped up by implementing '
      + 'artificial intelligence and machine learning algorithms. AI app development will ensure you receive '
      + 'valuable insights and get organized reports with ease.',
    }, {
      name: 'Neural networks',
      description: 'A neural network is a set of algorithms that is trained to notice underlying relationships '
      + 'in data and conduct predictive analysis.',
    }, {
      name: 'Chatbots',
      description: 'Our artificial intelligence developers are experienced in building AI-based chatbots '
      + 'for websites and mobile apps. A chatbot empowered by AI algorithms can boost your customer service’s '
      + 'productivity and positively affect user experience.',
    },
  ],
  [ROUTES.mlDevelopment.slug]: [
    {
      name: 'Machine learning development',
      description: 'We offer advanced ML and neural network development for businesses of every scale from '
      + 'small local startups to multinational enterprises. Specialists from Yellow are ready to build a '
      + 'solution that will meet your needs and improve the processes you want to address.',
    }, {
      name: 'Big data analysis',
      description: 'Working with big data will provide you with definite patterns and valuable insights for '
      + 'your sales and marketing teams. The Yellow team will build a suitable AI and machine learning solution '
      + 'that will analyze raw data accurately.',
    }, {
      name: 'Predictive algorithms',
      description: 'Predictive analysis is a powerful tool for almost any business. With the help of your '
      + 'existing data and ML models, you can predict the behavior of your customers and market conditions '
      + 'in order to prepare for changes in advance.',
    }, {
      name: 'Computer vision',
      description: 'This service processes real-world photos and videos with capable algorithms. It can be '
      + 'used in a variety of applications and perform countless functions ranging from face detection to vehicle tracking. ',
    }, {
      name: 'Natural language processing (NLP)',
      description: 'Machine learning solutions based on natural language processing algorithms can be used '
      + 'for apps in various industries such as IoT, healthcare, smart homes, and business workflow optimization.',
    }, {
      name: 'AI-powered chatbots',
      description: 'Chatbots are automated solutions that empower your customer service, facilitate communication '
      + 'with your clients, and boost internal workflow. They can work with the help of scripts, but AI-based '
      + 'solutions are more personalized and efficient.',
    },
  ],
  [ROUTES.dataScienceDevelopment.slug]: [
    {
      name: 'Image recognition',
      description: 'Data science can help your security software recognize faces, identify emotions, '
      + 'and determine the number of objects on the image.',
    }, {
      name: 'Personalization',
      description: 'With the help of big data and business intelligence, you can see the patterns of user '
      + 'behavior and recommend new content to people based on their preferences.',
    }, {
      name: 'Route optimization',
      description: 'Machine learning and deep learning solutions will provide drivers with the most efficient '
      + 'way to deliver the load based on traffic, weather, and GPS.',
    }, {
      name: 'Price prediction',
      description: "Using predictive analytics, it's possible to predict the price of a real estate property "
      + 'with the help of data science and machine learning algorithms.',
    },
  ],
  [ROUTES.discoveryPhase.slug]: [
    {
      name: 'Risk reduction',
      description: 'A discovery phase will provide you and your team with the necessary data to decide '
      + 'whether to continue development. You will know about possible risks and be prepared for them.',
    }, {
      name: 'User validation',
      description: 'When you have a clickable prototype on your hands, you can do more than just show '
      + 'it to stakeholders or investors; you can also beta test groups of your target audience to receive real user feedback.',
    }, {
      name: 'Cost reduction',
      description: 'The discovery phase in software development is not costly compared to the full-scale '
      + 'process, so if you decide that the idea is not worth the risk, your final expenses will be minimal.',
    }, {
      name: 'Transparent goals',
      description: 'A discovery phase will give your team a clear understanding of the project. They will know '
      + 'why each feature is needed and what user pain point it solves.',
    },
  ],
  [ROUTES.erpDevelopment.slug]: [
    {
      name: 'ERP consulting services',
      description: 'It all starts with a detailed and careful analysis of your current business environment to '
      + 'identify where it needs the help of a custom ERP solution. The findings allow us to formulate strategies '
      + 'to integrate and migrate critical ERP software.',
    }, {
      name: 'Custom ERP development',
      description: 'To automate and speed up business processes, make them more transparent and get insights from '
      + 'them, we develop custom ERP solutions for enterprises of different sizes and from different industries. '
      + 'They are scalable and are available from different kinds of devices.',
    }, {
      name: 'Expert ERP implementation',
      description: "Yellow's skilled and experienced specialists will deploy your custom ERP system with data "
      + "integrity and zero downtime. You'll get a comprehensive and easy-to-use system that is aimed at simplifying "
      + 'the business management and taking it to the next level.',
    }, {
      name: 'ERP application development',
      description: 'This module makes working with data easy as one-two-three from any device. Usually, web apps '
      + 'give the full functionality, desktop apps are suitable for certain software modules that require complex UI, '
      + 'and mobile apps are great if you need data on-the-go to make decisions fast and stay updated.',
    }, {
      name: 'Human Resource management',
      description: "There's no longer need in creating multiple folders to create, implement and store contracts "
      + 'and other documents. With the HRM module, you can assign and manage tasks, schedule calls, get comprehensive '
      + 'reports, and much more.',
    }, {
      name: 'Seamless data migration',
      description: 'We use next-gen technologies to make data migration from your current ERP platform to a new one '
      + 'easy and smooth. Since the security of the data is of primary importance for all businesses today, we adopt '
      + 'the newest strategies to ensure that this process is 100% safe and secure.',
    }, {
      name: 'ERP dashboards',
      description: 'Having all critical information from multiple reports displayed in one screen is priceless. '
      + 'Collected data is used to track KPIs and performance, enable predictive analytics, get insights and facilitate '
      + 'decision-making process.',
    }, {
      name: 'ERP system support and maintenance',
      description: 'ERP development services usually include support and maintenance because business needs change fast, '
      + "just like today's business environment. That said, the ERP system may also need some adjustments for better functioning.",
    },
  ],
  [ROUTES.customChatApp.slug]: [
    {
      name: 'Communication',
      description: 'You can easily stay in touch with friends, family and colleagues, share text and multimedia '
      + 'messages, make audio and video calls, and much more.',
    }, {
      name: 'Sales',
      description: 'Having an instant messaging app is a great way to connect with customers. It makes communication '
      + 'quick, clear and thorough, ensuring a comfortable purchase experience.',
    }, {
      name: 'Customer Service',
      description: "With customer service chat, you'll demonstrate the willingness to help customers with their "
      + 'issues and solve them as quickly as possible.',
    },
  ],
};

export const webpageMicrodata = {
  '@context': context,
  '@type': 'WebPage',
  ...nameData,
};

export const professionalServiceMicrodata = {
  address: addresses,
  '@context': context,
  '@type': 'ProfessionalService',
  ...nameData,
  url: getPageUrl(),
  sameAs: Object.values(SOCIAL_MEDIA).map((item) => item.link),
  priceRange: '$$-$$$$',
  telephone: PHONE_NUMBER.us,
  email: EMAIL_LINK,
};

export const localBusinessMicrodata = {
  '@context': context,
  '@type': 'LocalBusiness',
  ...nameData,
  description: defaultDescription,
  address: addresses,
  url: rootUrl,
  image: logoUrl,
  telephone: PHONE_NUMBER.us,
  priceRange: '$$-$$$$',
  email: EMAIL_LINK,
};

export const websiteMicrodata = {
  '@context': context,
  '@type': 'WebSite',
  ...nameData,
  description: defaultDescription,
  url: getPageUrl(),
  image: logoUrl,
  sameAs: Object.values(SOCIAL_MEDIA).map((item) => item.link),
};

export const organisationMicrodata = {
  '@context': context,
  '@type': 'Organization',
  ...nameData,
  email: EMAIL_LINK,
  url: getPageUrl(),
  logo: logoUrl,
  address: addresses,
};

export const aboutPageMicrodata = {
  '@context': context,
  '@type': 'AboutPage',
  name: 'About Us | Yellow',
  description: '✔ Meet the team behind our web and mobile apps. ✔ Skilled techies and great people. Yellow - we are the people!',
  url: getPageUrl(ROUTES.company.path),
  sameAs: Object.values(SOCIAL_MEDIA).map((item) => item.link),
  image: logoUrl,
};
