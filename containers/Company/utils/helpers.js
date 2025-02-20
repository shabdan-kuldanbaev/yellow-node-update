import { staticImagesUrls } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';

const {
  Ian,
  Jim,
  Sandro,
  Jerry,
} = staticImagesUrls.reviewsImages;
const {
  famliciousReview,
  natmReview,
  oppsitesReview,
  separateReview,
} = SVG_IMAGES_TYPES;

export const reviews = [
  {
    logo: oppsitesReview,
    avatar: Ian,
    name: 'Ian Ross',
    position: 'CEO, OppSites',
    message: `
      The new features have been well received by users. Attentive and flexible, the team excelled at responding to stakeholders in a timely matter.
      Their technical expertise allows them to propose valuable solutions.
    `,
  },
  {
    logo: famliciousReview,
    avatar: Jim,
    name: 'Jim Barkow',
    position: 'Founder, Famlicious Inc.',
    message: `
      Engaged, supportive, and invested in project success, the team offered constructive criticism, creative guidance, and honest communication.
      Their user-centered approach resulted in a unique and reliable product that operates well on all systems.
    `,
  },
  {
    logo: separateReview,
    avatar: Sandro,
    name: 'Sandro Tuzzo',
    position: 'CEO, Separate.us',
    message: `
      Because of marketing costs, the B2C application fell out of use in favor of a different B2B tool.
      Yellow was very focused on customer satisfaction, and they participated regularly in standups.
      They helped solidify features, and they thoroughly explained their process.
    `,
  },
  {
    logo: natmReview,
    avatar: Jerry,
    name: 'Jerry Sparkman',
    position: 'IT Director, National Association of Tax Professionals',
    message: `
      Yellow's development process helped them beat deadlines and respond quickly to any technical concerns that arose.
      Their ability to bring creative ideas of their own to the table made them a valuable partner.
    `,
  },
];
