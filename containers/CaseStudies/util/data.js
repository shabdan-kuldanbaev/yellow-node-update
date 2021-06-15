import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import TeamSection from 'components/CaseStudiesCommon/TeamSection';
import FeedbackForm from 'containers/Home/FeedbackForm';
import { IMAGES, CASE_STUDIES_TYPES } from 'utils/constants';

export const COMPONENTS = {
  fernwayer: [
    {
      type: CASE_STUDIES_TYPES.intro,
      data: {
        infoList: [
          {
            title: 'Time:',
            description: 'From Sep 2018 Till Now',
          },
          {
            title: 'Type:',
            description: 'Travel Social Media App',
          },
          {
            title: 'Industry:',
            description: 'Mobile App Development',
          },
          {
            title: 'Platforms:',
            description: 'iOS, Web',
          },
        ],
        appLogo: IMAGES.fernwayer.logo,
        title: 'Fernwayer',
        description: 'A social media app for those who want to experience something truly unique and for those who are ready to provide it.',
        imageUrl: IMAGES.fernwayer.image,
      },
    },
    {
      type: CASE_STUDIES_TYPES.projectIdea,
      data: {
        features: [
          {
            title: 'Profile',
            description: 'There are two types of users in Fernwayer: Travelers and Experience Makers.',
          },
          {
            title: 'Experiences',
            description: 'Experience is a unique service provided by independent guides and local travel agencies.',
          },
          {
            title: 'Stories',
            description: 'Stories in Fernwayer are posts that allow travelers to share their adventures with others.',
          },
          {
            title: 'Bookings',
            description: 'Fernwayer provides Experience Makers with an easy-to-use bookings system.',
          },
        ],
        description: 'Our client is a mature and experienced traveler. He approached us with the idea of creating a social media app that would connect travelers and experience makers, and allow both of them to share their adventures worldwide.',
        additionInformation: [
          {
            title: 'The Сlient Had',
            list: ['Initial design', 'Desired list of features'],
          },
          {
            title: 'We were responsible for',
            list: ['Further implementation of the project', 'Release', 'Post-release support'],
          },
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.team,
      data: {
        members: [
          'Art Director',
          'Project manager',
          'UX/UI designer',
          'Two iOS developers',
          'Two frontend developers',
          'Backend developer',
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.wireframe,
      header: {
        title: 'Wireframes',
        description: 'The app was designed to be as simple as possible for users to easily interact with the app, regardless of their device.',
      },
      data: [
        IMAGES.fernwayer.wireframes.first,
        IMAGES.fernwayer.wireframes.second,
      ],
    },
    {
      type: CASE_STUDIES_TYPES.image,
      header: {
        title: 'Technology Stack',
      },
      data: IMAGES.fernwayer.chart,
    },
    {
      type: CASE_STUDIES_TYPES.image,
      header: {
        title: 'For Experience Makers',
        description: 'Experience in Fernwayer is a unique service provided for travelers by independent guides and travel business owners. Travelers can like them, comment, or share on social media.',
      },
      data: IMAGES.fernwayer.experienceCard,
    },
    {
      type: CASE_STUDIES_TYPES.specialChallenges,
      data: {
        challenges: [
          {
            image: IMAGES.fernwayer.experience,
            problemTitle: 'Experience',
            problem: 'For creating a new experience, you should fill out the form describing in detail the experience you are ready to provide, from the title and location to the qualification of an experience maker or the experience’s uniqueness. After the admin review, the experience is published, and you can edit it if something changes.\n'
                + '\nAlso, you can indicate whether the experiences are private (for lone travelers), for groups (like excursions and tours), or private groups (if a traveler wants to go on a date or spend time with friends and family).',
          },
          {
            image: IMAGES.fernwayer.experienceCalendar,
            problemTitle: 'Booking system',
            problem: 'Fernwayer can synchronize with your digital calendar, \n'
                + 'or you can opt for its own booking system. Fernwayer provides you with booking based on your schedule and makes the process safe for both a Traveler and Experience Maker.\n'
                + '\nAlso, the Fernwayer booking system allows you to create events. An event is a particular case of a certain experience, with a set time, place, and list of people taking part in it. \n'
                + '\nThe app’s functionality allows you to define if the event is single-time or a part of a scheduled series, highlight the date and price. You can edit the price according to the price policy of your experience. For example, winter experiences can have a higher price during the Christmas holidays.',
          },
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.appFeatures,
      header: {
        title: 'For Independent Travelers',
      },
      data: {
        imageUrl: IMAGES.fernwayer.editStory,
        links: [
          {
            name: 'Stories',
            description: 'Stories in Fernwayer are posts that allow travelers to show their adventures to other users so they can like or comment on them. It’s possible to add a photo, indicate the uniqueness, and write a small text review about an experience. ',
          },
          {
            name: 'Community',
            description: 'The app allows travelers to find like-minded Experience Makers and Independent Travelers, comment on their stories, ask questions, and learn more about possible adventures.',
          },
          {
            name: 'Swagger score',
            description: 'When a traveler posts a Story about their once-in-a-lifetime experience, they earn “swagger points”. This reward is based on the places and the experiences travelers visited and will help them compete for a place on a Leaderboard.',
          },
          {
            name: 'Goals',
            description: 'Every year the app provides users with an annual list of goals that they can accomplish. Travelers can choose ten out of 50 goals on five levels (two goals for each level) and reach them during the year.',
          },
          {
            name: 'Dreamtrips',
            description: 'The Dream trips section is a folder where travelers can keep all the experiences they like, plan or want to buy. The value from anticipating travel is higher than material possessions.',
          },
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.image,
      header: {
        title: 'Chatting system',
        description: 'Fernwayer has a system of chats that facilitates communication between different app roles.'
            + 'A Traveler can start a chat with an Experience Maker and talk about the experience or event, and vice versa, the chat can be initiated by the Experience Maker. Also, both of them can talk'
            + 'to a support agent of the app itself if any issues occur.\n'
            + '\nAlso, when a new experience is created, the platform automatically starts a chat between'
            + 'a person who created the experience and a dedicated support agent for them to talk about the moderation process.',
        descriptionLeft: true,
      },
      data: IMAGES.fernwayer.chat,
    },
    {
      type: CASE_STUDIES_TYPES.challenges,
      header: {
        title: 'Challenges and Solutions',
        description: 'Here are the most notable challenges our team faced while developing Fernwayer.',
      },
      data: {
        isChallenges: true,
        challenges: [
          {
            image: IMAGES.fernwayer.pictures,
            problemTitle: 'Pictures displaying',
            problem: 'Fernwayer has three variants of displaying a photo in the Experience: portrait, landscape, and square. But from the beginning, when the user uploaded a photo for one format, it automatically adjusted to others, making the photo look strange.',
            solution: 'We added a crop feature so the user can choose a certain part of the photo for each display format.',
          },
          {
            image: IMAGES.fernwayer.map,
            problemTitle: 'Map',
            problem: 'Our team had to put the world map into a small part of the screen so users can see the whole world at a time, but the Maps SDK from Mapbox didn’t allow us to implement it.',
            solution: 'As Maps SDK didn’t have the necessary functionality, we had to create a workaround in order to provide this feature to the final users.',
          },
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.challengesWithWireframe,
      data: {
        isChallenges: true,
        wireframe: IMAGES.fernwayer.screens,
        challenges: [
          {
            problemTitle: 'Timezones in the events',
            problem: 'The experience maker can create an event in every part of the world, so we had to synchronize timezones for travelers to see all their booked experiences in one place.',
            solution: 'We decided not to limit the Experience Maker in creating Experiences, but to synchronize the time with a user’s device.',
          },
          {
            problemTitle: 'Countries with limited recognition',
            problem: 'Some countries have limited recognition as independent states from the UN members and observers. For example, South Ossetia isn’t recognized by Georgia, so our team had to decide how to display these territories on the app’s map.',
            solution: 'We prohibited users to create Stories and Experiences in such locations in order not to cause territory-based issues.',
          },
        ],
      },
    },
    // {
    //   type: CASE_STUDIES_TYPES.results,
    //   header: {
    //     title: 'Results',
    //     description: 'The final mobile solution fulfilled the client’s requirements and met the initial goal. Now, the app receives first positive feedbacks from users.',
    //   },
    //   data: IMAGES.fernwayer.result,
    // },
  ],

  stickerbox: [
    {
      type: CASE_STUDIES_TYPES.intro,
      data: {
        infoList: [
          {
            title: 'Industry:',
            description: 'Mobile Development',
          },
          {
            title: 'Type:',
            description: 'Cross-Messenger Sticker Maker',
          },
          {
            title: 'Deliverables:',
            description: 'UI, UX, Desktop, Web, Strategy, User Research',
          },
          {
            title: 'Time:',
            description: 'Feb 2017 - Apr 2017',
          },
        ],
        appLogo: IMAGES.stickerBox.logo,
        title: 'StickerBox',
        subtitle: 'An iOS sticker-making app',
        description: 'StickerBox is a cross-messenger app that creates stickers based on your own face with the help of artificial intelligence.',
        imageUrl: IMAGES.stickerBox.image,
      },
    },
    {
      type: CASE_STUDIES_TYPES.projectIdea,
      data: {
        features: [
          {
            title: 'Face recognition',
            description: 'The app will automatically recognize the face, cut out the background, and make a fancy sticker.',
          },
          {
            title: 'Premade templates',
            description: 'They help you to create a sticker that will make all your friends laugh and reflect the emotions perfectly.',
          },
          {
            title: 'Messenger compatibility',
            description: 'Once saved, the stickers appear on a custom keyboard and can be shared regardless of any particular messenger.',
          },
          {
            title: 'One-tap process',
            description: 'StickerBox works s as easy as can be: the only thing you have to do is to take a picture, AI will do the rest.',
          },
        ],
        description: 'Our team got inspired by Slack and its ability to create custom emojis. This activity became one of our favorite corporate pastimes. Also, seeing the reaction of our teammates when we showed them emojis made out of their photos was hilarious. In less than no time, we come to the conclusion: if we enjoy it so much, other people might too.',
      },
    },
    {
      type: CASE_STUDIES_TYPES.team,
      data: {
        members: [
          'Art Director',
          'Project manager',
          'UX/UI designer',
          'Chief Technology Officer',
          'iOS Developers',
          'Android Developer',
          'Backend Developer',
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.wireframe,
      header: {
        title: 'Wireframes',
        description: 'The app was designed to be as simple as possible for users to easily interact with the app, regardless of their device.',
      },
      data: [
        IMAGES.stickerBox.wireframes.first,
        IMAGES.stickerBox.wireframes.second,
      ],
    },
    {
      type: CASE_STUDIES_TYPES.image,
      header: {
        title: 'Technology Stack',
      },
      data: IMAGES.stickerBox.chart,
    },
    {
      type: CASE_STUDIES_TYPES.image,
      header: {
        title: 'Sync with messengers',
        description: 'When stickers are complete, they are displayed on a custom-made keyboard, so you can share them literally in any messenger regardless of the mobile platform.',
      },
      data: IMAGES.stickerBox.sync,
    },
    {
      type: CASE_STUDIES_TYPES.challenges,
      header: {
        title: 'Challenges and Solutions',
        description: 'While creating StickerBox, we faced some development challenges that we were happy to resolve.',
      },
      data: {
        isChallenges: true,
        challenges: [
          {
            image: IMAGES.stickerBox.facesegment,
            problemTitle: 'Face segmentation',
            problem: 'We needed technology that would find a face and hair in a photo, separate them from the rest of the body, and cut them out from the background for further use without redundant pixels.',
            solution: 'We tried several mathematical algorithms like Canny Edge Detector and Graham scan, but they didn’t perform well enough, so finally we stopped at a self-learning neural network that completely met the requirements.',
          },
          {
            image: IMAGES.stickerBox.additionalFeatures,
            problemTitle: 'Additional features',
            problem: 'When we launched the app, we thought users would like to make custom stickers and change them the way they want. Soon after release, we found out they were much more amused with the sticker templates provided by the app since it was easier than manual editing.',
            solution: 'We removed most of the customization features and released a version offering ready-made stickers with just one button click.',
          },
        ],
      },
    },
    {
      type: CASE_STUDIES_TYPES.results,
      header: {
        title: 'Results',
        description: 'An iOS sticker maker that works with any messenger\nAvailable worldwide',
      },
      data: IMAGES.stickerBox.result,
    },
  ],
};
