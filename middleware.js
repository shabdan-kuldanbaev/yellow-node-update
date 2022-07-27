import { NextResponse } from 'next/server';
import {
  CUSTOM_DOMAIN,
  DEV_HOSTS,
  INDEX_FILES,
} from 'utils/constants';
import { getNewPathname, isUrlChanged } from './utils/middlewares';

const isProd = process.env.NODE_ENV === 'production';

export function middleware(req) {
  const {
    protocol, // http | https
    host, // localhost:3000 | yellow.systems | yws-dev.xyz
    hostname, // localhost | yellow.systems | yws-dev.xyz
    pathname, // /url/path
  } = req.nextUrl;

  const {
    headers,
    method,
  } = req;

  if (pathname.includes('_next')) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  if (isProd && !DEV_HOSTS.includes(host) && protocol !== 'https:') {
    console.log(host, req.hostname);
    url.protocol = 'https:';
  }

  /* TODO: Test if there's no need in xhr check */
  if (method === 'GET' && host.includes('www.')) {
    url.host = host.substring(4);
  }

  if (hostname.includes('yellow-systems-nextjs-prod') && headers.get('user-agent') !== 'Amazon CloudFront') {
    url.host = CUSTOM_DOMAIN;
  }

  if (hostname === 'yellow.id') {
    url.host = CUSTOM_DOMAIN;
  }

  if (INDEX_FILES.includes(pathname)) {
    url.pathname = '/';
  }

  const newPathname = getNewPathname(pathname);

  if (newPathname) {
    url.pathname = newPathname;
  }

  if (isUrlChanged(req.nextUrl, url)) {
    console.log({
      from: req.nextUrl.toString(),
      to: url.toString(),
    });

    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
