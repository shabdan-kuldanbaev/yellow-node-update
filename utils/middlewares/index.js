import { Redirects } from 'utils/json';
import { PAGES } from 'utils/constants';

export const getNewPathname = (pathname) => Redirects[pathname];

export const isPage = (pathname) => Object.values(PAGES).some((slug) => pathname.includes(slug));

export const isUrlChanged = (sourceUrl, targetUrl) => targetUrl.toString() !== sourceUrl.toString();
