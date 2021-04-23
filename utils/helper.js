import get from 'lodash/get';
import isObject from 'lodash/isObject';
import ReactGA from 'react-ga';
import {
  PAGES,
  FEEDBACK_FORM_FIELDS,
  IMAGES,
  IMAGES_WITHOUT_CDN,
} from 'utils/constants';
import {
  phoneResolution,
  horizontalMobile,
  bigTabletResolution,
  fullHdResolution,
} from 'styles/utils/_variables.scss';

export const themes = {
  dark: {
    main: '#FFF',
    secondary: '#000',
  },
  light: {
    main: '#000',
    secondary: '#FFF',
  },
};

export const addThousandsSeparators = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeThousandsSeparators = (value) => parseInt(value.replace(',', ''), 10);

export const toInt = (str) => parseInt(str, 10);

export const validateEmail = (email) => {
  // eslint-disable-next-line max-len
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(email) === false) {
    return false;
  }

  return reg.test(email);
};

export const mobileResolution = toInt(phoneResolution);
export const fullResolution = toInt(fullHdResolution);
export const horizontalPhone = toInt(horizontalMobile);
export const tabletResolution = toInt(bigTabletResolution);

export const setOverflowForBody = (isHidden) => {
  document.body.style.overflow = isHidden ? 'hidden' : 'scroll';
};

export const formatDate = (date) => {
  let dd = date.getDate();

  if (dd < 10) dd = `0${dd}`;

  let mm = date.getMonth();

  if (mm < 10) mm = `0${mm}`;

  let yyyy = date.getFullYear();

  if (yyyy < 10) yyyy = `0${yyyy}`;

  if (yyyy > 1000) yyyy = Math.trunc(yyyy / 100).toString();

  return `${dd}/${mm}/${yyyy}`;
};

export const getMainLinksForSitemap = (updatedAt) => [
  { path: '/', updatedAt },
  { path: `/${PAGES.portfolio}`, updatedAt },
  { path: `/${PAGES.process}`, updatedAt },
  { path: `/${PAGES.company}`, updatedAt },
  { path: `/${PAGES.contact}`, updatedAt },
  { path: `/${PAGES.blog}`, updatedAt },
  { path: `/${PAGES.notFound}`, updatedAt },
];

export const rootUrl = process.env.NODE_ENV === 'development'
  ? process.env.DEV_URL
  : process.env.PROD_URL;

export const isCustomDomain = rootUrl.includes(process.env.CUSTOM_DOMAIN);

export const getOptimizedImage = (src, width, fm = 'jpg', fl = 'progressive') => `${src}?fm=${fm}&fl=${fl}&w=${width}&fit=fill`;

export const createMarkup = (data) => ({ __html: data });

export const getFileUrl = (file) => get(file, 'fields.file.url', '');

export const getDocumentFields = (document, fields = []) => {
  if (fields.length) {
    return fields.reduce((acc, field) => {
      if (!field) return acc;

      acc[field] = get(document, `fields.${field}`, null);

      return acc;
    }, {});
  }

  return get(document, 'fields', null);
};

export const hoursToMs = (duration) => (duration * 60 * 60 * 1000);

export const getDateTime = () => (new Date()).getTime();

export const setDataToLocalStorageWithExpire = (key, value, expiration) => {
  const item = {
    value,
    expiry: getDateTime() + expiration,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getDataFromLocalStorageWithExpire = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const { value, expiry } = JSON.parse(itemStr);

  if (getDateTime() > expiry) {
    localStorage.removeItem(key);

    return null;
  }

  return value;
};

export const artificialDelay = (t) => new Promise(((resolve) => {
  setTimeout(() => {
    resolve();
  }, t);
}));

export const getFeedbackFormData = (data) => {
  const formData = new window.FormData();

  Object.entries(FEEDBACK_FORM_FIELDS).forEach(([key]) => {
    if (data[key]) {
      if (key === FEEDBACK_FORM_FIELDS.attachments) {
        [...data[key]].forEach((file) => formData.append('attachments[]', file));
      } else if (key === FEEDBACK_FORM_FIELDS.projectBudget) {
        formData.append(key, removeThousandsSeparators(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }

    if (key === FEEDBACK_FORM_FIELDS.clientId) {
      let clientId;

      ReactGA.ga((tracker) => {
        clientId = tracker.get('clientId');
      });

      formData.append(key, clientId);
    }
  });

  return formData;
};

export const isNumeric = (value) => !isNaN(value);

export const getPathWithCdn = (path) => (process.env.EDGE_URL ? `${process.env.EDGE_URL}${path}` : path);

export const addCdnToImages = (images) => Object.entries(images).reduce((acc, [key, value]) => {
  isObject(value)
    ? acc[key] = addCdnToImages(value)
    : acc[key] = getPathWithCdn(value);

  return acc;
}, {});

export const staticImagesUrls = ({
  ...addCdnToImages(IMAGES),
  ...IMAGES_WITHOUT_CDN,
});

export const getConvertedFileSize = (size) => {
  const kilobytes = (size / 1024).toFixed(2);

  if (kilobytes > 1024) {
    return `${(kilobytes / 1000).toFixed(2)} MB`;
  }

  return `${kilobytes} kB`;
};
