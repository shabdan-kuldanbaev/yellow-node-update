import { NextResponse } from 'next/server';
import {
  CUSTOM_DOMAIN,
  INDEX_FILES,
  IS_PROD,
} from 'utils/constants';
import { getNewPathname, isPage, isUrlChanged } from 'utils/middlewares';

export function middleware(req) {
  const {
    protocol,
    host, // localhost:3000 | yellow.systems | yws-dev.xyz
    hostname, // localhost | yellow.systems | yws-dev.xyz
    pathname, // /url/path
  } = req.nextUrl;

  const {
    headers,
    method,
    host: reqHost,
  } = req;

  if (pathname.includes('_next')) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  if (IS_PROD && protocol !== 'https:') {
    url.protocol = 'https:';
  }

  /* TODO: Test if there's no need in xhr check */
  if (method === 'GET' && host.includes('www.')) {
    url.host = host.substring(4);
  }

  if (hostname.includes('yellow-systems-nextjs-prod') && headers.get('user-agent') !== 'Amazon CloudFront') {
    url.host = CUSTOM_DOMAIN;
  }

  console.log({ host: [headers.host, reqHost] });

  if (hostname === 'yellow.id') {
    url.host = CUSTOM_DOMAIN;
  }

  if (INDEX_FILES.includes(pathname)) {
    url.pathname = '/';
  }

  const pathnameLowerCase = pathname.toLowerCase();

  if (isPage(pathname) && pathnameLowerCase !== pathname) {
    url.pathname = pathnameLowerCase;
  }

  const newPathname = getNewPathname(pathname);

  if (newPathname) {
    url.pathname = newPathname;
  }

  if (isUrlChanged(req.nextUrl, url)) {
    // eslint-disable-next-line no-console
    console.log({ // This log is for tracing redirects. Server-side only
      from: req.nextUrl.toString(),
      to: url.toString(),
    });

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
