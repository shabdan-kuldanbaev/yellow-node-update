import get from 'lodash/get';
import { three } from 'components/HomeCommon/Duck/utils/threeHelper';
import { PAGES, FEEDBACK_FORM_FIELDS } from 'utils/constants';
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

export const toInt = (str) => parseInt(str, 10);

export const validateEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

export const loadDuck = async () => {
  try {
    const duck = await new Promise((resolve) => {
      three.loadModel(resolve);
    });

    return duck;
  } catch (error) {
    console.log(error);
  }
};

export const getFeedbackFormData = (data) => {
  const formData = new window.FormData();

  Object.entries(FEEDBACK_FORM_FIELDS).forEach(([key]) => {
    if (data[key]) {
      if (key === FEEDBACK_FORM_FIELDS.files) {
        [...data[key]].forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, data[key]);
      }
    }
  });

  return formData;
};
