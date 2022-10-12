import { NextResponse } from 'next/server';
import { CUSTOM_DOMAIN, IS_PROD } from 'utils/constants';
import { getNewPathname, isPage } from 'utils/middlewares';

const forceHttpsAndNonWww = (req) => {
  const wwwRegex = /^www\./;
  const host = req.headers.get('host') || '';

  if (!IS_PROD || host.includes('localhost')) {
    return;
  }

  let newHost = host;

  if (wwwRegex.test(host)) {
    newHost = host.replace(wwwRegex, '');
  }

  if (newHost !== host || req.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(`https://${newHost}${req.nextUrl.pathname}`, 301);
  }
};

const redirectToCustomDomain = (req) => {
  const host = req.headers.get('host') || '';

  if (req.headers.get('user-agent') === 'Amazon CloudFront') {
    return;
  }

  if (host.includes('yellow-systems-nextjs-prod') || host.includes('yellow.id')) {
    return NextResponse.redirect(`https://${CUSTOM_DOMAIN}${req.nextUrl.pathname}`, 301);
  }
};

const redirectToLowerCasePath = (req) => {
  const host = req.headers.get('host') || '';
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const { pathname } = req.nextUrl;

  const pathnameLowerCase = pathname.toLowerCase();

  if (isPage(pathnameLowerCase) && pathnameLowerCase !== pathname) {
    return NextResponse.redirect(`${proto}://${host}${pathnameLowerCase}`, 301);
  }
};

const redirectToNewPath = (req) => {
  const host = req.headers.get('host') || '';
  const proto = req.headers.get('x-forwarded-proto') || 'http';
  const { pathname } = req.nextUrl;
  const newPathname = getNewPathname(pathname);

  if (newPathname) {
    return NextResponse.redirect(`${proto}://${host}${newPathname}`, 301);
  }
};

const processMiddlewareFunctions = (req, middlewareFns) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const middlewareFn of middlewareFns) {
    const fnResponse = middlewareFn(req);

    if (fnResponse) {
      return fnResponse;
    }
  }

  return NextResponse.next();
};

export const middleware = (req) => {
  const { pathname } = req.nextUrl;

  if (pathname.includes('_next')) {
    return NextResponse.next();
  }

  return processMiddlewareFunctions(req, [
    forceHttpsAndNonWww,
    redirectToCustomDomain,
    redirectToLowerCasePath,
    redirectToNewPath,
  ]);
};
