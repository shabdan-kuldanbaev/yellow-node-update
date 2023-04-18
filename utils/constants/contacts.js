export const EMAIL_LINK = 'hi@yellow.systems';

export const SOCIAL_MEDIA = {
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn',
    iconDark: 'linkedinFilled',
    iconLight: 'linkedinFilledWhite',
    link: 'https://www.linkedin.com/company/yellow-systems',
  },
  twitter: {
    id: 'twitter',
    title: 'Twitter',
    iconDark: 'twitterFilled',
    iconLight: 'twitterFilledWhite',
    link: 'https://mobile.twitter.com/yellow_systems',
  },
  dribbble: {
    id: 'dribbble',
    title: 'Dribbble',
    iconDark: 'dribbbleFilled',
    iconLight: 'dribbbleFilledWhite',
    link: 'https://dribbble.com/yellow_systems',
  },
  behance: {
    id: 'behance',
    title: 'Behance',
    iconDark: 'behanceFilled',
    iconLight: 'behanceFilledWhite',
    link: 'https://www.behance.net/yellow_systems',
  },
  medium: {
    id: 'medium',
    title: 'Medium',
    iconDark: 'mediumFilled',
    iconLight: 'mediumFilledWhite',
    link: 'https://yellow.medium.com/',
  },
  instagram: {
    id: 'instagram',
    title: 'Instagram',
    iconDark: 'instagramFilled',
    iconLight: 'instagramFilledWhite',
    link: 'https://www.instagram.com/yellow.systems/',
  },
  youtube: {
    id: 'youtube',
    title: 'YouTube',
    iconDark: 'youtubeSocialFilled',
    iconLight: 'youtubeFilledWhite',
    link: 'https://www.youtube.com/@yellowsystems9900',
  },
};

export const PHONE_NUMBER = {
  us: '+1 (415) 670-90-70',
};

export const ADDRESS = {
  us: {
    addressCountry: 'USA',
    addressLocality: 'San Francisco',
    streetAddress: '44 Tehama St',
    postalCode: '94105',
  },
  il: {
    addressCountry: 'Israel',
    addressLocality: 'Tel Aviv',
    streetAddress: "Ahad Ha'Am 9",
  },
  ar: {
    addressCountry: 'Argentina',
    addressLocality: 'Buenos Aires',
    streetAddress: 'Av. Corrientes 1312',
    postalCode: 'C1043ABN',
  },
  pl: {
    addressCountry: 'Poland',
    addressLocality: 'Warszawa',
    streetAddress: 'Grzybowska 62',
    postalCode: '00-855',
  },
};

export const PLACEMENT_DATA = {
  USA: [
    `${ADDRESS.us.streetAddress} ${ADDRESS.us.addressLocality}`,
    ADDRESS.us.postalCode,
  ],
  Poland: [
    `${ADDRESS.pl.addressLocality} ${ADDRESS.pl.postalCode}`,
    ADDRESS.pl.streetAddress,
  ],
  Israel: [
    ADDRESS.il.streetAddress,
    ADDRESS.il.addressLocality,
  ],
  Argentina: [
    ADDRESS.ar.streetAddress,
    ADDRESS.ar.postalCode,
    ADDRESS.ar.addressLocality,
  ],
};
