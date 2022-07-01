import get from 'lodash/get';
import isObject from 'lodash/isObject';
import dayjs from 'dayjs';
import {
  PAGES,
  FEEDBACK_FORM_FIELDS,
  IMAGES,
  DEFAULT_DATE_FORMAT,
} from 'utils/constants';
import gaHelper from 'utils/ga';
import {
  phoneResolution,
  horizontalMobile,
  bigTabletResolution,
  fullHdResolution,
  defaultTabletResolution,
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

export const removeThousandsSeparators = (value) => toInt(value.replaceAll(',', ''));

export const validateEmail = (email) => {
  // eslint-disable-next-line max-len
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(email) === false) {
    return false;
  }

  return reg.test(email);
};

export const getYoutubeVideoIdFromUrl = (url) => {
  if (url.includes('=')) {
    const result = url.match(/(?:[v]|[vi])=.*/i);

    if (result) {
      return result[0].slice(result[0].indexOf('=') + 1);
    }
  }

  return url.match(/[^/]+$/i)[0];
};

export const mobileResolution = toInt(phoneResolution);
export const fullResolution = toInt(fullHdResolution);
export const horizontalPhone = toInt(horizontalMobile);
export const tabletResolution = toInt(bigTabletResolution);
export const smallTabletResolution = toInt(defaultTabletResolution);

export const setOverflowForBody = (isHidden) => {
  document.body.style.overflow = isHidden ? 'hidden' : 'initial';
};

export const getMainLinksForSitemap = (updatedAt) => [
  { path: '/', updatedAt },
  { path: `/${PAGES.portfolio}`, updatedAt },
  { path: `/${PAGES.process}`, updatedAt },
  { path: `/${PAGES.company}`, updatedAt },
  { path: `/${PAGES.contact}`, updatedAt },
  { path: `/${PAGES.blog}`, updatedAt },
  { path: `/${PAGES.customChatApp}`, updatedAt },
  { path: `/${PAGES.customMobileApp}`, updatedAt },
  { path: `/${PAGES.customWebApp}`, updatedAt },
  { path: `/${PAGES.designServices}`, updatedAt },
  { path: `/${PAGES.developmentServices}`, updatedAt },
  { path: `/${PAGES.mlDevelopment}`, updatedAt },
  { path: `/${PAGES.cloudDevelopment}`, updatedAt },
  { path: `/${PAGES.androidDevelopmentServices}`, updatedAt },
  { path: `/${PAGES.mvpDevelopment}`, updatedAt },
];

export const rootUrl = process.env.NODE_ENV === 'development'
  ? process.env.DEV_URL
  : process.env.PROD_URL;

export const isServer = typeof window === 'undefined';

const getQueryString = (params) => params && Object
  .keys(params)
  .filter((key) => `${key}=${params[key]}`)
  .join('&');

export const getOptimizedContentfulImage = (imageUrl, {
  width,
  height,
  fm = 'jpg',
  fl = 'progressive',
}) => {
  if (!imageUrl) {
    return '';
  }

  const queryString = getQueryString({
    w: width,
    h: height,
    fm,
    fl,
  });

  return queryString
    ? `${imageUrl}?${queryString}`
    : imageUrl;
};

export const createMarkup = (data) => ({ __html: data });

export const addHttpsToUrl = (url) => (/^\/\//.test(url) ? `https:${url}` : url);

export const getFileUrl = (file) => addHttpsToUrl(get(file, 'fields.file.url', ''));

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
  const formDataArray = Object.entries(FEEDBACK_FORM_FIELDS);

  formDataArray.forEach(([key]) => {
    // TODO rewrite it
    switch (key) {
    case FEEDBACK_FORM_FIELDS.attachments: {
      if (data[key]) {
        [...data[key]].forEach((file) => formData.append('attachments', file));
      }

      break;
    }
    case FEEDBACK_FORM_FIELDS.projectBudget: {
      if (data[key]) {
        formData.append(key, removeThousandsSeparators(data[key]));
      }

      break;
    }
    case FEEDBACK_FORM_FIELDS.clientId: {
      const clientId = gaHelper.getClientId();

      formData.append(key, clientId);

      break;
    }
    default: {
      if (data[key]) {
        formData.append(key, data[key]);
      }

      break;
    }
    }
  });

  return formData;
};

export const isNumeric = (value) => !isNaN(value);

// export const getPathWithCdn = (path) => (`${path}`);
// TODO: Uncomment when cdn will be fixed
export const getPathWithCdn = (path) => (process.env.EDGE_URL ? `${process.env.EDGE_URL}${path}` : path);

export const addCdnToImages = (images) => Object.entries(images).reduce((acc, [key, value]) => {
  isObject(value)
    ? acc[key] = addCdnToImages(value)
    : acc[key] = getPathWithCdn(value);

  return acc;
}, {});

export const staticImagesUrls = ({ ...addCdnToImages(IMAGES) });

export const getConvertedFileSize = (size) => {
  const kilobytes = (size / 1024).toFixed(2);

  return kilobytes > 1024
    ? `${(kilobytes / 1000).toFixed(2)} MB`
    : `${kilobytes} kB`;
};

export const serverSideRedirect = ({ res }, {
  status = 302,
  path = '/',
}) => {
  if (res) {
    res.writeHead(status, { Location: path });
    res.end();
  }
};

export const formatDate = (date, { format = DEFAULT_DATE_FORMAT } = {}) => dayjs(date).format(format);

export const getMaxVal = (...args) => args.reduce((currentMax, val) => (val > currentMax ? val : currentMax), args[0]);

export const getLimitedList = (list, { start = 0, limit = 1 }) => list.slice(start, limit);
